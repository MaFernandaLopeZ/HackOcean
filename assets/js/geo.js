function getLocation() {
    // Verificar si soporta geolocalizacion
    if (navigator.geolocation) {
        console.log("Tu navegador soporta Geolocalizacion");
    } else {
        console.log("Tu navegador no soporta Geolocalizacion");
    }

    //Obtenemos latitud y longitud
    function localizacion(posicion) {

        var latitude = posicion.coords.latitude;
        var longitude = posicion.coords.longitude;

        console.log(latitude + " " + longitude);

    }

    function error() {
        console.log("No se pudo obtener tu ubicación");

    }

    navigator.geolocation.getCurrentPosition(localizacion, error);
}
window.onload = function () {
    getLocation();
}