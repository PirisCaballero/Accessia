window.onload = inicioVentana;
var usuario = null;

function inicioVentana(){
  comprobarUsuarioLogeado();
  document.getElementById("btnInicioSesion").addEventListener("click", inicioSesion);
  document.getElementById("enviarDatosInicioSesion").addEventListener("click", envioDatosInicioSesion );
  document.getElementById("btnSalir").addEventListener("click", deslogearUsuario );
  document.getElementById("btnPanelControl").addEventListener("click" , abrirPanelControl);

  document.getElementById("pornFilter").addEventListener("change" , setPornFilterValue);
  document.getElementById("drugFilter").addEventListener("change" , setDrugFilterValue);
  document.getElementById("rrssFilter").addEventListener("change" , setRRSSFilterValue);
  document.getElementById("historialFilter").addEventListener("change" , setHistorialFilterValue);

  document.getElementById("pornFilter").checked = getSavedCookieValue("pornFilter");
  document.getElementById("drugFilter").checked = getSavedCookieValue("drugFilter");
  document.getElementById("rrssFilter").checked = getSavedCookieValue("rrssFilter");
  document.getElementById("historialFilter").checked = getSavedCookieValue("historialFilter");

  document.getElementById("guardarVetado").addEventListener("click", guardarVetado);
}

function comprobarEstructuraUrl(url){
  if(url.substring(0 , 4) == 'www.'){
    return false;
  }else if(url.substring(0 , 3) == 'es.'){
    return false;
  }else if(url.substring(0 , 4) == 'com.'){
    return false;
  }
  else{
    return true;
  }
}
function guardarVetado(){
  var dir = document.getElementById("vetar").value;
  var done = comprobarEstructuraUrl(dir);
  if(done){
    $.ajax({
      url: 'http://accessia.click/script.php?action=guardarVetado&usuario='+usuario.idnt_Usuario +'&url='+dir,
  
      success: function(response) {
        console.log(response);
        var res = response;
        if(res.response == "yes"){
          document.getElementById("vetar").value = "";
        }else{
          alert("Error al guardar la URL");
        }
      },
      error: function(response) {
        console.log("error: ");console.log(response.responseText)}
      });
  }else{
    alert("La URL debe de ser como la del ejemplo");
  }

}
function setValue(value , nombreCookie){
  if(nombreCookie == "pornFilter"){
    if(value == "true"){
      document.getElementById("pornFilter").checked = true;
    }else{
      document.getElementById("pornFilter").checked = false;
    }
  }else if(nombreCookie == "drugFilter"){
    if(value == "true"){
      document.getElementById("drugFilter").checked = true;
    }else{
      document.getElementById("drugFilter").checked = false;
    }
  }else if(nombreCookie == "rrssFilter"){
    if(value == "true"){
      document.getElementById("rrssFilter").checked = true;
    }else{
      document.getElementById("rrssFilter").checked = false;
    }
  }else if(nombreCookie == "historialFilter"){
    if(value == "true"){
      document.getElementById("historialFilter").checked = true;
    }else{
      document.getElementById("historialFilter").checked = false;
    }
  }else{

  }
}
function getSavedCookieValue(nombre){
  chrome.cookies.get({"url": "http://accessia.click", "name": nombre}, function(cookie) {
    if(cookie && cookie.value != null && cookie.value != ""){
      setValue(cookie.value , nombre);
    }
  });
}
function guardarEstadoFiltro(nombreFiltro , estado){
  chrome.cookies.set({
    "name": nombreFiltro,
    "url": "http://accessia.click",
    "value": estado.toString()
  }, function (cookie) {
    console.log(cookie);
  });
}
function setPornFilterValue(){
  var resp = window.prompt("Contraseña de usuario");
  if(resp == usuario.contrasenia){
    if(document.getElementById("pornFilter").checked == false){
      guardarEstadoFiltro("pornFilter" , document.getElementById("pornFilter").checked );
    }else if(document.getElementById("pornFilter").checked == true){
      guardarEstadoFiltro("pornFilter" , document.getElementById("pornFilter").checked );
    }else{
      console.log("ERror");
    }
  }else{
    if(document.getElementById("pornFilter").checked == false){
      document.getElementById("pornFilter").checked = true;
    }else{
      document.getElementById("pornFilter").checked = false;
    }
    alert("contraseña incorrecta");
  }
}

function setRRSSFilterValue(){
  var resp = window.prompt("Contraseña de usuario");
  if(resp == usuario.contrasenia){
  if(document.getElementById("rrssFilter").checked == false){
    guardarEstadoFiltro("rrssFilter" , document.getElementById("rrssFilter").checked);
  }else if(document.getElementById("rrssFilter").checked == true){
    guardarEstadoFiltro("rrssFilter" , document.getElementById("rrssFilter").checked );
  }else{
    console.log("ERror");
  }
  }else{
    if(document.getElementById("rrssFilter").checked == false){
      document.getElementById("rrssFilter").checked = true;
    }else{
      document.getElementById("rrssFilter").checked = false;
    }
    alert("contraseña incorrecta");
  }
}

