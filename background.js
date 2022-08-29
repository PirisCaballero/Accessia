var usuario = null;
var pornFilter = null;
var rrssFilter = null;
var drugFiler = null;
var historialFilter = null;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  getUsuario();
  setPornFilterValue();
  setRRSSFilterValue();
  setDrugFilterValue();
  setHistorialFilterValue();
    if(usuario != null && changeInfo.status == 'complete'){
      let url = new URL(tab.url);
      comprobarFiltroPersonal(quitarSubdominioIdioma(url.host) , tabId);
      if(historialFilter){
        saveURL(url.href);
      }
      if(pornFilter){
        comprobarURL(quitarSubdominioIdioma(url.host) , tabId);
      }
      if(rrssFilter){
        comprobarURLRRSS(quitarSubdominioIdioma(url.host) , tabId);
      }
      if(drugFiler){
        comprobarURLDrogas(quitarSubdominioIdioma(url.host) , tabId);
      }
    }
  })

function setPornFilterValue(){
  chrome.cookies.get({"url": "http://accessia.click", "name": "pornFilter"}, function(cookie) {
      if(cookie && cookie.value != null && cookie.value != ""){
        if(cookie.value == "false"){
          pornFilter = false;
        }else{
          pornFilter = true;
        }
      }else{
        console.log("Error al setear valor del pornFilter");
      }
  });
}
function setRRSSFilterValue(){
  chrome.cookies.get({"url": "http://accessia.click", "name": "rrssFilter"}, function(cookie) {
      if(cookie && cookie.value != null && cookie.value != ""){
        if(cookie.value == "false"){
          rrssFilter = false;
        }else{
          rrssFilter = true;
        }
      }else{
        console.log("Error al setear valor del rrssFilter");
      }
  });
}

function setDrugFilterValue(){
  chrome.cookies.get({"url": "http://accessia.click", "name": "drugFilter"}, function(cookie) {
      if(cookie && cookie.value != null && cookie.value != ""){
        if(cookie.value == "false"){
          drugFilter = false;
        }else{
          drugFilter = true;
        }
      }else{
        console.log("Error al setear valor del drugFilter");
      }
  });
}

function setHistorialFilterValue(){
  chrome.cookies.get({"url": "http://accessia.click", "name": "historialFilter"}, function(cookie) {
      if(cookie && cookie.value != null && cookie.value != ""){
        if(cookie.value == "false"){
          historialFilter = false;
        }else{
          historialFilter = true;
        }
      }else{
        console.log("Error al setear valor del historialFilter");
      }
  });
}
function quitarSubdominioIdioma(url , tabId){
  if(url.substring(0 , 3) == 'es.'){
    console.log(url.substring(3 , url.length));
    return url.substring(3 , url.length);
  }else if(url.substring(0 , 4) == 'www.'){
    console.log(url.substring(4 , url.length));
    return url.substring(4 , url.length);
  }else{
    console.log(url);
    return url;
  }

}
  async function comprobarURL(url , tabId){
    await fetch('http://accessia.click/script.php?action=comprobarURL&URL='+url, {
      method: 'GET',
      mode: 'cors'
    }).then(
    function(response) {
      // Examine the text in the response
      response.json().then(function(data) {
      if(data > 0){
        chrome.tabs.remove(tabId, function() { });
      }
      });
    }
  )
  }

  async function comprobarURLDrogas(url , tabId){
    await fetch('http://accessia.click/script.php?action=comprobarURLDrogas&URL='+url, {
      method: 'GET',
      mode: 'cors'
    }).then(
    function(response) {
      // Examine the text in the response
      response.json().then(function(data) {
      if(data > 0){
        chrome.tabs.remove(tabId, function() { });
      }
      });
    }
  )
  }

  async function comprobarFiltroPersonal(url , tabId){
      await fetch('http://localhost/script.php?action=comprobarFiltroPersonal&URL='+url+'&userID='+usuario.idnt_Usuario, {
      method: 'GET',
      mode: 'cors'
    }).then(
    function(response) {
      // Examine the text in the response
      response.json().then(function(data) {
        if(data > 0){
          chrome.tabs.remove(tabId, function() { });
        }
      });
    }
    )
  }
  async function comprobarURLRRSS(url , tabId){
    await fetch('http://accessia.click/script.php?action=comprobarURLRRSS&URL='+url, {
      method: 'GET',
      mode: 'cors'
    }).then(
    function(response) {
      // Examine the text in the response
      response.json().then(function(data) {
      if(data > 0){
        chrome.tabs.remove(tabId, function() { });
      }
      });
    }
  )
  }

function gestionarRespuestaComprobacionURL(response){
  console.log(response);
}
function getUsuario(){
  chrome.cookies.get({"url": "http://accessia.click", "name": "usuarioLogeado"}, function(cookie) {
      if(cookie && cookie.value != null && cookie.value != ""){
        var user = JSON.parse(cookie.value);
        if(user.idnt_Usuario > 0){
          usuario = user;
        }
      }
  });
}
function generateDatabaseDateTime(date) {
  return date.toISOString().replace("T"," ").substring(0, 19);
}
async function saveURL(url) {
  let datenow = new Date();
  let fecha = generateDatabaseDateTime(datenow);
  console.log(url);
  if(url != 'chrome://newtab/'){
    await fetch('http://accessia.click/script.php?action=guardarPaginaVista&idUsuario='+usuario.idnt_Usuario+'&URL='+url+'&date='+fecha+'&fechaInicioSistema='+fecha, {
      method: 'GET'
    }).then(response => console.log(response));
  }

}
