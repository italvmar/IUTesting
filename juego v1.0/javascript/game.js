canvas = document.getElementById("game");
ctx = canvas.getContext('2d');

//variable final de turno
var endTurn = false;


  //factor para agrandar el cuadrado
  var n = 0.75;
  //tamaño cuadrado
  var boxSize = 100*n;

//numero de pieza que toca
numToken = 4;
//
rotate = 1;
//obejtos de piezas para guardar
var sprites = {
	fondo: {sx: 0, sy: 400, w: 590, h: 300},//la figura que recorto del sprite
	token: { sx: numToken*100, sy: 0, w: 100, h: 100}//la figura que recorto del sprite
};

//inicializo el juego
var startGame = function() {
	Game.setBoard(0,new Background(0,0,2000,2000,"fondo"));
	Game.setBoard(1,new MyToken(numToken,1005,0,rotate,"token"));
	
}
window.addEventListener("load", function() {
	Game.initialize("game",sprites,startGame,boxSize,n);
});