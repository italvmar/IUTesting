//factor para agrandar el cuadrado
var n = 0.75;
//tamaño cuadrado
var boxSize = 100*n;


var SpriteSheet = new function() {
  this.map = { };
  
  this.load = function(spriteData,callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'imagenes/sprite.png';
  };
  this.draw = function(ctx,sprite,x,y,w,h) {
    var s = this.map[sprite];
    ctx.drawImage(this.image,s.sx ,s.sy,s.w, s.h,x,y,w,h);
  };
};

var Game = new function() {

  this.initialize = function(canvasElementId,sprite_data,callback) {

    this.canvas = document.getElementById(canvasElementId);
    this.width = this.canvas.width;
    this.height= this.canvas.height;

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }
    this.loop(boxSize,n);
    SpriteSheet.load(sprite_data,callback);
  };

  var tokens = [];
  this.loop = function() {

    for(var i=0, len = tokens.length;i<len;i++) {
      if(tokens[i]) {
        if (i>0){
          tokens[i].step(tokens);
        }
        tokens[i].draw(Game.ctx);
        //console.log("dibujo");
        //console.log("x = "+tokens[1].dx+",y = "+tokens[1].dy);
      }
    }
    setTimeout(Game.loop,400);
  };
  this.setBoard = function(num,token) { tokens[num] = token; };
};


function Background(dx,dy,w,h,sprite){
  this.dx = dx;
  this.dy = dy;
  this.w = w;
  this.h = h;
  this.sprite = sprite;

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.dx,this.dy,this.w,this.h);
  }
};

function MyToken(num,x,y,rotate,sprite){
  this.numToken = num;
  this.dx = x;
  this.dy = y;
  this.rotate = rotate;
  this.sprite = sprite;

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.dx,this.dy,boxSize,boxSize);
  }

  this.step = function(tokens) {
    canvas.addEventListener("mousemove", function(e){
      tokens[1].dx = e.clientX-boxSize/2;
      tokens[1].dy = e.clientY-boxSize/2;
    });
  }
};