
var Game = new function() {


//Declaramos nuestro array de tableros
//Meteremos aqui los tableros por el orden que deben ser pintados 
  var pressed=false;
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

   
  
  this.setupInput();
    this.loop(boxSize,n);
    SpriteSheet.load(sprite_data,callback);
    //Board.load(callback);

   
  };
  
   //
   //    PARA PEDRO:
   //
   //
   //
   //     Esto esta como en la practica y da errores de que no esta
    //    Definido, ademas, tampoco funciona en el 
    //                   tutorial corriendo en firefox t
   //
   //
   //
   //
   //

  var KEY_CODES = { 37:'left', 39:'right', 32 :'fire' };
  this.keys = {};

  this.setupInput = function() {

    window.addEventListener('keydown',function(e) {
      if(KEY_CODES[event.keyCode]) {
       Game.keys[KEY_CODES[event.keyCode]] = true;
       e.preventDefault();
      }
    },false);

    window.addEventListener('keyup',function(e) {
      if(KEY_CODES[event.keyCode]) {
       Game.keys[KEY_CODES[event.keyCode]] = false; 
       e.preventDefault();
      }
    },false);
  }
  
  //TODO boxsize necesario?
  //Podria ponerse directamente la constante
  this.loop = function(boxSize) {
   // Board.draw(Game.ctx,boxSize,n);

   //Este loop nos pinta los tableros a cada pasada
   //Tambien nos actualiza con step los tableros
   //que tienen que ser actualizados (MyActual)
    for(var i=0, len = boards.length;i<len;i++) {
      if(boards[i]) {
        
        boards[i].draw(Game.ctx,boxSize);
        boards[i].step(Game.ctx);
      }
    }
    setTimeout(Game.loop,30,boxSize);
  };
  //Funcion que nos mete los tableros dentro del array
  //De tableros, se llama desde game.
  this.setBoard = function(num,board) {
    boards[num] = board;
   
  };
};
//Inicializamos el SpriteSheeet
//Que como objeto que es, se encarga
//de dibujar los pequeños pedacitos de si mismo
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
     
    ctx.drawImage(this.image,s.sx ,s.sy,s.w, s.h,x,y,boxSize,boxSize);
    
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
//Tablero en el que guardamos las fichas activas que 
//Hemos colocado 
function MyActivas(fichasActivas){

  this.draw = function(ctx,boxSize){

    for (i = 0; i < fichasActivas.length; i++) {
     
      SpriteSheet.draw(ctx,fichasActivas[i].num,fichasActivas[i].coord[0],
                          fichasActivas[i].coord[1],boxSize);
    }
    
  }
   this.step = function(ctx) {
   }
};
//Tablero en el que colocamos las rotaciones posibles
//Dibuja piezas azules
function MyValidas(fichasValidas){

  this.draw = function(ctx,boxSize){
    for (i=0; i<fichasValidas.length; i++){
      for (j=0; j<fichasValidas[i].length; j++){
        SpriteSheet.draw(ctx,fichasValidas[i][j].num,fichasValidas[i][j].coord[0],
                          fichasValidas[i][j].coord[1],boxSize);
      }
    }
  }

   this.step = function(ctx) {
    }
}
//Tablero que guarda la ficha actual seleccionada y la pinta dinamicamente
//en la posicion en la que está el cursor
function MyActual(fichaActual){
  this.draw = function(ctx,boxSize){
    SpriteSheet.draw(ctx,fichaActual.num,fichaActual.coord[0],
        fichaActual.coord[1],boxSize);
  }
  //TODO: Mirar donde hacer bien las declaraciones, de los eventos de canvas

  //ESTA DANDO PROBLEMAS DE RECURSOS
      function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

  this.step = function(x,y) {
    //
    //
    //    PARA PEDRO
    //
    //     He estado trasteando con los event listeners
    //        Fuera de como esta hecho en el tutorial y 
    //        no da ningun error por la consola, 
    //        simplemente los ignora
    //    
    //
    //
    //
    //

   /* window.addEventListener('keydown',this.check,true);

    function check(e) {

     var code = e.keyCode;    
        if(code ==37) { 
      console.log("izquierda pressionada");
      if (fichaActual.rot!=0){
        fichaActual.rot=fichaActual.rot -1;
        fichaActual.num=fichaActual.num -100;
        pressed=true;
      }
     
    }else if(code=39) { 
      console.log("derecha pressionada");
     if (fichaActual.rot!=3){
        fichaActual.rot=fichaActual.rot +1;
        fichaActual.num=fichaActual.num +100;
        pressed=true;
      }
    }else { 
      pressed=false;
    }
  }
*/
//
    //
    //    PARA PEDRO
    //
    //     
    //        Esto esta hecho tomando el ejemplo del tutorial
    //        
    //        
    //    
    //
    //
    //
    //
    if(Game.keys['left']) { 
      console.log("izquierda pressionada");
      if (fichaActual.rot!=0){
        fichaActual.rot=fichaActual.rot -1;
        fichaActual.num=fichaActual.num -100;
        pressed=true;
      }
     
    }else if(Game.keys['right']) { 
      console.log("derecha pressionada");
     if (fichaActual.rot!=3){
        fichaActual.rot=fichaActual.rot +1;
        fichaActual.num=fichaActual.num +100;
        pressed=true;
      }
    }else { 
      pressed=false;
    }

    //
    //
    //    PARA PEDRO
    //
    //     Esto es lo que esta dando problemas de recursos
    //        
    //        
    //        
    //    
    //
    //
    //
    //
    canvas.addEventListener('mousemove', function(evt) {
        var pos = getMousePos(canvas, evt);
        fichaActual.coord[0]=pos.x - boxSize/2;
        fichaActual.coord[1]=pos.y- boxSize/2;
      },false);
    
    
  }


}
//Este tablero guarda la imagen de fondo 
//fondoSize cambia el tamaño del fondo
function MyFondo(fondo){
  this.draw = function(ctx,boxSize){
    
    SpriteSheet.draw(ctx,fondo.num,fondo.coord[0],
        fondo.coord[1],fondoSize);
  }
 

  this.step = function(x,y) {
    
  }


}

