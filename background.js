let paginasVistas = [];
let ultimaFechaGuardada = getActualHour();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.url){
      let time = 0;
      if(paginasVistas.length == 0){
        time = 0;
        ultimaFechaGuardada = getActualHour()
      }else{
        time = getActualHour() - ultimaFechaGuardada;
      }
      let myObject = {
        "url" : changeInfo.url,
        "date" :getActualHour(),
        "tiempoEnPagina" : 0
      }
      if(paginasVistas.length > 0){
        paginasVistas[paginasVistas.length-1].tiempoEnPagina = time/1000;
      }
      console.log(myObject);
      paginasVistas.push(myObject);
      ultimaFechaGuardada = getActualHour();
      tiempoEnCadaPagina();
      guardarHistorico();
    }

  })
  function guardarHistorico(){
    console.log(JSON.stringify(paginasVistas));
   saveCookies("paginasVistas" , "http://localhost" , JSON.stringify(paginasVistas) );
  }

  function tiempoEnCadaPagina(){
    if(paginasVistas.length != 0){
      let time = 0;
      let index = 0;
      paginasVistas.forEach( function(valor, indice, array) {

      });
    }else{
      console.log("array de paginas vacio");
    }
  }

  function saveCookies(name , dominio , url){
    chrome.cookies.set({
      "name": name,
      "url": dominio,
      "value": url
    }, function (cookie) { });
  }

  function getCookies(domain , name){
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        console.log(JSON.stringify(cookie));
    });
  }

  function getActualHour(){
    const today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    if(min < 10){
      min = "0"+min;
    }
    if(hour < 10){
      hour = "0"+hour
    }
    if(sec < 10){
      sec = "0"+sec
    }
    return new Date(today.getUTCFullYear() , (today.getUTCMonth()+1) , today.getUTCDate() , hour , min , sec);
  }
