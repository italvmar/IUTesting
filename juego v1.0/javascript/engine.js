//factor para agrandar el cuadrado
var n = 0.75;
//tamaño cuadrado
var boxSize = 100*n;
//contiene todos los posibles objetos a dibujar
var boards = [];

//------------------------------------------------
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
//----------------------------------------------------------------------------------
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

  this.loop = function() {

    for(var i=0, len = boards.length;i<len;i++) {
      if(boards[i]) {
        //para ficha que se mueve
        if (i==2){
          boards[i].step(boards[i]);
        }
        boards[i].draw(Game.ctx);
      }
    }
    setTimeout(Game.loop,30);
  };
  //funcion para fijar los distintos objetos (tablero,ficha que muevo,array de fichas colocadas,muñecos)
  this.setBoard = function(num,board) { boards[num] = board; };
};


//------------------------------------------------------------------------------------------
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

//-----------------------------------------------------------------------------
//objeto ficha simple
function Token(x,y,rotate,sprite){
  this.dx = x;
  this.dy = y;
  this.rotate = rotate;
  this.sprite = sprite;

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.dx,this.dy,boxSize,boxSize);
  }
}

//----------------------------------------------------------------------------
//la ficha que muevo por el tablero para colocarla
function CurrentToken(x,y,rotate,sprite){
  this.dx = x;
  this.dy = y;
  this.rotate = rotate;
  this.sprite = sprite;

  this.draw = function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.dx,this.dy,boxSize,boxSize);
  }

  this.step = function(board) {
    Game.canvas.addEventListener("mousemove", function(e){
      board.dx = e.clientX-boxSize/2;
      board.dy = e.clientY-boxSize/2;
    });
  }

  //devuelve la posicion donde colocar la ficha para que se ajuste al canvas(para no montar unas fichas sobre otras)
  function calculateCoord(x,y){
      var coords = {};
      //divido la coordenada entre el tamaño de una ficha,cojo la parte entera y la multiplico por el tamaño de la ficha
      coords.x = (Math.floor(x/boxSize))*boxSize;
      coords.y = (Math.floor(y/boxSize))*boxSize;
      return coords;
  };

  //capturo evento click, crea un objeto Token con coordenadas x e y ya ajustadas y lo mete en el array de fichas fijas
  Game.canvas.addEventListener("click", function(e){
    var coord = calculateCoord(e.clientX,e.clientY);
    FixedTokens.setToken(new Token(coord.x,coord.y,boards[2].rotate,boards[2].sprite));
    //nueva ficha,cambio el atributo sprite de CurrentToken
    boards[2].sprite = ((Math.round(Math.random()*23))+1).toString();; 
  });
  
};

//--------------------------------------------------------------------------------------------------
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
  this.setToken = function(token) { this.tokens.push(token); };
};

//----------------------------------------------------------------------------------------------------