function initMap(lat,lng, beach, classy){

    //var lat=parseFloat(document.getElementById('latitud').value);
    //var lng=parseFloat(document.getElementById('longitud').value);
    const myLatLng = { 
        lat: lat, lng: lng
    }
    
    if (classy=="APTA"){
        var color="green"
    }else{
        var color="red"
    }

    var texto=`<div style="background-color:${color}"><h1 style="color:white">${beach} </h1>`+ `<p style="color:white">Clasificación: ${classy} </p></div>`
    const options= {
        center: myLatLng,
        zoom:7
    }
    var map= document.getElementById('map');
    const mapa = new google.maps.Map(map, options);
    const marcador = new google.maps.Marker({
        position: myLatLng,
        map:mapa,
        title: "Marcador"
    });
        var informacion =new google.maps.InfoWindow({
            content: texto
        });
        marcador.addListener('click', function(){
            informacion.open(mapa, marcador);
        });
}


function cargarJSON(){
    var id= parseInt(document.getElementById('estado').value)
    let url=`https://6fa8-201-141-45-17.ngrok.io/Procesado/?id=${id}`
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(data){

       data.forEach(function(Procesado){
           initMap(Procesado.LAT, Procesado.LON, Procesado.PLAYA, Procesado.CLASIFICACIÓN)

       })
       

    })
}
