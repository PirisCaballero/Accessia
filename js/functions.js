window.onload = inicioVentana;
var usuarioGlobal = null;

function inicioVentana(){
  comprobarUsuarioLogeado();
  document.getElementById("btnInicioSesion").addEventListener("click", inicioSesion);
  document.getElementById("enviarDatosInicioSesion").addEventListener("click", envioDatosInicioSesion );
  document.getElementById("btnSalir").addEventListener("click", deslogearUsuario );
}


function inicioSesion(){
  document.getElementById('bloqueInicioSesion').style.display = 'none';
  document.getElementById('bloqueDatosDeInicio').style.display = 'block';
}

function envioDatosInicioSesion(){

  var usuario = document.getElementById("correo").value;
  var password = document.getElementById("contrasenia").value;
  $.ajax({
    url: 'http://localhost/script.php?action=inicioSesion&usuario='+usuario +'&password='+password,

    success: function(response) {
      console.log(response);
      var user = response;
      if(user.idnt_Usuario &&  user.idnt_Usuario > 0){
        usuarioGlobal = user;
        iniciarUsuario(usuarioGlobal);
        guardarUsuarioEnCookies("usuarioLogeado" , "http://localhost" , usuarioGlobal );
      }
    },
    error: function(response) {
      console.log("error: ");console.log(response)}
    });
}

function guardarHistorico(){
  var arrayPaginas = [];
  chrome.cookies.get({"url": "http://localhost", "name": "paginasVistas"}, function(cookie) {
      var paginas = JSON.parse(cookie.value);
      paginas.forEach(function(object){
        arrayPaginas.push(object);
        //TODO enviar a base de datos las paginas vistas
        $.ajax({
          url: 'http://localhost/script.php?action=guardarHistorico&usuario=1'+'&data='+JSON.stringify(object),
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
        "url": "http://localhost",
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
  chrome.cookies.get({"url": "http://localhost", "name": "usuarioLogeado"}, function(cookie) {
      console.log("valor cookie: " + cookie.value);
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
    "url": "http://localhost",
    "value": null
  }, function (cookie) {
    document.getElementById('bloqueInicioSesion').style.display = 'block';
    document.getElementById('bloqueDatosDeInicio').style.display = 'none';
    document.getElementById('usuarioIniciado').style.display = 'none';
  });
}
