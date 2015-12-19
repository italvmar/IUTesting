
var Game = new function() {


//Declaramos nuestro array de tableros
//Meteremos aqui los tableros por el orden que deben ser pintados 
  var boards = [];
  //Este metodo es util para trazar el codigo
  this.countboards= function(){
    return boards.length;
  }

  //Recogemos el canvas definido en el html e inicializamos la spritesheet
  //Aqui habria que cargar nuestra spriete sheet cuando la tengamos metida
  this.initialize = function(canvasElementId,sprite_data,callback,boxSize,n) {

    this.canvas = document.getElementById(canvasElementId);
    this.width = this.canvas.width;
    this.height= this.canvas.height;

    //Simple formalidad
    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }

  //Llamariamos al reconocimiento de teclas
  //this.setupInput();
    this.loop(boxSize,n);
    SpriteSheet.load(sprite_data,callback);
    //Board.load(callback);

   
  };

  //TODO boxsize necesario?
  //Podria ponerse directamente la constante
  this.loop = function(boxSize) {
   // Board.draw(Game.ctx,boxSize,n);
    for(var i=0, len = boards.length;i<len;i++) {
      if(boards[i]) {
        console.log(boards.length);
        console.log(boards[i].length)
        boards[i].draw(Game.ctx,boxSize);
      }
    }
    setTimeout(Game.loop,30,boxSize);
  };

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
    this.image.src = 'imagenes/sprite.png';
  };
  this.draw = function(ctx,sprite,x,y,boxSize) {
    var s = this.map[sprite];
    console.log("dibujo");
    console.log("ox: "+s.sx+" oy: "+s.sy+" dx: "+x+" dy: "+y+" alto: "+ s.h+ " ancho "+s.w);
     console.log(this.image);
    ctx.drawImage(this.image,s.sx ,s.sy,s.w, s.h,x,y,boxSize,boxSize);
    console.log("termino dibujo");
  };
};

//Esto es interesante para dibujar fondos diferentes desde imagnes
//Pero al meter el fondo en el spritesheet, no es necesario
/*function Board(dx,dy,w,h){
  this.dx = dx;
  this.dy = dy;
  this.w = w;
  this.h = h;

  this.load = function(callback){
    this.image = new Image();
    this.onload = callback;
    this.image.src = "imagenes/fondo.jpg";
  }
  this.draw = function(ctx){
    ctx.drawImage(this.image,this.dx,this.dy,this.w,this.h);
  }
};*/

function MyActivas(fichasActivas){

  this.draw = function(ctx,boxSize){

    for (i = 0; i < fichasActivas.length; i++) {
      console.log(fichasActivas.length)
      SpriteSheet.draw(ctx,fichasActivas[i].num,fichasActivas[i].coord[0],
                          fichasActivas[i].coord[1],boxSize);
    }
    
  }
};

function MyValidas(fichasValidas){

  this.draw = function(ctx,boxSize){
    for (i=0; i<fichasValidas.length; i++){
      for (j=0; j<fichasValidas[i].length; j++){
        SpriteSheet.draw(ctx,fichasValidas[i][j].num,fichasValidas[i][j].coord[0],
                          fichasValidas[i][j].coord[1],boxSize);
      }
    }
  }
}

function MyToken(num,x,y,rotate,sprite){
  this.numToken = num;
  this.dx = x;
  this.dy = y;
  this.rotate = rotate;
  this.sprite = sprite;

  this.draw = function(ctx,boxSize){
    console.log("llamo al draw del spritesheet");
    console.log(boxSize);
    SpriteSheet.draw(ctx,this.sprite,this.dx,this.dy,boxSize);
  }
};