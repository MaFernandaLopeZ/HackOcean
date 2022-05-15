
function startTime() {
    hoy = new Date();
    mes = (hoy.getMonth() + 1);
    if (mes < 10) {
        fecha = hoy.getDate() + '/0' + mes + '/' + hoy.getFullYear();
    } else {
        fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();
    }
    h = hoy.getHours();
    m = hoy.getMinutes();
    s = hoy.getSeconds();
    document.getElementById('fechaHora').innerHTML = fecha + " " + h + ":" + m + ":" + s;
}
window.onload = function () { startTime(); }
