canvas = document.getElementById("game");
ctx = canvas.getContext('2d');

//variable final de turno
var endTurn = false;
//factor para agrandar el cuadrado
var n = 0.75;
//tamaño cuadrado
var boxSize = 100*n;

//numero de pieza que toca
numToken = 0;
//Array para pintar las fichas activas
fichasActivas=[];


var rot0 = [];
var rot1 = [];
var rot2 = [];
var rot3 = [];
var fichasValidas = [rot0,rot1,rot2,rot3];

function ficha(num, coordx, coordy, rot, token) {
	    this.num = num;
	    this.coord = [coordx,coordy];
	    this.rot = rot;
	    this.token=token;
};


//
rotate = 1;
//obejtos de piezas para guardar
var sprites = {
	01: { sx: 0*100, sy: 0, w: 100, h: 100},
	02: { sx: 1*100, sy: 0, w: 100, h: 100},
	03: { sx: 2*100, sy: 0, w: 100, h: 100},
	04: { sx: 3*100, sy: 0, w: 100, h: 100},
	05: { sx: 4*100, sy: 0, w: 100, h: 100},
	06: { sx: 5*100, sy: 0, w: 100, h: 100},
	07: { sx: 0*100, sy: 0, w: 100, h: 100},
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
	24: { sx: 5*100, sy: 3*100, w: 100, h: 100}//la figura que recorto del sprite
};

//inicializo el juego
var startGame = function() {

	 ///////////////////////////METO FICHAS TEMPORALES PARA IR TOQUETEANDO////////////
    var fichatest = new ficha(01,0,0,0,0);
    fichasActivas.push(fichatest);
    var fichatest = new  ficha(11,100,100,1,0);
    fichasActivas.push(fichatest);
    var fichatest= new  ficha(22,200,250,2,0);
    fichasActivas.push(fichatest);
   
    /////////////////////////////////////////////////////////////////////////////////
    var fichapos= new ficha(18,100,0,0,0);
    fichasValidas[0].push(fichapos);
    var fichapos= new ficha(18,0,100,0,0);
    fichasValidas[1].push(fichapos);
    var fichapos= new ficha(18,300,300,0,0);
    fichasValidas[3].push(fichapos);
    var fichapos= new ficha(18,100,200,0,0);
    fichasValidas[3].push(fichapos);

   	////////////////////////////////////////////////////////////////////////////////
   	var fichaActual= new ficha(02,0,0,0,0);

   	////////////////////////////////////////////////////////////////////////////////
	Game.setBoard(0,new MyActivas(fichasActivas));
	Game.setBoard(1,new MyValidas(fichasValidas));
	Game.setBoard(3,new MyActual(fichaActual));


	//Alvaro:
	//Interesante conservar estas lineas para pintar el fondo cuando
	//Este dentro del SpriteSheet
	//Game.setBoard(0,Board());
	//Game.setBoard(1,new MyToken(numToken,1005,0,rotate,15));
	
}
window.addEventListener("load", function() {
	Game.initialize("game",sprites,startGame,boxSize,n);
});

//actualizo coordenadas de la ficha
/*canvas.addEventListener("mousemove", function(e){
	Game.tokens[0].dx = e.clientX;
	Game.tokens[0].dy = e.clientY;
});*/