var SpriteSheet = new function() {
  this.map = { };
  this.load = function(spriteData,callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'imagenes/sprite.png';
  };
  this.draw = function(ctx,sprite,x,y,boxSize) {
    console.log("declaro s");
    console.log(this.map[sprite]);
    var s = this.map[sprite];
    ctx.drawImage(this.image,s.sx ,s.sy,s.w, s.h,x,y,boxSize,boxSize);
  };
};

var Board = new function() {
  this.numRows = 10;
  this.columns = 10;
  this.draw = function(ctx,boxSize,n){
    ctx.lineWidth = 4;

    for (var i = 0; i < this.columns; i++){
      for (var j = 0; j < this.numRows; j++){
        var p = {};
        p.x = i*boxSize;
        p.y = j*boxSize;
        //dibujo cruz
        ctx.strokeStyle = "#2E2EFE";
        ctx.moveTo(p.x+35*n,p.y+50*n);
        ctx.lineTo(p.x+65*n,p.y+50*n);
        ctx.stroke();
        ctx.moveTo(p.x+50*n,p.y+35*n);
        ctx.lineTo(p.x+50*n,p.y+65*n);
        ctx.stroke();
        //dibujo rectangulos
        ctx.fillStyle = "#58ACFA";
        var rectangle = new Path2D();
        rectangle.rect(p.x, p.y, boxSize, boxSize);
        ctx.stroke(rectangle);
        ctx.fill(rectangle);

      }
    }
    //dibujo ultima cruz
    ctx.moveTo(boxSize*boxSize-(65*n),boxSize*boxSize-(50*n));
    ctx.lineTo(boxSize*boxSize-(35*n),boxSize*boxSize-(50*n));
    ctx.stroke();
    ctx.moveTo(boxSize*boxSize-(50*n),boxSize*boxSize-(65*n));
    ctx.lineTo(boxSize*boxSize-(50*n),boxSize*boxSize-(35*n));
    ctx.stroke();
    console.log("Termino de dibujar tablero");
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
    this.loop(boxSize);
    SpriteSheet.load(sprite_data,callback);
    Board.draw(this.ctx,boxSize,n);
  };

  var boards = [];
  this.loop = function(boxSize) {
  //var dt = 30/1000;
    for(var i=0, len = boards.length;i<len;i++) {
      if(boards[i]) {
      //boards[i].step(dt);
      //boards[i] && boards[i].draw(Game.ctx);
        console.log("a");
        boards[i].draw(Game.ctx,boxSize);
        console.log("b");
      }
    }
    setTimeout(Game.loop,30);
  };
  this.setBoard = function(num,board) { boards[num] = board; };
};


function MyToken(num,x,y,rotate,sprite_data){
  this.numToken = num;
  this.dx = x;
  this.dy = y;
  this.rotate = rotate;
  this.sprite = sprite_data;

  this.draw = function(ctx,boxSize){
    console.log("antes de dibujar ficha");
    SpriteSheet.draw(ctx,this.sprite,this.dx,this.dy,boxSize);
    console.log("despues de dibujar ficha");
  }
};


/*
var GameBoard = function() {
  var board = this;
  // The current list of objects
  this.objects = [];
  this.cnt = 0;

  this.add = function(obj) {
    obj.board=this;
    this.objects.push(obj);
    //this.cnt[obj.type] = (this.cnt[obj.type] || 0) + 1;
    this.cnt += 1;
    return obj;
  };

  this.iterate = function(funcName) {
    var args = Array.prototype.slice.call(arguments,1);
    len=this.objects.length;
    for(var i=0;i<len;i++) {
      var obj = this.objects[i];
      obj[funcName].apply(obj,args)
    }
  };
};
*/