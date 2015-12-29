
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
  
  function getMousePos(canvas, evt) {
        
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

  
    //Dentro de esta funcion que inicializamos en el initialize guardamos
    //todos los eventos que pueden ir surgiendonos como los de raton o teclado
    //tambien las cosas que tienen que hacer esos eventos sobre las piezas
    //o las estructuras de datos

  this.setupInput = function() {

    //Con esta funcion comprobamos si  la ficha que queremos colocar
    //Esta dentro de las fichas validas permitidas para esa casilla y esa rotacion
    //De ser asi la metemos EJ: La ficha de la posicion 4/4 solo acepta rot 3
    function checkValida(ficha){
    var valida=false
    for (i=0; i<fichasValidas.length; i++){
      for (j=0; j<fichasValidas[i].length; j++){        

        if(fichasValidas[i][j].coord[0]*anchoficha==ficha.coord[0]
          &&fichasValidas[i][j].coord[1]*altoficha==ficha.coord[1]
          &&ficha.rot==i){
          valida=true;
        }
                          
      }
    }
    return valida;
  }

    
    //Este evento lo usamos para colocar una pieza en el tablero
    //al hacer click, siempre y cuando esa ficha sea valida
    canvas.addEventListener("click", getPosition, false);

    function getPosition(evt)
    {
      if(!click){
      var pos = getMousePos(canvas, evt);
      fichaActual.coord[0]=Math.floor(pos.x/altoficha)*altoficha;
      nuevax=fichaActual.coord[0]
      fichaActual.coord[1]=Math.floor(pos.y/anchoficha)*anchoficha;
      nuevay=fichaActual.coord[1]
      
      var nuevaFicha = new ficha(fichaActual.num,nuevax,nuevay,fichaActual.rot,0);
        if (checkValida(nuevaFicha)){
          console.log("ES VALIDA")
          boards[2].add(nuevaFicha);     
        }else{
           alert("Ficha no valida!");
        }
      }
      
    }
    

    //Este evento lo usamos para recoger cuando
    //el jugador presienoa tanto izquierda como derecha
    //Y bloquea el teclado hasta que se pulse otra tecla
    //O se suelte la anterior (Esto lo hace el evento keyup de abajo)
    window.addEventListener('keydown',check ,false);
      function check(e) {
        
       var code = e.keyCode;    
        if(code ==37) { 
          e.preventDefault();
          console.log("izquierda pressionada");
          if (fichaActual.rot!=0){
            fichaActual.rot=fichaActual.rot -1;
            fichaActual.num=fichaActual.num -100;
            pressed=true;
          }
       
        }else if(code==39) { 
          e.preventDefault();
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

    window.addEventListener('keyup',function(e) {
      pressed=false;
    },false);
  
  }
  
  
  this.loop = function(boxSize) {
  

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

     if (sprite == fichFondo){
      ctx.drawImage(this.image,s.sx ,s.sy,s.w, 
                      s.h,x,y,boxSize,boxSize);
     }else{
      ctx.drawImage(this.image,s.sx ,s.sy,s.w, 
                      s.h,x,y,anchoficha,altoficha);
     }    
    
  };
};


//En este tablero englobamos las fichas activas
//De la partida
function MyActivas(fichasActivas){

  this.draw = function(ctx,boxSize){

    for (i = 0; i < fichasActivas.length; i++) {
     
      SpriteSheet.draw(ctx,fichasActivas[i].num,fichasActivas[i].coord[0],
                          fichasActivas[i].coord[1],boxSize);
    }
    
  }

  this.add= function(ficha){
    fichasActivas.push(ficha);
  }
   this.step = function(ctx) {
   }
};

//Tablero en el que colocamos las rotaciones posibles
//Dibuja piezas azules teniendo en cuenta sus coordenadas recibidas
//Por eso hay que multiplicar por el alto y el ancho ya que logica
//nos las pasa solo en forma de coordenada.
function MyValidas(fichasValidas){

  this.draw = function(ctx,boxSize){
    for (i=0; i<fichasValidas.length; i++){
      //Solo pintamos las de la rotacion que nos interesa
       if(i == fichaActual.rot ){
          for (j=0; j<fichasValidas[i].length; j++){

            SpriteSheet.draw(ctx,fichasValidas[i][j].num,fichasValidas[i][j].coord[0]*altoficha,
                              fichasValidas[i][j].coord[1]*anchoficha,boxSize);
          }
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

  this.step = function(x,y) {

    function getMousePos(canvas, evt) {
        
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

    //TODO:Sigue consumiendo muchos recursos
    //Seguro que hay forma de que no los consuma


//Esto nos devuelve la posicion actual del raton

    document.addEventListener('mousemove',actPosition ,false);
    function actPosition(evt) {
        var pos = getMousePos(canvas, evt);
        fichaActual.coord[0]=pos.x - anchoficha/2;
        fichaActual.coord[1]=pos.y- altoficha/2;
    }        
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

