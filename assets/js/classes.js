const Reporte = class{
	id=0;
	asunto;
	descripcion;
	fecha;
	foto;
	Playa;
	idPlaya;
	nickName;
	correo;
	constructor(rep){
		this.id = rep.hasOwnProperty('id') ? rep.id : makeId(6);
		this.asunto = rep.asunto;
		this.descripcion = rep.descripcion;
		this.fecha = rep.fecha;
		this.foto = rep.foto;
		this.nickName = rep.nickName;
		this.correo = rep.correo;
	}
	setPlaya(idPlaya){
		this.idPlaya = idPlaya;
		for(let i=0; i<Playas.length; i++){
			if(Playas[i].id == idPlaya){
				this.Playa = Playas[i];
				this.Playa.addClasificacion(this);
				return true;
			}
		}
		return false;
	}
}

const Clasificacion = class {
	id=0;
	clasificacion;
	Playa;
	idPlaya;
	npm;
	constructor(clas){
		this.id=clas.id;
		this.clasificacion=clas.clasificacion;
		this.npm = clas.npm;
		this.setPlaya(clas.idPlaya);
	}
	
	setPlaya(idPlaya){
		this.idPlaya = idPlaya;
		for(let i=0; i<Playas.length; i++){
			if(Playas[i].id == idPlaya){
				this.Playa = Playas[i];
				this.Playa.addClasificacion(this);
				return true;
			}
		}
		return false;
	}
}

const Playa = class {
	id = 0;
	nombre = 0;
	latitud = 0;
	longitud = 0;
	Municipio;
	idMunicipio;
	Clasificaciones = [];
	Reportes = [];
	constructor(playa){
		this.id = playa.id;
		this.nombre = playa.nombre;
		this.latitud = playa.latitud;
		this.longitud = playa.longitud;
		this.setMunicipio(playa.idMunicipio);
	}
	
	setMunicipio(idMunicipio){
		this.idMunicipio = idMunicipio;
		for(let i=0; i<Municipios.length; i++){
			if(Municipios[i].id == idMunicipio){
				this.Municipio = Municipios[i];
				this.Municipio.addPlaya(this);
				return true;
			}
		}
		return false;
	}
	
	addClasificacion(clasificacion){
		this.Clasificaciones.push(clasificacion);
	}
	
	addReporte(reporte){
		this.Reportes.push(reporte);
	}
}

const Municipio = class {
	id;
	nombre;
	Playas = [];
	Estado;
	idEstado;
	constructor(mun){
		this.id=mun.id,
		this.nombre = mun.nombre;
		this.setEstado(mun.idEstado);
	}
	
	setEstado(idEstado){
		this.idEstado=idEstado;
		for(let i=0; i<Estados.length; i++){
			if(Estados[i].id == idEstado){
				this.Estado = Estados[i];
				this.Estado.addMunicipio(this);
			}
		}
	}
	
	addPlaya(playa){
		if(playa instanceof Playa){
			this.Playas.push(playa);
			return true;
		}
		return false;
	}
	
	hasPlaya(idPlaya){
		for(let i=0; i<this.Playas.length; i++){
			if(this.Playas[i].id == idPlaya){
				return true;
			}
		}
		return false;
	}
	
	getPlayas(){
		return this.Playas;
	}
}

const Estado = class {
	id=0;
	nombre;
	Municipios=[];
	constructor(estado){
		this.id=estado.id;
		this.nombre=estado.nombre;
	}
	
	addMunicipio(municipio){
		if(municipio instanceof Municipio){
			if(!this.hasMunicipio(municipio.id)){
				this.Municipios.push(municipio);
			}
			return true;
		}
		return false;
	}
	
	hasMunicipio(idMunicipio){
		for(let i=0; i<this.Municipios.length; i++){
			if(this.Municipios[i].id == idMunicipio){
				return true;
			}
		}
		return false;
	}
}

const url = "./assets/data/";

const getApi = async function (_url){
	let resp = await fetch(url + _url, {
		method: 'GET',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' }
	});
	let data = await resp.json();
	return data;
}

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const getById = (Obj, id) => {
	for(let i=0; i<Obj.length; i++){
		if(Obj[i].id == id) return Obj[i];
	}
	return false;
}

const getByParam = (Obj, param, value) => {
	let finds = [];
	for(let i=0; i<Obj.length; i++){
		if(Obj[i][param] == value){
			finds.push(Obj[i])
		}
	}
	if(finds.length > 0) return finds;
	return false;
}

const MIX = () => {
	for(let i=0; i<Municipios; i++){
		Municipios[i].setEstado(Municipios[i].idEstado);
	}
	for(let i=0; i<Playas; i++){
		Playas[i].setMuncipio(Playas[i].idMunicipio);
	}
	for(let i=0; i<Clasificaciones; i++){
		Clasificaciones[i].setPlaya(Clasificaciones[i].idPlaya);
	}
}

const getNpmIcon = (rank) => {
	let url = './assets/icons/';
	if(rank){
		rank = parseInt(rank);
		return url + ((Math.round(rank/40) * -1) + 5) + '.png';
	}
	return url + '100.png';
}


const Municipios = [];
const Playas = [];
const Estados = [];
const Clasificaciones = [];
const Reportes = [];