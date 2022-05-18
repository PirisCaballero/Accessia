<?php
    header('Content-Type: application/json');

    if( !isset( $_GET['action'] ) ){
      echo 'no action name';
    }else{
      if($_GET['action'] == 'inicioSesion'){
        inicioSesion($_GET['usuario'] , $_GET['password']);
      }else if($_GET['action'] == 'guardarHistorico'){
        guardarHistorico($_GET['usuario'] , $_GET['data']);
      }else if($_GET['action'] == 'registrarUsuario'){
        registroUsuario($_GET['nombre'],$_GET['apellidos'],$_GET['correo']
          ,$_GET['nickname'],$_GET['contrasena']);
      }else if($_GET['action'] == 'saveCookies'){
        saveCookies($_GET['data']);
      }else if($_GET['action'] == 'comprobarUsuario'){
        comprobarUsuario();
      }else if($_GET['action'] == 'iniciarUsuario'){
        iniciarUsuario($_GET['correo'] , $_GET['contrasena']);
      }else if($_GET['action'] == 'deleteCookie'){
        deleteCookie();
      }
    }

    function iniciarUsuario($correo , $contrasena){
      $conn = getConnection();
      if($conn){                
        $query = "SELECT * FROM usuarios WHERE correoUsuario = '$correo' AND contrasenia = '$contrasena'";
        $result = $conn -> query($query);
          // output data of each row
          while($row = $result->fetch_assoc()) {
            $user = 'userYes'.';'.$row['idnt_Usuario'].';'.$row['nombreUsuario'].';'.$row['apellidosUsuario'].';'.$row['correoUsuario'].';'.$row['contrasenia'].';'.$row['apodo'].';'.$row['fechaInicioSistema'];
            echo $user;
  
          }
          closeConnection($conn);
      }else{
        echo 'false';
      }

    }
    function saveCookies($data){
      $usuario = utf8_decode($data);
      echo $usuario;
      $name = 'usuario';
      $value = $usuario;
      $path = '/';
      $domain = 'localhost';
      setcookie($name , $value , time() + (86400 * 30) , $path , $domain );
    }
    function deleteCookie(){
      setcookie('usuario' , null , -1 , '/');
    }

    function comprobarUsuario(){
      echo $_COOKIE['usuario'];
    }

  function registroUsuario($nombre , $apellidos , $correo , $nickname , $contrasena){
    $conn = getConnection();
    if($conn){
      $query = "INSERT INTO usuarios (nombreUsuario , apellidosUsuario , correoUsuario ,
        contrasenia , apodo) VALUES ('$nombre' , '$apellidos' , '$correo' , '$nickname' , '$contrasena')";
      $result = $conn -> query($query);
      if($result == 1){
        echo 'yes';
      }else{
        echo 'no';
      }
      closeConnection($conn);
    }else{
      closeConnection($conn);
      echo 'false';
    }
  }

  function getConnection(){
    $host = 'accessiatfg.c8chkveususc.us-east-1.rds.amazonaws.com';
    $username = 'accessia';
    $password = 'accessiaTFG';
    $db_name = 'accessia';
    $port = 3306;
    $conn = new mysqli($host , $username , $password , $db_name , $port);
    return $conn;
  }
  function closeConnection($conn){
    mysqli_close($conn);
  }

  function guardarHistorico($usuario , $data){
    $array = json_decode($data, true);
    foreach($array as $val){
      echo $val;
    }
  }

  function inicioSesion($user , $userPass){
    $conn = getConnection();
    if($conn){
      $query = "SELECT * FROM usuarios WHERE correoUsuario = '$user' AND contrasenia = '$userPass' ";
      $result = $conn -> query($query);
      if ($result->num_rows == 1) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          $user = array("idnt_Usuario"=> $row['idnt_Usuario'] , "nombreUsuario"=> $row['nombreUsuario'] , "apelldiosUsuario"=>$row['apellidosUsuario']
              , "correoUsuario"=>$row['correoUsuario'] , "contrasenia"=>$row['contrasenia'] , "apodo"=>$row['apodo'] , "fechaInicioSistema"=>$row['fechaInicioSistema']);
          closeConnection($conn);
          echo json_encode($user);

        }
      } else {
        closeConnection($conn);
        echo "false";
      }

    }else{
      closeConnection($conn);
      echo "false";
    }

  }

 ?>
