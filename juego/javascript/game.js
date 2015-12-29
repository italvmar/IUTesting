canvas = document.getElementById("game");
ctx = canvas.getContext('2d');

//variable final de turno
var endTurn = false;
//factor para agrandar el cuadrado
var n = 0.75;
//tamaño cuadrado
var boxSize = 100*n;
var fondoSize=2000;

//Codigo de los sprites del fondo y el sprite Azul
var fichFondo=3000;
var fichAzul=2000;

//Valores iniciales de tamaño de fichas y fondo
var cantfichas=150;
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

//numero de pieza que toca
numToken = 0;

//Array para guardar las fichas activas
fichasActivas=[];

//Array bidimensional para guardar las rotaciones posibles
//Exactamente el que nos va a pasar logica
var rot0 = [];
var rot1 = [];
var rot2 = [];
var rot3 = [];
var fichasValidas = [rot0,rot1,rot2,rot3];


//Hecha segun las exigencias de logica, es lo que vamos 
//A pasarles cuando la coloquemos
function ficha(num, coordx, coordy, rot, token) {
	    this.num = num;
	    this.coord = [coordx,coordy];
	    this.rot = rot;
	    this.token=token;
};
//inicializamos la ficha actual hasta que la cambiemos por
//la primera que nos pase logica
var fichaActual= new ficha(02,0,0,0,0);



rotate = 1;
//obejtos de piezas para guardar
//Creamos todas las piezas, y sus rotaciones
//Asi como el tablero y la pieza azul auxiliar
//TODO: Pintarle una interrogacion o algo para
//que no quede tan soso
var sprites = {
	//fondo
	3000: {sx: 0, sy: 400, w: 590, h: 300},
	//Pieza Azul
	2000: {sx: 398, sy: 704, w: 100, h: 100},

//Fichas sin rotar
	01: { sx: 0*100, sy: 0, w: 100, h: 100},
	02: { sx: 1*100, sy: 0, w: 100, h: 100},
	03: { sx: 2*100, sy: 0, w: 100, h: 100},
	04: { sx: 3*100, sy: 0, w: 100, h: 100},
	05: { sx: 4*100, sy: 0, w: 100, h: 100},
	06: { sx: 5*100, sy: 0, w: 100, h: 100},
	07: { sx: 0*100, sy: 1*100, w: 100, h: 100},
	08: { sx: 1*100, sy: 1*100, w: 100, h: 100},
	09: { sx: 2*100, sy: 1*100, w: 100, h: 100},
	10: { sx: 3*100, sy: 1*100, w: 100, h: 100},
	11: { sx: 4*100, sy: 1*100, w: 100, h: 100},
	12: { sx: 5*100, sy: 1*100, w: 100, h: 100},
	13: { sx: 0*100, sy: 2*100, w: 100, h: 100},
	14: { sx: 1*100, sy: 2*100, w: 100, h: 100},
	15: { sx: 2*100, sy: 2*100, w: 100, h: 100},
	16: { sx: 3*100, sy: 2*100, w: 100, h: 100},
	17: { sx: 4*100, sy: 2*100, w: 100, h: 100},
	18: { sx: 5*100, sy: 2*100, w: 100, h: 100},
	19: { sx: 0*100, sy: 3*100, w: 100, h: 100},
	20: { sx: 1*100, sy: 3*100, w: 100, h: 100},
	21: { sx: 2*100, sy: 3*100, w: 100, h: 100},
	22: { sx: 3*100, sy: 3*100, w: 100, h: 100},
	23: { sx: 4*100, sy: 3*100, w: 100, h: 100},
	24: { sx: 5*100, sy: 3*100, w: 100, h: 100},

///Fichas rotadas hacia la derecha, el 1 antes del numero indica la rotacion
//Asi solo hay que sumar y restar para pasar de un sprite a otro
// ( ͡° ͜ʖ ͡°)

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

///Fichas rotadas hacia abajo, el 2 antes del numero indica la rotacion
//Asi solo hay que sumar y restar 100 para pasar de un sprite a otro
// ( ͡° ͜ʖ ͡°)

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

///Fichas rotadas hacia abajo, el 3 antes del numero indica la rotacion
//Asi solo hay que sumar y restar 100 para pasar de un sprite a otro
// ( ͡° ͜ʖ ͡°)

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

	 ///////////////////////////METO FICHAS TEMPORALES PARA IR TOQUETEANDO////////////
    var fichatest = new ficha(24,0,0,0,0);
    fichasActivas.push(fichatest);
    var fichatest = new  ficha(124,1*altoficha,1*anchoficha,1,0);
    fichasActivas.push(fichatest);
    var fichatest= new  ficha(224,2*altoficha,2*anchoficha,2,0);
    fichasActivas.push(fichatest);
    var fichatest= new  ficha(324,3*altoficha,3*anchoficha,3,0);
    fichasActivas.push(fichatest);
   
    ///////////////////////////Meto rotaciones posibles para ir combrobando///////////
    var fichapos= new ficha(fichAzul,1,0,0,0);
    fichasValidas[0].push(fichapos);
    var fichapos= new ficha(fichAzul,0,1,0,0);
    fichasValidas[0].push(fichapos);
    var fichapos= new ficha(fichAzul,4,4,0,0);
    fichasValidas[3].push(fichapos);
    var fichapos= new ficha(fichAzul,1,2,0,0);
    fichasValidas[0].push(fichapos);
    var fichapos= new ficha(fichAzul,2,0,0,0);
    fichasValidas[2].push(fichapos);
    var fichapos= new ficha(fichAzul,0,2,0,0);
    fichasValidas[0].push(fichapos);
    var fichapos= new ficha(fichAzul,3,6,0,0);
    fichasValidas[1].push(fichapos);
    var fichapos= new ficha(fichAzul,1,3,0,0);
    fichasValidas[0].push(fichapos);

    var fichapos= new ficha(fichAzul,7,2,0,0);
    fichasValidas[2].push(fichapos);
    var fichapos= new ficha(fichAzul,6,4,0,0);
    fichasValidas[3].push(fichapos);
    var fichapos= new ficha(fichAzul,6,3,0,0);
    fichasValidas[2].push(fichapos);
    var fichapos= new ficha(fichAzul,2,7,0,0);
    fichasValidas[0].push(fichapos);

   	////////////////////////////////////////////////////////////////////////////////
   	


   	////////////////////////////////////////////////////////////////////////////////
   	var fichaFondo= new ficha(fichFondo,0,0,0,0);

   	Game.setBoard(0,new MyFondo(fichaFondo));
   	Game.setBoard(1,new MyValidas(fichasValidas));
	Game.setBoard(2,new MyActivas(fichasActivas));	
	Game.setBoard(3,new MyActual(fichaActual));

	
}
window.addEventListener("load", function() {
	Game.initialize("game",sprites,startGame,boxSize,n);
});