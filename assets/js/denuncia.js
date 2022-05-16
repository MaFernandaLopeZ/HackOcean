let MAP;
const elmEdo = document.getElementById("select-estado");
const elmPlaya = document.getElementById("select-playa");

elmEdo.addEventListener("change", function(){
	while(elmPlaya.options.length>0){
		elmPlaya.remove(0);
	}
	fillPlayas(this.value);
});

elmPlaya.addEventListener("change", function(){
	let playa = getById(Playas, parseInt(this.value));
	MAP.setCenter({
		lat: playa.latitud,
		lng: playa.longitud
	});
	MAP.setZoom(13);
});

function centerMap(geoR){
	MAP.setCenter(geoR);
}

function createMark(LtLn, playa, icon=null){
	const marker = new google.maps.Marker({
		position: LtLn,
		title: playa
	});
	marker.setMap(MAP);
	if(icon) {
		marker.setIcon(icon);
	}
	return marker;
}

function denMap(){
	const myLatLng = { 
        lat: 17.62138889,
		lng: -101.5508333
    }

    const options= {
        center: myLatLng,
        zoom:7
    }
    var map= document.getElementById('map');
    MAP = new google.maps.Map(map, options);
}

const start = () => {
	
	for (let edo of elmEdo.options) {
		Estados.push(new Estado({id: parseInt(edo.value), nombre: edo.innerHTML }));
	}
	MIX();
	for(let i=0; i<Playas.length; i++){
		let npm = Playas[i].Clasificaciones.length ? Playas[i].Clasificaciones[0].npm : false;
		Playas[i].Mark = createMark(
			{
				lat: Playas[i].latitud,
				lng: Playas[i].longitud,
			},
			Playas[i].nombre,
			getNpmIcon(npm)
		);
	}
	
}

const fillPlayas = (idEdo) => {
	let mpios = getByParam(Municipios, 'idEstado', idEdo);
	let elmPlaya = document.getElementById("select-playa");
	for(let i=0; i<mpios.length; i++){
		for(let j=0; j<mpios[i].Playas.length; j++){
			let option = document.createElement('option');
			option.value = mpios[i].Playas[j].id;
			option.innerHTML = mpios[i].Playas[j].nombre;
			console.log(option);
			elmPlaya.appendChild(option);
		}
	}
}

const clearSelect = (elmSelect) => {
	for(let i=0; i<elmSelect.options.length; i++){
		elmSelect(remove(i))
	}
}

function loadMunicipios(){
	getApi('municipios.json')
	.then((data)=>{
		for(let i=0; i<data.length; i++){
			Municipios.push(new Municipio(data[i]));
		}
		loadPlayas();
	});
}

function loadPlayas(){
	getApi('playas.json')
	.then((data)=>{
		for(let i=0; i<data.length; i++){
			Playas.push(new Playa(data[i]));
		}
		start();
		loadClasificaciones();
	});
}

function loadClasificaciones(){
   getApi('clasificaciones.json')
	.then((data)=>{
		for(let i=0; i<data.length; i++){
			Clasificaciones.push(new Clasificacion(data[i]));
		}
		start();
	});
}
window.onload = function() {
	loadMunicipios();
	
	if(navigator.geolocation){
	  navigator.geolocation.getCurrentPosition((geoR) => {
		MAP.setCenter({
			lat: geoR.coords.latitude,
			lng: geoR.coords.longitude
		});
	  });
	}
};