function setDrugFilterValue(){
  var resp = window.prompt("Contraseña de usuario");
  if(resp == usuario.contrasenia){
  if(document.getElementById("drugFilter").checked == false){
    guardarEstadoFiltro("drugFilter" , document.getElementById("drugFilter").checked );
  }else if(document.getElementById("drugFilter").checked == true){
    guardarEstadoFiltro("drugFilter" , document.getElementById("drugFilter").checked );
  }else{
    console.log("ERror");
  }
}else{
  if(document.getElementById("drugFilter").checked == false){
    document.getElementById("drugFilter").checked = true;
  }else{
    document.getElementById("drugFilter").checked = false;
  }
  alert("contraseña incorrecta");
}
}

function setHistorialFilterValue(){
  var resp = window.prompt("Contraseña de usuario");
  if(resp == usuario.contrasenia){
  if(document.getElementById("historialFilter").checked == false){
    guardarEstadoFiltro("historialFilter" , document.getElementById("historialFilter").checked );
  }else if(document.getElementById("historialFilter").checked == true){
    guardarEstadoFiltro("historialFilter" , document.getElementById("historialFilter").checked );
  }else{
    console.log("ERror");
  }
}else{
  if(document.getElementById("historialFilter").checked == false){
    document.getElementById("historialFilter").checked = true;
  }else{
    document.getElementById("historialFilter").checked = false;
  }
  alert("contraseña incorrecta");
}
}


function abrirPanelControl(){
  window.open('http://accessia.click/');
}
function inicioSesion(){
  document.getElementById('bloqueInicioSesion').style.display = 'none';
  document.getElementById('bloqueDatosDeInicio').style.display = 'block';
}

function envioDatosInicioSesion(){


  var usuario = document.getElementById("correo").value;
  var password = document.getElementById("contrasenia").value;
  $.ajax({
    url: 'http://accessia.click/script.php?action=inicioSesion&usuario='+usuario +'&password='+password,

    success: function(response) {
      console.log(response);
      var user = response;
      if(user.idnt_Usuario &&  user.idnt_Usuario > 0){
        usuarioGlobal = user;
        iniciarUsuario(usuarioGlobal);
        guardarUsuarioEnCookies("usuarioLogeado" , "http://accessia.click" , usuarioGlobal );
      }
    },
    error: function(response) {
      console.log("error: ");console.log(response)}
    });
}

function guardarHistorico(){
  var arrayPaginas = [];
  chrome.cookies.get({"url": "http://accessia.click", "name": "paginasVistas"}, function(cookie) {
      var paginas = JSON.parse(cookie.value);
      paginas.forEach(function(object){
        arrayPaginas.push(object);
        $.ajax({
          url: 'http://accessia.click/script.php?action=guardarHistorico&usuario=1'+'&data='+JSON.stringify(object),
          success: function(response){
            console.log(response)
          },
          error: function(response){
            console.log(response)
          }
        });

      });
      chrome.cookies.set({
        "name": "paginasVistas",
        "url": "http://accessia.click",
        "value": null
      }, function (cookie) {});
  });
}


function guardarUsuarioEnCookies(nombre , dominio , user){
  chrome.cookies.set({
    "name": nombre,
    "url": dominio,
    "value": JSON.stringify(user)
  }, function (cookie) {});
}

function iniciarUsuario(user){
  document.getElementById('bloqueInicioSesion').style.display = 'none';
  document.getElementById('bloqueDatosDeInicio').style.display = 'none';
  document.getElementById('nombreUsuario').innerHTML = user.nombreUsuario + " " + user.apelldiosUsuario;
  document.getElementById('usuarioIniciado').style.display = 'block';
}

function comprobarUsuarioLogeado(){
  chrome.cookies.get({"url": "http://accessia.click", "name": "usuarioLogeado"}, function(cookie) {
      if(cookie && cookie.value != null && cookie.value != ""){
        var user = JSON.parse(cookie.value);
        if(user.idnt_Usuario > 0){
          iniciarUsuario(user);
          usuario = user;
        }else{
          inicioSesion();
        }
      }
  });
}

function deslogearUsuario(){
  guardarHistorico();
  chrome.cookies.set({
    "name": "usuarioLogeado",
    "url": "http://accessia.click",
    "value": null
  }, function (cookie) {
    document.getElementById('bloqueInicioSesion').style.display = 'block';
    document.getElementById('bloqueDatosDeInicio').style.display = 'none';
    document.getElementById('usuarioIniciado').style.display = 'none';
  });
}
