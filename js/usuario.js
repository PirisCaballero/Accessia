window.tableMax = 10;
window.tableMin = 0;

function añadirFilasHistorial(){
   lista = creacionFilas();
   lista.forEach(element => {
    var tabla = document.getElementById('tablaHistorial');
    var row = tabla.insertRow();
       var dominio = row.insertCell();
       var url = row.insertCell();
       var tiempo = row.insertCell();
       dominio.innerHTML = element.dominio;
       dominio.className="celda";
       url.innerHTML = element.url;
       url.className="celda";
       tiempo.innerHTML = element.tiempo;
       tiempo.className="celda";
   });


}

function getIdUsuarioFromCookies(){
    $.ajax({
        url: '../script.php?action=getIdUsuarioFromCookies',
        async:false,
        success: function(result){
            console.log(result + 'result');
            window.idUsuario = result;
        },
        error: function(result){
            console.log(result.responseText);
            window.idUsuario = result;
        }
    });
}
function addDesktopHistorical(){
    var tablaDesktopApps = document.getElementById('tablaDesktopApps');
    getIdUsuarioFromCookies();
    var array = creacionFilasTablaApps(window.idUsuario);
}

function onloadPage(){
    
    $.ajax({
        url: "../script.php?action=comprobarUsuario",
        success: function(result){
            console.log(result);
            processResponseOnLoad(result.responseText);
        },
        error: function(result){
            console.log(result);
            processResponseOnLoad(result.responseText);
        }
    });
    
}

function processResponseOnLoad(response){
    let res = response.includes("Undefined index:");
    if(res){
        window.open('../' , '_parent');
    }
}

function slider(){
    if(document.getElementById("slider").value == "off"){
        document.getElementById("slider").value = "on";
    }else{
        document.getElementById("slider").value = "off"
    }
    console.log("slider status: "+document.getElementById("slider").value);
}

function creacionFilas (){
    var lista = [];
    for( i = 0; i<10 ; i++){
        fila = new Object();
        fila.dominio = "Dominio: "+i;
        fila.url = "URL: "+i;
        fila.tiempo = "Tiempo: "+i;

        lista.push(fila);
    }
    return lista;
}

function creacionFilasTablaApps(idUsuario){
    console.log(idUsuario);
    $.ajax({
        url: "../script.php?action=historialEscritorio&idUsuario="+idUsuario,
        success: function(result){
            window.arrayHistorialEscritorio = result;
            pintarTablaHistorialEscritorio();
        },
        error: function(result){
            console.log('No results');
        }
    });
}
function pintarTablaHistorialEscritorio(){
    var tabla = document.getElementById('tablaDesktopApps');
    var header = tabla.createTHead();
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = 'Numero captura';
    cell1.className = "cabeceraTabla";
    var cell2 = row.insertCell(1);
    cell2.innerHTML='Fecha';
    cell2.className='cabeceraTabla';
    var cell3 = row.insertCell(2);
    cell3.innerHTML='Acciones';
    cell3.className='cabeceraTabla';

        window.arrayHistorialEscritorio.forEach(element => {
        if(element.Count >= window.tableMin && element.Count < window.tableMax){
            
            var row = tabla.insertRow();
            var idCaptura = row.insertCell();
            var fecha = row.insertCell();
            var acciones = row.insertCell();

            

           if(element.Count < 10){
            idCaptura.innerHTML = '0'+element.Count;
           }else{
            idCaptura.innerHTML = element.Count;
           }
           
           idCaptura.className="celda";
           fecha.innerHTML = element.Fecha_Fin_Sistema;
           fecha.className="celda";
           acciones.innerHTML = ''+
           '<form id="formShowCaptura" method="post" action="http://localhost/pages/showCaptura.php" target="_blank">'+
           '<input type="hidden" name="idCaptura" value="" />'+
           '</form>'+
           '<button class="btnTablaEscritorio" onClick="showCaptura( ' + element.Idnt_Captura + ')">Ver detalle</button>'
           
           +'';
           acciones.className="celda";
        }
       });
}
function showCaptura(idCaptura){
    var f = document.getElementById('formShowCaptura');
    f.idCaptura.value = idCaptura;
    f.submit();
}
function addCount(orden){
    if(orden == -1){
        if(window.tableMin >0){
            window.tableMin -= 10;
            window.tableMax -= 10;
            var tabla = document.getElementById('tablaDesktopApps');
            while(tabla.rows.length) {
                tabla.deleteRow(0);
              }
            pintarTablaHistorialEscritorio();
        }
    }else if(orden == 1){
        if(window.tableMax <= window.arrayHistorialEscritorio[window.arrayHistorialEscritorio.length-1].Count ){
            window.tableMin += 10;
            window.tableMax += 10;
            var tabla = document.getElementById('tablaDesktopApps');
            while(tabla.rows.length) {
                tabla.deleteRow(0);
              }
            pintarTablaHistorialEscritorio();
        }
    }
}

function setGrafico(){
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ocio', 'Formacion', 'Streaming', 'Videojuegos' , 'Otros'],
            datasets: [{
                label: 'Páginas vistas por tipo',
                data: [12, 19, 3, 5 , 31],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
                    }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
            });
}

function getDetalleCaptura(idCaptura){
    $.ajax({
        url: "../script.php?action=getDetalleCaptura&idCaptura="+idCaptura,
        success: function(result){
            window.arrayDetalleCaptura = result;
            pintarTablaDetalleCaptura();
        },
        error: function(result){
            console.log(result);
            console.log('No results');
        }
    });
}
function pintarTablaDetalleCaptura(){
    console.log(window.arrayDetalleCaptura);
    window.arrayDetalleCaptura.forEach(element => {
        if(1==1){
            var tabla = document.getElementById('tablaDetalleCaptura');
            var row = tabla.insertRow();

           var idCaptura = row.insertCell();
           var nombre = row.insertCell();
           var id = row.insertCell();
           var tituloVentana = row.insertCell();
           var fecha = row.insertCell();

           idCaptura.innerHTML = element.Idnt_Captura;
           idCaptura.className="celda";
           nombre.innerHTML = element.Nombre;
           nombre.className="celda";

           id.innerHTML = element.Idnt_Proceso;
           id.className="celda";

           tituloVentana.innerHTML = element.MainWindowTitle;
           tituloVentana.className="celda";

           fecha.innerHTML = element.Fecha;
           fecha.className="celda";
        }
       });
}