let usuario = new Object();
function ValidateEmail() {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let mail = document.getElementById('correoInput').value;
  
    if (mail.match(validRegex)) {
        document.getElementById('correoInput').setAttribute('style' , 'border: 1px solid green;')
        return true;
    } else {
        document.getElementById('correoInput').setAttribute('style' , 'border: 1px solid red;')
        alert('El correo introducido no es valido');
        return false;
    }
  }

  function sendData(){
    let nombre=document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let correo = document.getElementById('correoInput').value;
    let nickname = document.getElementById('nickname').value;
    let contrasena = document.getElementById('contrasena').value;
    let data = "&nombre="+nombre+"&apellidos="+apellidos+"&correo="+correo+"&nickname="+nickname+
        "&contrasena="+contrasena;
    $.ajax({
        url: "../script.php?action=registrarUsuario"+data,
        success: function(result){
            console.log(result.responseText);
            processResponse(result.responseText);
        },
        error: function(result){
            console.log(result.responseText);
            processResponse(result.responseText);
        }
    });
}

function processResponse(result){
    console.log(result);
    if(result.match('yes')){
        usuario.nombre=document.getElementById('nombre').value;
        usuario.apellidos=document.getElementById('apellidos').value;
        usuario.nickname =document.getElementById('nickname').value;
        usuario.correo=document.getElementById('correoInput').value;
        usuario.contrasena=document.getElementById('contrasena').value;
        console.log(usuario);
        guardarCookies(usuario);
        alert(document.cookie);
        window.open('../' , '_parent');
    }else{
        alert(result);
    }
}
function guardarCookies(usuario){
    document.cookie = "nombre="+usuario.nombre;
    document.cookie = "apellidos="+usuario.apellidos;
    document.cookie = "nickname="+usuario.nickname;
    document.cookie = "correo="+usuario.correo;
    document.cookie = "contrasena="+usuario.contrasena;

}