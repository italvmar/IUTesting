console.log("CARGA GAME");
var Game = new function() { 

//Declaramos nuestro array de tableros
//Meteremos aqui los tableros por el orden que deben ser pintados                                                                 
  var boards = [];
  this.countboards= function(){
    return boards.length;
  }

  //Recogemos el canvas definido en el html e inicializamos la spritesheet
  //Aqui habria que cargar nuestra spriete sheet cuando la tengamos metida
  this.initialize = function(canvasElementId,sprite_data,callback) {

      /*tapeteImage = new Image();
      tapeteImage.src = "images/board.jpg";*/
      

    this.canvas = document.getElementById(canvasElementId)
    this.width = this.canvas.width;
    this.height= this.canvas.height;

    SpriteSheet.load(sprite_data,callback);

    //Simple formalidad
    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }

    //Aqui se pondria el reconocimento de teclas
    //this.setupInput();
    console.log("LLAMA A LOOP");
    this.loop(); 

    //SpriteSheet.load(sprite_data,callback);
  };

  // Game Loop

  //Dibujamos los tableros en el orden que estan puestos
  //Cada  dt tiempo cambiamos 
  this.loop = function() { 
    var dt = 30 / 1000;
    console.log(boards.length);
    for(var i=0,len = boards.length;i<len;i++) {
      if(boards[i]) { 
        console.log("ITERA BUCLE");
         boards[i].draw(Game.ctx);
      }
    }

    setTimeout(Game.loop,30);
  };

  // Change an active game board
  this.setBoard = function(num,board) {
    boards[num] = board;
    console.log("sets boards");
    console.log(boards.length) ;
  };
  
};

var SpriteSheet = new function() {
  this.map = { }; 

  this.load = function(spriteData,callback) { 
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'images/sprites.png';
  };

  this.draw = function(ctx,sprite,x,y,frame) {
    var s = this.map[sprite];
    if(!frame) frame = 0;
    ctx.drawImage(this.image,
                     s.sx + frame * s.w, 
                     s.sy, 
                     s.w, s.h, 
                     x,   y, 
                     s.w, s.h);
  };
}