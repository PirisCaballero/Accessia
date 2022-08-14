var usuario = null;
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  getUsuario();
    if(usuario != null && changeInfo.status == 'complete'){
      let url = new URL(tab.url);
      console.log(url);
      saveURL(url.href);
      comprobarURL(quitarSubdominioIdioma(url.host) , tabId);
    }
  })

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
  if(url != 'chrome://newtab/'){
    await fetch('http://accessia.click/script.php?action=guardarPaginaVista&idUsuario='+usuario.idnt_Usuario+'&URL='+url+'&date='+fecha+'&fechaInicioSistema='+fecha, {
      method: 'GET'
    }).then(response => console.log(response));
  }

}
