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

var Game = new function() {
  this.initialize = function(canvasElementId,sprite_data,callback,boxSize,n) {

    this.canvas = document.getElementById(canvasElementId);
    this.width = this.canvas.width;
    this.height= this.canvas.height;

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }
  //this.setupInput();
    this.loop(boxSize,n);
    SpriteSheet.load(sprite_data,callback);
    //Board.load(callback);
  };

  var tokens = [];
  this.loop = function(boxSize) {
    //Board.draw(Game.ctx,boxSize,n);
    for(var i=0, len = tokens.length;i<len;i++) {
      if(tokens[i]) {
        console.log(tokens.length);
        tokens[i].draw(Game.ctx,boxSize);
      }
    }
    setTimeout(Game.loop,30,boxSize);
  };
  this.setBoard = function(num,token) { tokens[num] = token; };
};


function Board(dx,dy,w,h){
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
};

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