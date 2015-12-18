var sprites = {
 ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }
};
//Estamos Creando y metiendo tableros 
var startGame = function() {
    //Pongamos que el primer tablero es el tapete
    //Los siguientes de momento son fichas individuales
    //Luego serán los arrays



  Game.setBoard(0,new Drawboard("images/board.jpg"),300,300);
  Game.setBoard(1,new Drawboard("images/01.jpg"),200,200);
  Game.setBoard(2,new Drawboard("images/13.jpg"),100,100);
  
}

var Drawboard = function(tipe,url,wid,heig) {

  //var board = document.createElement("canvas");
  //var ctx = board.getContext("2d");
  board = new Image();
  board.src = url;
  width= wid;
  height=heig;

  // llamamos a esto con el ctx del canvas
  //para pintar los tableros
  this.draw = function(ctx) {
    // Dibuja la imagen que sea  
    console.log("ESTA LLAMANDO A DRAW") ;
     ctx.drawImage(this.board,0, 0,this.width,this.height);
    }

}

  
window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);

});
