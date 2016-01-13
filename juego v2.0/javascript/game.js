canvas = document.getElementById("game");
ctx = canvas.getContext('2d');

//variable final de turno
var endTurn = false;

//Variable del jugador activo
var playerActivo=1;
var miPos=1;


var numPlayers=5;
//FLAGS PARA BLOQUEAR LOS COMANDOS 
var turno= true;
//La ficha es valida
var esvalida=false;

//factor para agrandar el cuadrado
var n = 0.75;
//tamaño cuadrado
var boxSize = 100*n;

//Codigo de los sprites del fondo y el sprite Azul
var fichFondo=3000;
var fichAzul=2000;

//Valores iniciales de tamaño de fichas y fondo
var cantfichas=25;
var anchoficha;
var altoficha;

//Util para los eventos de coger posiciones de puntero de raton
var rect = canvas.getBoundingClientRect();

//inicializamos el click 
var click=false;

anchoficha= canvas.width/cantfichas;
    console.log(anchoficha)
altoficha= canvas.height/cantfichas;
    console.log(altoficha)

fichasFijadas=[];

var rot0 = [];
var rot1 = [];
var rot2 = [];
var rot3 = [];
var posicionesValidas = [rot0,rot1,rot2,rot3];
var jugadores=[];


function ficha(num, coordx, coordy, rot, token, player) {
	    this.num = num;
	    this.coord = [coordx,coordy];
	    this.rot = rot;
	    this.token=token;
	    this.player=player
};
function jugador(posicion, puntos, nombre,idPlayer,fichas){
		this.pos=posicion;
		this.puntos=puntos;
		this.nombre=nombre;
		this.idPlayer=idPlayer;
		this.fichas=fichas;
};

function rot(coordx, coordy,pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,pos9){
	this.coord = [coordx,coordy];
	this.dummyPos=[pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,pos9];
}

var fichaActiva= new ficha(02,0,0,0,0,0);

