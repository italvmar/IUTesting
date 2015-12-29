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

  //contiene todos los posibles objetos a dibujar
  var boards = [];

  this.loop = function() {

    for(var i=0, len = boards.length;i<len;i++) {
      if(boards[i]) {
        //para ficha que se mueve
        if (i==2){
          boards[i].step(boards);
          boards[i].fix();
        }
        boards[i].draw(Game.ctx);
      }
    }
    setTimeout(Game.loop,200);
  };
  //funcion para fijar los distintos objetos (tablero,ficha que muevo,array de fichas colocadas,muñecos)
  this.setBoard = function(num,board) { boards[num] = board; };
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


function ActualToken(num,x,y,rotate,sprite){
  this.numToken = num;
  this.dx = x;
  this.dy = y;
  this.rotate = rotate;
  this.sprite = sprite;

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.dx,this.dy,boxSize,boxSize);
  }

  this.step = function(boards) {
    canvas.addEventListener("mousemove", function(e){
      boards[2].dx = e.clientX-boxSize/2;
      boards[2].dy = e.clientY-boxSize/2;
    });
  }

  //devuelve la posicion donde colocar la ficha para que se ajuste al canvas
  //function calculateCoord(x,y){
      
  //};

  //metodo para fijar la ficha, crea un objeto ficha con coordenadas x e y ya ajustadas y lo mete en el array de fichas fijas
  this.fix = function() {
    canvas.addEventListener("click", function(e){
      //var coords = calculateCoord(e.clientX,e.clientY);

      console.log("he clickeado");
      //genero objeto ficha que guardar en mi array de fichas fijadas
      FixedTokens.setToken(FixedTokens.tokensCounter(),new ActualToken(numToken,e.clientX-boxSize/2,e.clientY-boxSize/2,rotate,numToken));
    });
  }
};

//objeto que contiene el array donde meter las fichas fijadas
var FixedTokens = new function(){
  this.tokens = [];

  this.draw = function(ctx){
    for(var i = 0, len = this.tokens.length;i<len;i++){
      if (this.tokens[i]){
        this.tokens[i].draw(ctx);
      }  
    }
  };
  //meter ficha en la coleccion de fichas fijadas
  this.setToken = function(num,token) { this.tokens[num] = token; };
  //contador de fichas colocadas
  this.tokensCounter = function() {return this.tokens.length; };

};
