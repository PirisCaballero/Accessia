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
            if(result.responseText){
                iniciarUsuario(result.responseText);
            }else{
                console.log(result);
            }
            
        },
        error: function(result){
            if(result.responseText){
                iniciarUsuario(result.responseText);
            }else{
                console.log(result);
            }
        }
    });

}

function iniciarUsuario(inicio){
    console.log(inicio + 'prueba');
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
        alert('Bienvenido de nuevo: ' + usuario.nombre);
        window.open('../' , '_parent');
    }else{
        alert('Usuario no encontrado, intentelo de nuevo');
    }
}

function processResponse(result){
    if(result.match('yes')){
        usuario.nombre=document.getElementById('nombre').value;
        usuario.apellidos=document.getElementById('apellidos').value;
        usuario.nickname =document.getElementById('nickname').value;
        usuario.correo=document.getElementById('correoInput').value;
        usuario.contrasena=document.getElementById('contrasena').value;
        guardarCookies(usuario);
        setearUsuario('defined');
    }else{
        setearUsuario('Undefined');
        console.log('error');
    }
}
function guardarCookies(usuario){
    let data = usuario.nickname;
    let id = usuario.idUsuario;
    $.ajax({
        url: '../script.php?action=saveCookies&data='+data+'&idUsuario='+id,
        success: function(result){
            console.log(result.responseText);
        },
        error: function(result){
            console.log(result.responseText);
        }
    });
}


function comprobarUsuario(){
    $.ajax({
        url:'../script.php?action=comprobarUsuario',
        success: function(result){
            if(result.responseText){
                setearUsuario(result.responseText);
            }else{
                console.log(result);
            }
        },
        error: function(result){
            if(result.responseText){
                setearUsuario(result.responseText);
            }else{
                console.log(result);
            }
        }
    });
}

function setearUsuario(resultText){
    if(!resultText.includes('Undefined')){
        document.getElementById('inicioUsuario').style.display = 'none';
        document.getElementById('iconoUsuario').style.display = 'none';

        document.getElementById('usuarioLabel').innerHTML = resultText;
        document.getElementById('usuarioLabel').style = "margin-left:30%;margin-top:2%;display:block;text-decoration: none;font-family: 'Cormorant Garamond';font-weight: lighter;color: black;font-size: 18;";
        document.getElementById('iconoCerrarSesion').style ="display:block;content:url('../img/cerrar-sesion.png');float: right;margin-right: 1%;margin-top: 0.5%;";
    }else{
        document.getElementById('iconoCerrarSesion').style.display = 'none';
        document.getElementById('usuarioLabel').style.display = 'none';
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

function pantallaUsuario(){
    alert('Pantalla de usuario');
}