var sprites = {
	//fondo
	3000: {sx: 0, sy: 400, w: 590, h: 300},
	//Pieza Azul
	2000: {sx: 398, sy: 704, w: 100, h: 100},
	
	//SPRITES PARA LOS MONIGOTES
	501: { sx: 0*100, sy: 2300, w: 100, h: 100},
	502: { sx: 1*100, sy: 2300, w: 100, h: 100},
	503: { sx: 2*100, sy: 2300, w: 100, h: 100},
	504: { sx: 3*100, sy: 2300, w: 100, h: 100},
	505: { sx: 4*100, sy: 2300, w: 100, h: 100},
	//////////////////////////////////////



	01: { sx: 0*100, sy: 0, w: 100, h: 100},
	02: { sx: 1*100, sy: 0, w: 100, h: 100},
	03: { sx: 2*100, sy: 0, w: 100, h: 100},
	04: { sx: 3*100, sy: 0, w: 100, h: 100},
	05: { sx: 4*100, sy: 0, w: 100, h: 100},
	06: { sx: 5*100-4, sy: 0, w: 100, h: 100},
	07: { sx: 0*100, sy: 1*100, w: 100, h: 100},
	08: { sx: 1*100, sy: 1*100, w: 100, h: 100},
	09: { sx: 2*100, sy: 1*100, w: 100, h: 100},
	10: { sx: 3*100, sy: 1*100, w: 100, h: 100},
	11: { sx: 4*100, sy: 1*100, w: 100, h: 100},
	12: { sx: 5*100, sy: 1*100, w: 100, h: 100},
	13: { sx: 0*100, sy: 2*100, w: 100, h: 100},
	14: { sx: 1*100-4, sy: 2*100, w: 100, h: 100},
	15: { sx: 2*100, sy: 2*100, w: 100, h: 100},
	16: { sx: 3*100, sy: 2*100, w: 100, h: 100},
	17: { sx: 4*100, sy: 2*100, w: 100, h: 100},
	18: { sx: 5*100-4, sy: 2*100, w: 100, h: 100},
	19: { sx: 0*100, sy: 3*100, w: 100, h: 100},
	20: { sx: 1*100, sy: 3*100, w: 100, h: 100},
	21: { sx: 2*100, sy: 3*100, w: 100, h: 100},
	22: { sx: 3*100-1, sy: 3*100, w: 100, h: 100},
	23: { sx: 4*100, sy: 3*100, w: 100, h: 100},
	24: { sx: 5*100-4, sy: 3*100, w: 100, h: 100},

//Los numeros pequeños que suman y restan son correcciones sobre el spritesheet
	119: { sx: 0*100, sy: 700, w: 100, h: 100},
	113: { sx: 1*100, sy: 700, w: 100, h: 100},
	107: { sx: 2*100, sy: 700, w: 100, h: 100},
	101: { sx: 3*100 -2, sy: 700, w: 100, h: 100},
	120: { sx: 0*100, sy: 1*100+ 700, w: 100, h: 100},
	114: { sx: 1*100, sy: 1*100+700, w: 100, h: 100},
	108: { sx: 2*100, sy: 1*100+700, w: 100, h: 100},
	102: { sx: 3*100 -2, sy: 1*100 + 700, w: 100, h: 100},
	121: { sx: 0*100, sy: 2*100 + 700, w: 100, h: 100},
	115: { sx: 1*100, sy: 2*100 + 700, w: 100, h: 100},
	109: { sx: 2*100, sy: 2*100 + 700, w: 100, h: 100},
	103: { sx: 3*100-2, sy: 2*100 + 700+3, w: 100, h: 100},
	122: { sx: 0*100-1, sy: 3*100 + 700+1, w: 100, h: 100},
	116: { sx: 1*100, sy: 3*100 + 700, w: 100, h: 100},
	110: { sx: 2*100, sy: 3*100 + 700, w: 100, h: 100},
	104: { sx: 3*100, sy: 3*100 + 700, w: 100, h: 100},
	123: { sx: 0*100, sy: 4*100 + 700, w: 100, h: 100},
	117: { sx: 1*100, sy: 4*100 + 700, w: 100, h: 100},
	111: { sx: 2*100, sy: 4*100 + 700, w: 100, h: 100},
	105: { sx: 3*100, sy: 4*100 + 700, w: 100, h: 100},
	124: { sx: 0*100-2, sy: 5*100 + 700-1, w: 100, h: 100},
	118: { sx: 1*100, sy: 5*100 + 700, w: 100, h: 100},
	112: { sx: 2*100-1, sy: 5*100 + 700 -1, w: 100, h: 100},
	106: { sx: 3*100, sy: 5*100 + 700+2, w: 100, h: 100},


	224: { sx: 0*100, sy: 0 + 1300-2, w: 100, h: 100},
	223: { sx: 1*100-2, sy: 0+ 1300-1, w: 100, h: 100},
	222: { sx: 2*100-3, sy: 0+ 1300-2, w: 100, h: 100},
	221: { sx: 3*100-2, sy: 0+ 1300-2, w: 100, h: 100},
	220: { sx: 4*100-2, sy: 0+ 1300-1, w: 100, h: 100},
	219: { sx: 5*100, sy: 0+ 1300-1, w: 100, h: 100},
	218: { sx: 0*100-2, sy: 1*100+ 1300-1, w: 100, h: 100},
	217: { sx: 1*100-2, sy: 1*100+ 1300-1, w: 100, h: 100},
	216: { sx: 2*100-2, sy: 1*100+ 1300-1, w: 100, h: 100},
	215: { sx: 3*100-2, sy: 1*100+ 1300-1, w: 100, h: 100},
	214: { sx: 4*100, sy: 1*100+ 1300-1, w: 100, h: 100},
	213: { sx: 5*100, sy: 1*100+ 1300-1, w: 100, h: 100},
	212: { sx: 0*100-2, sy: 2*100+ 1300-2, w: 100, h: 100},
	211: { sx: 1*100, sy: 2*100+ 1300-2, w: 100, h: 100},
	210: { sx: 2*100, sy: 2*100+ 1300-2, w: 100, h: 100},
	209: { sx: 3*100-3, sy: 2*100+ 1300-1, w: 100, h: 100},
	208: { sx: 4*100, sy: 2*100+ 1300-2, w: 100, h: 100},
	207: { sx: 5*100+1, sy: 2*100+ 1300-1, w: 100, h: 100},
	206: { sx: 0*100-4, sy: 3*100+ 1300-2, w: 100, h: 100},
	205: { sx: 1*100, sy: 3*100+ 1300-3, w: 100, h: 100},
	204: { sx: 2*100-3, sy: 3*100+ 1300-3, w: 100, h: 100},
	203: { sx: 3*100-5, sy: 3*100+ 1300 -3, w: 100, h: 100},
	202: { sx: 4*100, sy: 3*100+ 1300 -3, w: 100, h: 100},
	201: { sx: 5*100, sy: 3*100+ 1300 -3, w: 100, h: 100},


	306: { sx: 0*100, sy: 1700-6, w: 100, h: 100},
	312: { sx: 1*100, sy: 1700-4, w: 100, h: 100},
	318: { sx: 2*100, sy: 1700-4, w: 100, h: 100},
	324: { sx: 3*100-1, sy: 1700-4, w: 100, h: 100},
	305: { sx: 0*100, sy: 1*100+ 1700 -8, w: 100, h: 100},
	311: { sx: 1*100, sy: 1*100+1700-7, w: 100, h: 100},
	317: { sx: 2*100, sy: 1*100+1700-6, w: 100, h: 100},
	323: { sx: 3*100, sy: 1*100 + 1700-6, w: 100, h: 100},
	304: { sx: 0*100, sy: 2*100 + 1700-6, w: 100, h: 100},
	310: { sx: 1*100, sy: 2*100 + 1700-6, w: 100, h: 100},
	316: { sx: 2*100, sy: 2*100 + 1700-6, w: 100, h: 100},
	322: { sx: 3*100, sy: 2*100 + 1700-6, w: 100, h: 100},
	303: { sx: 0*100, sy: 3*100 + 1700-8, w: 100, h: 100},
	309: { sx: 1*100, sy: 3*100 + 1700-6, w: 100, h: 100},
	315: { sx: 2*100, sy: 3*100 + 1700-6, w: 100, h: 100},
	321: { sx: 3*100, sy: 3*100 + 1700-7, w: 100, h: 100},
	302: { sx: 0*100, sy: 4*100 + 1700, w: 100, h: 100},
	308: { sx: 1*100, sy: 4*100 + 1700-6, w: 100, h: 100},
	314: { sx: 2*100, sy: 4*100 + 1700-6, w: 100, h: 100},
	320: { sx: 3*100, sy: 4*100 + 1700-8, w: 100, h: 100},
	301: { sx: 0*100, sy: 5*100 + 1700, w: 100, h: 100},
	307: { sx: 1*100, sy: 5*100 + 1700, w: 100, h: 100},
	313: { sx: 2*100, sy: 5*100 + 1700-8, w: 100, h: 100},
	319: { sx: 3*100, sy: 5*100 + 1700-6, w: 100, h: 100},
};

