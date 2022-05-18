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

function inicioUsuario(){
    let correo = document.getElementById('correoInicio').value;
    let contrasena = document.getElementById('contraseñaInicio').value;
    let data = "&correo="+correo+"&contrasena="+contrasena;
    $.ajax({
        url: "../script.php?action=iniciarUsuario"+data,
        success: function(result){
            iniciarUsuario(result.responseText);
        },
        error: function(result){
            iniciarUsuario(result.responseText);
        }
    });

}

function iniciarUsuario(inicio){
    if(inicio.includes('userYes')){
        console.log('usuario logeado');
        
        let user = inicio.split(';');
        usuario.idUsuario = user[1];
        usuario.nombre = user[2];
        usuario.apellidos = user[3];
        usuario.correo = user[4];
        usuario.contrasena = user[5];
        usuario.nickname = user[6];
        console.log(usuario);
        guardarCookies(usuario);
        window.open('../' , '_parent');
    }else{
        console.log('usuario no encontrado');
    }
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
        window.open('../' , '_parent');
    }else{
        alert(result);
    }
}
function getCookies(){

}
function guardarCookies(usuario){
    let data = usuario.nickname;
    $.ajax({
        url: '../script.php?action=saveCookies&data='+data,
        success: function(result){
            console.log(result.responseText);
        },
        error: function(result){
            alert(result.responseText);
            console.log(result.responseText);
        }
    });
}

function comprobarUsuario(){
    $.ajax({
        url:'../script.php?action=comprobarUsuario',
        success: function(result){
            setearUsuario(result.responseText);
        },
        error: function(result){
            setearUsuario(result.responseText);
        }
    });
}

function setearUsuario(resultText){
    if(!resultText.includes('Undefined')){
        console.log('si usuario: '+resultText);
        document.getElementById('inicioUsuario').style.display = 'none';
        document.getElementById('iconoUsuario').style.display = 'none';

        document.getElementById('usuarioLabel').innerHTML = resultText;
        document.getElementById('usuarioLabel').style = "margin-left:30%;margin-top:2%;display:block;text-decoration: none;font-family: 'Cormorant Garamond';font-weight: lighter;color: black;font-size: 18;";
        document.getElementById('iconoCerrarSesion').style ="display:block;content:url('../img/cerrar-sesion.png');float: right;margin-right: 1%;margin-top: 0.5%;";
    }else{
        console.log('No usuario');
        document.getElementById('iconoCerrarSesion').style ="display:none;content:url('../img/cerrar-sesion.png');float: right;margin-right: 1%;margin-top: 0.5%;";
        document.getElementById('usuarioLabel').style = "display:none;margin-left:30%;margin-top:2%;text-decoration: none;font-family: 'Cormorant Garamond';font-weight: lighter;color: black;font-size: 18;";
    }
}

function cerrarSesion(){
    $.ajax({
        url: '../script.php?action=deleteCookie',
        success: function(response){
            alert('Sesion cerrada');
            window.open('../' , '_parent');
        },
        error: function(response){
            alert('Sesión cerrada');
            window.open('../' , '_parent');
        }
    })
}