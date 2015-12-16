
var Game = new function() { 

//Declaramos nuestro array de tableros
//Meteremos aqui los tableros por el orden que deben ser pintados                                                                 
  var boards = [];


  //Recogemos el canvas definido en el html e inicializamos la spritesheet
  //Aqui habria que cargar nuestra spriete sheet cuando la tengamos metida
  this.initialize = function(canvasElementId,sprite_data,callback) {

      /*tapeteImage = new Image();
      tapeteImage.src = "images/board.jpg";*/
      

    this.canvas = document.getElementById(canvasElementId)
    this.width = this.canvas.width;
    this.height= this.canvas.height;

    //Simple formalidad
    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }

    //Aqui se pondria el reconocimento de teclas
    //this.setupInput();
    this.loop(); 

    //SpriteSheet.load(sprite_data,callback);
  };

  // Game Loop

  //Dibujamos los tableros en el orden que estan puestos
  //Cada  dt tiempo cambiamos 
  this.loop = function() { 
    var dt = 30 / 1000;

    for(var i=0,len = boards.length;i<len;i++) {
      if(boards[i]) { 
         boards[i].draw(Game.ctx);
      }
    }

    setTimeout(Game.loop,30);
  };

  // Change an active game board
  this.setBoard = function(num,board) { boards[num] = board; };
};