//inicializo el juego
var startGame = function() {

   
    ///////////////////////////Meto rotaciones posibles para ir comprobando///////////
    var fichapos= new rot(1,0,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(0,1,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(4,4,true,true,true,true,true,true,true);
    posicionesValidas[3].push(fichapos);
    var fichapos= new rot(1,2,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(2,0,true,true,true,true,true,true,true);
    posicionesValidas[2].push(fichapos);
    var fichapos= new rot(0,2,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
    var fichapos= new rot(3,6,true,true,true,true,true,true,true);
    posicionesValidas[1].push(fichapos);
    var fichapos= new rot(1,3,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);

    var fichapos= new rot(7,2,true,true,true,true,true,true,true);
    posicionesValidas[2].push(fichapos);
    var fichapos= new rot(6,4,true,true,true,true,true,true,true);
    posicionesValidas[3].push(fichapos);
    var fichapos= new rot(6,3,true,true,true,true,true,true,true);
    posicionesValidas[2].push(fichapos);
    var fichapos= new rot(2,7,true,true,true,true,true,true,true);
    posicionesValidas[0].push(fichapos);
	////////////////////////////Meto jugadores temporales para ir comprobando////////////////////	

	var tempPlayer= new jugador(0,666,"Papta",523,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(1,2,"Dolan",524,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(2,30,"Murtix",122,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(3,30,"Gooby",123,7);
    jugadores.push(tempPlayer);
    var tempPlayer= new jugador(4,30777,"TR-8R",322,7);
    jugadores.push(tempPlayer);

    ////////////////////////////////////////////////////////////////////////////////

    var fichatest= new ficha(24,altoficha,0,0,0,0);
    fichasFijadas.push(fichatest);



   	////////////////////////////////////////////////////////////////////////////////
   	var fichaFondo= new ficha(fichFondo,0,0,0,0,0);
   	var esvalida=false;
   	Game.setBoard(0,new TableroFondo(fichaFondo));
   	Game.setBoard(1,new TableroRotaciones(posicionesValidas));
	Game.setBoard(2,new TableroFijadas(fichasFijadas));	
	Game.setBoard(3,new TableroActiva(fichaActiva));
	Game.setBoard(4,new TableroPuntuaciones(jugadores));

	
}
window.addEventListener("load", function() {
	Game.initialize("game",sprites,startGame,boxSize,n);
});