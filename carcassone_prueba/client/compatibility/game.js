//variable final de turno
var endTurn = false;
//rotacion de la ficha
rotate = 1;

//objetos de piezas para guardar
var sprites = {
	fondo: {sx: 0, sy: 400, w: 590, h: 300},
	valid: {sx: 0, sy: 705, w: 100, h: 100},
	1 : { sx: 0, sy: 0, w: 100, h: 100},
	2 : { sx: 100, sy: 0, w: 100, h: 100},
	3 : { sx: 200, sy: 0, w: 100, h: 100},
	4 : { sx: 300, sy: 0, w: 100, h: 100},
	5 : { sx: 400, sy: 0, w: 100, h: 100},
	6 : { sx: 500, sy: 0, w: 100, h: 100},
	7 : { sx: 0, sy: 100, w: 100, h: 100},
	8 : { sx: 100, sy: 100, w: 100, h: 100},
	9 : { sx: 200, sy: 100, w: 100, h: 100},
	10 : { sx: 300, sy: 100, w: 100, h: 100},
	11 : { sx: 400, sy: 100, w: 100, h: 100},
	12 : { sx: 500, sy: 100, w: 100, h: 100},
	13 : { sx: 0, sy: 200, w: 100, h: 100},
	14 : { sx: 100, sy: 200, w: 100, h: 100},
	15 : { sx: 200, sy: 200, w: 100, h: 100},
	16 : { sx: 300, sy: 200, w: 100, h: 100},
	17: { sx: 400, sy: 200, w: 100, h: 100},
	18 : { sx: 500, sy: 200, w: 100, h: 100},
	19 : { sx: 0, sy: 300, w: 100, h: 100},
	20 : { sx: 100, sy: 300, w: 100, h: 100},
	21 : { sx: 200, sy: 300, w: 100, h: 100},
	22 : { sx: 300, sy: 300, w: 100, h: 100},
	23 : { sx: 400, sy: 300, w: 100, h: 100},
	24 : { sx: 500, sy: 300, w: 100, h: 100}
};

//numero de pieza que toca(numero aleatorio entre 1 y 24)
//numToken =  ((Math.round(Math.random()*23))+1).toString();

//inicializo el juego
var startGame = function(numToken) {
	console.log("Entro aqui");
	//Fondo
	Game.setBoard(0,new Background(0,0,1200,1200,"fondo"));
	//array de fichas fijadas
	Game.setBoard(1,FixedTokens);
	//Fijo la ficha central(fila 5,columna 5)
	FixedTokens.setToken(new Token(5*boxSize,5*boxSize,rotate,"10"));
	FixedTokens.setToken(new Token(5*boxSize,6*boxSize,1,"valid"));
	//Ficha que se mueve
	Game.setBoard(2,new CurrentToken(1005,0,rotate,numToken));
}
window.addEventListener("load", function() {
	Game.initialize("game",sprites,startGame);
});