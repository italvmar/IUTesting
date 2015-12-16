
//Estamos Creando y metiendo tableros 
var startGame = function() {
    //Pongamos que el primer tablero es el tapete
    //Los siguientes de momento son fichas individuales
    //Luego serán los arrays



  Game.setBoard(0,Drawboard(url,"images/board.jpg"),300,300);
  Game.setBoard(1,Drawboard(url,"images/01.jpg"),200,200);
  Game.setBoard(2,Drawboard(url,"images/13.jpg"),100,100);
}

var Drawboard = function(tipe,url,width,height) {

  //var board = document.createElement("canvas");
  //var ctx = board.getContext("2d");
  board = new Image();
  board.src = url;

  // llamamos a esto con el ctx del canvas
  //para pintar los tableros
  this.draw = function(ctx) {
    // Dibuja la imagen que sea   
     ctx.drawImage(board,0, 0,width,height);
    }

}

  

