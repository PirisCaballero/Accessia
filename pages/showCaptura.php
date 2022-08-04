<html>
<head>
		<meta charset="utf-8"/>
		<title>ACCESSIA TFG</title>
		<link rel="stylesheet" type="text/css" href="../styles/estilos.css">
		<link rel="stylesheet" type="text/css" href="../styles/footerStyle.css">
        <link rel="stylesheet" type="text/css" href="../styles/usuario.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="../js/loadFunctions.js"></script>
        <script src="../js/usuario.js"></script>
		<link href='https://fonts.googleapis.com/css?family=Cormorant Garamond' rel='stylesheet'>
        <script src="../js/chart/dist/chart.min.js"></script>
	</head>
    <body>
            <div class="aplicacionesEscritorioDetalle">
                    <div style="text-align: center; margin-top: 5%;">
                        <span class="titulo"> <?php  echo 'Esta es la captura: '.$_POST['idCaptura']; ?> </span>
                        <br>
                        <span class="tituloU">_______________</span>

                    </div>
                    <div class="divTablaDetalle">
                        <table class="tabla" id="tablaDetalleCaptura">
                            <thead>
                                <tr>
                                  <th class="cabeceraTabla">ID captura</th>
                                  <th class="cabeceraTabla">Nombre proceso</th>
                                  <th class="cabeceraTabla">ID proceso</th>
                                  <th class="cabeceraTabla">Nombre de la ventana</th>
                                  <th class="cabeceraTabla">Fecha de captura</th>
                                </tr>
                              </thead>
                            </tbody>
                        </table>
                        <script type="text/javascript">
                            getDetalleCaptura(<?php echo $_POST['idCaptura']; ?>);
                        </script>
                    </div>
                </div>
    </body>
    
</html>