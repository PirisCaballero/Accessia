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

function onloadPage(){
    
    $.ajax({
        url: "../script.php?action=comprobarUsuario",
        success: function(result){
            processResponseOnLoad(result.responseText);
        },
        error: function(result){
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