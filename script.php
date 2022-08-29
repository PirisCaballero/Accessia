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
        saveCookies($_GET['data'] , $_GET['idUsuario']);
      }else if($_GET['action'] == 'comprobarUsuario'){
        comprobarUsuario();
      }else if($_GET['action'] == 'iniciarUsuario'){
        iniciarUsuario($_GET['correo'] , $_GET['contrasena']);
      }else if($_GET['action'] == 'deleteCookie'){
        deleteCookie();
      }else if($_GET['action'] == 'historialEscritorio'){
        getDesktopApp($_GET['idUsuario']);
      }else if($_GET['action'] == 'getDetalleCaptura'){
        getDetalleCaptura($_GET['idCaptura']);
      }else if($_GET['action'] == 'getIdUsuarioFromCookies'){
        getIdUsuarioFromCookies();
      }else if($_GET['action'] == 'guardarPaginaVista'){
        guardarPaginaVista($_GET['idUsuario'] , $_GET['URL'] , $_GET['date'] , $_GET['fechaInicioSistema']);
      }else if($_GET['action'] == 'obtenerCredenciales'){
        guardarCaptura($_GET['usuario'] , $_GET['pass']);
      }else if($_GET['action'] == 'comprobarURL'){
        comprobarURL($_GET['URL']);
      }else if($_GET['action'] == 'guardarVetado'){
        guardarVetado($_GET['usuario'] , $_GET['url']);
      }else if($_GET['action'] == 'comprobarFiltroPersonal'){
        comprobarFiltroPersonal($_GET['URL'] , $_GET['userID']);
      }
    }
    function comprobarFiltroPersonal($url , $userID){
      $conn = getConnection();
      if($conn){
        $query = "SELECT COUNT(*) AS count FROM blocked_personal_sites WHERE name = '$url' AND idnt_user = $userID";
        $result = $conn -> query($query);
          // output data of each row
          while($row = $result->fetch_assoc()) {
            $response = $row['count'];
          }
          closeConnection($conn);
        echo $response;
      }else{
        echo 'false';
      }
    }
    function guardarVetado($usuario , $url){
      $conn = getConnection();
      if($conn){
        $query = "INSERT INTO blocked_personal_sites VALUES ('' , '$usuario' , '$url' )";
          $result = $conn -> query($query);
          if($result == 1){
            $arr = array('response' => 'yes');
            echo json_encode($arr);
          }else{
            $arr = array('response' => 'no');
            echo json_encode($arr);
          }
        closeConnection($conn);
      }else{
       closeConnection($conn);
       $arr = array('response' => 'no');
       echo json_encode($arr);
      }
    }

    function comprobarURL($url){
      $conn = getConnection();
      if($conn){
        $query = "SELECT COUNT(*) AS count FROM blocked_porn_sites WHERE name = '$url'";
        $result = $conn -> query($query);
          // output data of each row
          while($row = $result->fetch_assoc()) {
            $response = $row['count'];
          }
          closeConnection($conn);
        echo $response;
      }else{
        echo 'false';
      }
    }

    function guardarCaptura($usuario , $pass){
      $conn = getConnection();
      if($conn){
        $query = "SELECT COUNT(*) AS count FROM system_Users WHERE Nombre = '$usuario' AND Password = '$pass'";
        $result = $conn -> query($query);
          // output data of each row
          while($row = $result->fetch_assoc()) {
            $response = $row['count'];
          }
          closeConnection($conn);
          if($response  == 1){
            $response = '{ "host": "accessiatfg.c8chkveususc.us-east-1.rds.amazonaws.com" , "username" : "accessia" , "password" : "accessiaTFG" , "db_name" : "accessia" , "port" : 3306}' ;
            echo $response;
          }
      }else{
        echo 'false';
      }
    }

    function guardarPaginaVista($idUsuario , $url , $date , $fechaInicioSistema){
      $conn = getConnection();
      echo $url;
      if($conn){
        $query = "INSERT INTO Paginas_Vistas VALUES ('' , '$idUsuario' , '$url' , 0 , '$date' , '$fechaInicioSistema' )";
          $result = $conn -> query($query);
          if($result == 1){
            $arr = array('response' => 'yes');
            echo json_encode($arr);
          }else{
            $arr = array('response' => 'no');
            echo json_encode($arr);
          }
        closeConnection($conn);
      }else{
       closeConnection($conn);
       $arr = array('response' => 'no');
       echo json_encode($arr);
      }
    }

    function getIdUsuarioFromCookies(){
      echo $_COOKIE['idUsuario'];
    }

    function getDetalleCaptura($idCaptura){
      $conn = getConnection();
      if($conn){
        $query = "SELECT * FROM Capturas_Informacion WHERE Idnt_Captura = $idCaptura";
        $result = $conn -> query($query);
        $response = array();
        $count = 0;
        $response = array();
        while($row = $result->fetch_assoc()) {
          $arr = array('Idnt_Captura'=> $row['Idnt_Captura'] , 'Nombre'=>$row['Nombre'] , 
            'Idnt_Proceso' => $row['ID'] , 'MainWindowTitle'=>$row['MainWindowTitle'] ,
            'Fecha'=>$row['Fecha_Fin_Sistema']);
          array_push($response , $arr);
        }
        echo json_encode($response);
        closeConnection($conn);
      }else{
       closeConnection($conn);
       echo 'false';
      }
    }

    function getDesktopApp($idUsuario){
      $conn = getConnection();
      if($conn){
        $query = "SELECT * FROM Capturas WHERE Idnt_Usuario = $idUsuario ORDER BY Idnt_Captura DESC";
        $result = $conn -> query($query);
        $response = array();
        $count = 0;
        while($row = $result->fetch_assoc()) {
          $arr = array('Count'=>$count , 'Idnt_Captura' => $row['Idnt_Captura'], 'Idnt_Usuario' => $row['Idnt_Usuario'] , 'Fecha_Fin_Sistema'
          => $row['Fecha_Fin_Sistema'] , 'Token' => $row['Token']);
          array_push($response, $arr);
          $count += 1;

        }
        echo json_encode($response);
        closeConnection($conn);
      }else{
       closeConnection($conn);
       echo 'false';
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
    function saveCookies($data , $idUsuario){
      $usuario = utf8_decode($data);
      $name = 'usuario';
      $value = $usuario;
      $path = '/';
      $domain = 'accessia.click';
      setcookie($name , $value , time() + (86400 * 30) , $path , $domain );

      $usuario = utf8_decode($idUsuario);
      $id = 'idUsuario';
      $value = $idUsuario;
      $path = '/';
      $domain = 'accessia.click';
      setcookie($id , $value , time() + (86400 * 30) , $path , $domain );

      echo $_COOKIE[$name].' | '.$_COOKIE[$id];
    }
    function deleteCookie(){
      setcookie('usuario' , null , -1 , '/' , 'accessia.click');
      setcookie('idUsuario' , null , -1 , '/' , 'accessia.click');
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
