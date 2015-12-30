
var Game = new function() {

  var pressed=false;
  var boards = [];
  
  
  this.countboards= function(){
    return boards.length;
  }

  this.initialize = function(canvasElementId,sprite_data,callback) {

    this.canvas = document.getElementById(canvasElementId);
    this.width = this.canvas.width;
    this.height= this.canvas.height;

    
    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }  
  
    this.setupInput();
    this.loop(boxSize,n);
    SpriteSheet.load(sprite_data,callback);
   
  };
  
  function getMousePos(canvas, evt) {
        
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }

  this.setupInput = function() {

  
    function checkValida(ficha){
    var valida=false
    for (i=0; i<posicionesValidas.length; i++){
      for (j=0; j<posicionesValidas[i].length; j++){        

        if(posicionesValidas[i][j].coord[0]*anchoficha==ficha.coord[0]
          &&posicionesValidas[i][j].coord[1]*altoficha==ficha.coord[1]
          &&ficha.rot==i){
          valida=true;
        }
                          
      }
    }
    return valida;
  }
    
    canvas.addEventListener("click", getPosition, false);

    function getPosition(evt)
    {
      if(!click){
      var pos = getMousePos(canvas, evt);
      fichaActiva.coord[0]=Math.floor(pos.x/altoficha)*altoficha;
      nuevax=fichaActiva.coord[0]
      fichaActiva.coord[1]=Math.floor(pos.y/anchoficha)*anchoficha;
      nuevay=fichaActiva.coord[1]
      
      var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,0);
        if (checkValida(nuevaFicha)){
          console.log("ES VALIDA")
          boards[2].add(nuevaFicha);  
          /***************************************************
          AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
          
          **********************************************/
          //numero de pieza que toca(numero aleatorio entre 1 y 24)
          fichaActiva.num =  ((Math.round(Math.random()*23))+1);
          fichaActiva.rot= 0;   
        }else{
           alert("Ficha no valida!");
        }
      }
      
    }
       
    window.addEventListener('keydown',check ,false);
      function check(e) {
        
       var code = e.keyCode;    
        if(code ==37) { 
          e.preventDefault();
          console.log("izquierda pressionada");
          if (fichaActiva.rot!=0){
            fichaActiva.rot=fichaActiva.rot -1;
            fichaActiva.num=fichaActiva.num -100;
            pressed=true;
          }
       
        }else if(code==39) { 
          e.preventDefault();
          console.log("derecha pressionada");
         if (fichaActiva.rot!=3){
            fichaActiva.rot=fichaActiva.rot +1;
            fichaActiva.num=fichaActiva.num +100;
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
  
    for(var i=0, len = boards.length;i<len;i++) {
      if(boards[i]) {
        //para ficha que se mueve
        if (i==3){
          boards[i].step(boards[i]);
        }
        boards[i].draw(Game.ctx);
      }
    }
    setTimeout(Game.loop,30,boxSize);
  };
 
  this.setBoard = function(num,board) {
    boards[num] = board;
   
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
  this.draw = function(ctx,sprite,x,y) {
    var s = this.map[sprite];

     if (sprite == fichFondo){
      ctx.drawImage(this.image,s.sx ,s.sy,s.w, 
                      s.h,x,y,canvas.width,canvas.height);
     }else{
      ctx.drawImage(this.image,s.sx ,s.sy,s.w, 
                      s.h,x,y,anchoficha,altoficha);
     }    
    
  };
};


//--------------------------------------------------------------------------------------------------
function TableroFijadas(fichasFijadas){

  this.draw = function(ctx){

    for (i = 0; i < fichasFijadas.length; i++) {
     
      SpriteSheet.draw(ctx,fichasFijadas[i].num,fichasFijadas[i].coord[0],
                          fichasFijadas[i].coord[1]);
    }
    
  }

  this.add= function(ficha){
    fichasFijadas.push(ficha);
  }
   
};

//--------------------------------------------------------------------------------------------------
function TableroRotaciones(posicionesValidas){

  this.draw = function(ctx){
    for (i=0; i<posicionesValidas.length; i++){
      //Solo pintamos las de la rotacion que nos interesa
       if(i == fichaActiva.rot ){
          for (j=0; j<posicionesValidas[i].length; j++){

            SpriteSheet.draw(ctx,posicionesValidas[i][j].num,posicionesValidas[i][j].coord[0]*altoficha,
                              posicionesValidas[i][j].coord[1]*anchoficha);
          }
        }
    }
  }

  
}

//--------------------------------------------------------------------------------------------------
function TableroActiva(fichaActiva){
  this.draw = function(ctx){
    SpriteSheet.draw(ctx,fichaActiva.num,fichaActiva.coord[0],
        fichaActiva.coord[1]);
  }

  this.step = function(x,y) {

    function getMousePos(canvas, evt) {
        
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }    

    document.addEventListener('mousemove',actPosition ,false);
    function actPosition(evt) {
        var pos = getMousePos(canvas, evt);
        fichaActiva.coord[0]=pos.x - anchoficha/2;
        fichaActiva.coord[1]=pos.y- altoficha/2;
    }        
  }

}

//--------------------------------------------------------------------------------------------------
function TableroFondo(fondo){
  this.draw = function(ctx){
    
    SpriteSheet.draw(ctx,fondo.num,fondo.coord[0],
        fondo.coord[1]);
  }
   

}

