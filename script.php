<?php
    header('Content-Type: application/json');

    if( !isset( $_GET['action'] ) ){
      echo 'no action name';
    }else{
      if($_GET['action'] == 'inicioSesion'){
        inicioSesion($_GET['usuario'] , $_GET['password']);
      }else if($_GET['action'] == 'guardarHistorico'){
        guardarHistorico($_GET['usuario'] , $_GET['data']);
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
