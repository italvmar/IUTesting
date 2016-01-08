
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
//ESTA FUNCION SE USARÁ
//Cuando tengamos que pasarles a los de logica las coordenadas de sus monigotes
//Ya que para pintar es mas sencillo llevarlas por separado y ellos las giran
//Junto con la ficha y además 
  function traduceLogicaToken(pos, rot){
    arry=[false,false,false,false,false,false,false,false,false];
  if (rot==0){
      if (pos==1){
        arry[0]=true;
      }else if( pos==2){
        arry[1]=true;
      }else if( pos==3){
      arry[2]=true;        
      }else if( pos==4){
        arry[3]=true;        
      }else if( pos==5){
        arry[4]=true;        
      }else if( pos==6){
        arry[5]=true;        
      }else if( pos==7){
        arry[6]=true;       
      }else if( pos==8){
        arry[7]=true;        
      }else if( pos==9){
        arry[8]=true;     
     }
  }
  if (rot==1){
      if (pos==1){
        arry[6]=true;
      }else if( pos==2){
        arry[7]=true;
      }else if( pos==3){
      arry[0]=true;        
      }else if( pos==4){
        arry[1]=true;        
      }else if( pos==5){
        arry[2]=true;        
      }else if( pos==6){
        arry[3]=true;        
      }else if( pos==7){
        arry[4]=true;       
      }else if( pos==8){
        arry[5]=true;        
      }else if( pos==9){
        arry[8]=true;     
     }
  }
  if (rot==2){
      if (pos==1){
        arry[4]=true;
      }else if( pos==2){
        arry[5]=true;
      }else if( pos==3){
      arry[6]=true;        
      }else if( pos==4){
        arry[7]=true;        
      }else if( pos==5){
        arry[0]=true;        
      }else if( pos==6){
        arry[1]=true;        
      }else if( pos==7){
        arry[2]=true;       
      }else if( pos==8){
        arry[3]=true;        
      }else if( pos==9){
        arry[8]=true;     
     }
  }
  if (rot==3){
      if (pos==1){
        arry[2]=true;
      }else if( pos==2){
        arry[3]=true;
      }else if( pos==3){
      arry[4]=true;        
      }else if( pos==4){
        arry[5]=true;        
      }else if( pos==5){
        arry[6]=true;        
      }else if( pos==6){
        arry[7]=true;        
      }else if( pos==7){
        arry[0]=true;       
      }else if( pos==8){
        arry[1]=true;        
      }else if( pos==9){
        arry[8]=true;     
     }
  }
     return arry;
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
    
    game.addEventListener("click", getPosition, false);

    function getPosition(evt)
    {
      if(!click && !esvalida){
      var pos = getMousePos(canvas, evt);
      fichaActiva.coord[0]=Math.floor(pos.x/altoficha)*altoficha;      
      fichaActiva.coord[1]=Math.floor(pos.y/anchoficha)*anchoficha;

      nuevax=fichaActiva.coord[0]
      nuevay=fichaActiva.coord[1]
      
      var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,0,playerActivo);
        if (checkValida(nuevaFicha)){
          esvalida=true;
          console.log("ES VALIDA")
          console.log("INTRODUCE UN TOKEN DANDOLE A UNA TECLA DEL TECLADO")
          
        }else{
           alert("Ficha no valida!");
        }
      }
      
    }

    function dummyValido(ficha,pos){
    for (i=0; i<posicionesValidas.length; i++){
      for (j=0; j<posicionesValidas[i].length; j++){        

        if(posicionesValidas[i][j].coord[0]*anchoficha==ficha.coord[0]
          &&posicionesValidas[i][j].coord[1]*altoficha==ficha.coord[1]
          &&ficha.rot==i){
          if (ficha.rot==0){
            if (pos==1){
              return posicionesValidas[i][j].dummyPos[0];
            }else if( pos==2){
              return posicionesValidas[i][j].dummyPos[1];
            }else if( pos==3){
              return posicionesValidas[i][j].dummyPos[2];    
            }else if( pos==4){
              return posicionesValidas[i][j].dummyPos[3];       
            }else if( pos==5){
              return posicionesValidas[i][j].dummyPos[4];       
            }else if( pos==6){
              return posicionesValidas[i][j].dummyPos[5];     
            }else if( pos==7){
              return posicionesValidas[i][j].dummyPos[6];
            }else if( pos==8){
              return posicionesValidas[i][j].dummyPos[7];        
            }else if( pos==9){
              return posicionesValidas[i][j].dummyPos[8];     
           }
          }
          if (ficha.rot==1){
            if (pos==1){
              return posicionesValidas[i][j].dummyPos[6];
            }else if( pos==2){
              return posicionesValidas[i][j].dummyPos[7];
            }else if( pos==3){
              return posicionesValidas[i][j].dummyPos[0];        
            }else if( pos==4){
              return posicionesValidas[i][j].dummyPos[1];        
            }else if( pos==5){
              return posicionesValidas[i][j].dummyPos[2];        
            }else if( pos==6){
              return posicionesValidas[i][j].dummyPos[3];        
            }else if( pos==7){
              return posicionesValidas[i][j].dummyPos[4];       
            }else if( pos==8){
              return posicionesValidas[i][j].dummyPos[5];        
            }else if( pos==9){
              return posicionesValidas[i][j].dummyPos[8];     
            }
          }
          if (ficha.rot==2){
            if (pos==1){
              return posicionesValidas[i][j].dummyPos[4];
            }else if( pos==2){
              return posicionesValidas[i][j].dummyPos[5];
            }else if( pos==3){
              return posicionesValidas[i][j].dummyPos[6];        
            }else if( pos==4){
              return posicionesValidas[i][j].dummyPos[7];        
            }else if( pos==5){
              return posicionesValidas[i][j].dummyPos[0];        
            }else if( pos==6){
              return posicionesValidas[i][j].dummyPos[1];        
            }else if( pos==7){
              return posicionesValidas[i][j].dummyPos[2];       
            }else if( pos==8){
              return posicionesValidas[i][j].dummyPos[3];        
            }else if( pos==9){
              return posicionesValidas[i][j].dummyPos[8];     
           }
          }
          if (ficha.rot==3){
            if (pos==1){
              return posicionesValidas[i][j].dummyPos[2];
            }else if( pos==2){
              return posicionesValidas[i][j].dummyPos[3];
            }else if( pos==3){
              return posicionesValidas[i][j].dummyPos[4];        
            }else if( pos==4){
              return posicionesValidas[i][j].dummyPos[5];        
            }else if( pos==5){
              return posicionesValidas[i][j].dummyPos[6];        
            }else if( pos==6){
              return posicionesValidas[i][j].dummyPos[7];        
            }else if( pos==7){
              return posicionesValidas[i][j].dummyPos[0];       
            }else if( pos==8){
              return posicionesValidas[i][j].dummyPos[1];        
            }else if( pos==9){
              return posicionesValidas[i][j].dummyPos[8];     
           }
          }
                          
        }

      }
    }
    return false;
  }

    
       
    window.addEventListener('keydown',check ,false);
      function check(e) {
        
       var code = e.keyCode;    
        if(code ==37 && !esvalida) { 
          e.preventDefault();
          console.log("izquierda pressionada");
          if (fichaActiva.rot!=0){
            fichaActiva.rot=fichaActiva.rot -1;
            fichaActiva.num=fichaActiva.num -100;
            pressed=true;
          }
       
        }else if(code==39 && !esvalida) { 
          e.preventDefault();
          console.log("derecha pressionada");
         if (fichaActiva.rot!=3){
            fichaActiva.rot=fichaActiva.rot +1;
            fichaActiva.num=fichaActiva.num +100;
            pressed=true;
          }
        }else if(code==48 && esvalida ) { 
          e.preventDefault();
          console.log("0 presionado");
        
          fichaActiva.token=0;
           //No comprobamos si es valido el monigote porque no hay 
          nuevax=fichaActiva.coord[0]
          nuevay=fichaActiva.coord[1]
      
          var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,0,playerActivo);
          boards[2].add(nuevaFicha);  
          /***************************************************
          AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
              
          **********************************************/  
             
          
          esvalida=false;      
          fichaActiva.num =  ((Math.round(Math.random()*23))+1);
          fichaActiva.rot= 0;  
        }else if(code==49 && esvalida ) { 
          e.preventDefault();
          console.log("1 presionado");
            if(dummyValido(fichaActiva,1)){
              fichaActiva.token=1;
              nuevax=fichaActiva.coord[0]
              nuevay=fichaActiva.coord[1]
          
              var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
               boards[2].add(nuevaFicha);  
              /***************************************************
              AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
              
              **********************************************/


              esvalida=false;      
              fichaActiva.num =  ((Math.round(Math.random()*23))+1);
              fichaActiva.rot= 0;  
            }else{
              alert("Dummy no valid0");
            }
        }else if(code==50 && esvalida ) { 
          e.preventDefault();
          console.log("2 presionado");
          if(dummyValido(fichaActiva,2)){
            fichaActiva.token=2;
            nuevax=fichaActiva.coord[0]
            nuevay=fichaActiva.coord[1]
        
            var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
             boards[2].add(nuevaFicha);  
            /***************************************************
            AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
            
            **********************************************/  
            esvalida=false;      
            fichaActiva.num =  ((Math.round(Math.random()*23))+1);
            fichaActiva.rot= 0; 
            }else{
               alert("Dummy no valid0");
            } 
        }else if(code==51 && esvalida ) { 
          e.preventDefault();
          console.log("3 presionado");
           if(dummyValido(fichaActiva,3)){
          fichaActiva.token=3;
          nuevax=fichaActiva.coord[0]
          nuevay=fichaActiva.coord[1]
      
          var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
           boards[2].add(nuevaFicha);  
          /***************************************************
          AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
          
          **********************************************/  
          esvalida=false;      
          fichaActiva.num =  ((Math.round(Math.random()*23))+1);
          fichaActiva.rot= 0;
          }else{
               alert("Dummy no valid0");
          }  
        }else if(code==52 && esvalida ) { 
          e.preventDefault();
          console.log("4 presionado");
          fichaActiva.token=4;
          if(dummyValido(fichaActiva,4)){
            nuevax=fichaActiva.coord[0]
            nuevay=fichaActiva.coord[1]
        
            var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
             boards[2].add(nuevaFicha);  
            /***************************************************
            AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
            
            **********************************************/  
            esvalida=false;      
            fichaActiva.num =  ((Math.round(Math.random()*23))+1);
            fichaActiva.rot= 0; 

          }else{
               alert("Dummy no valid0");
            }  
        }else if(code==53 && esvalida ) { 
          e.preventDefault();
          console.log("5 presionado");
          if(dummyValido(fichaActiva,5)){
            fichaActiva.token=5;
            nuevax=fichaActiva.coord[0]
            nuevay=fichaActiva.coord[1]
        
            var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
             boards[2].add(nuevaFicha);  
            /***************************************************
            AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
            
            **********************************************/  
            esvalida=false;      
            fichaActiva.num =  ((Math.round(Math.random()*23))+1);
            fichaActiva.rot= 0;  

          }else{
               alert("Dummy no valid0");
            } 
        }else if(code==54 && esvalida ) { 
          e.preventDefault();
          console.log("6 presionado");
          if(dummyValido(fichaActiva,6)){
            fichaActiva.token=6;
            nuevax=fichaActiva.coord[0]
            nuevay=fichaActiva.coord[1]
        
            var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
             boards[2].add(nuevaFicha);  
            /***************************************************
            AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
            
            **********************************************/  
            esvalida=false;      
            fichaActiva.num =  ((Math.round(Math.random()*23))+1);
            fichaActiva.rot= 0;

          }else{
               alert("Dummy no valid0");
            }   
        }else if(code==55 && esvalida ) { 
          e.preventDefault();
          console.log("7 presionado");
          if(dummyValido(fichaActiva,7)){
            fichaActiva.token=7;
            nuevax=fichaActiva.coord[0]
            nuevay=fichaActiva.coord[1]
        
            var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
             boards[2].add(nuevaFicha);  
            /***************************************************
            AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
            
            **********************************************/  
            esvalida=false;      
            fichaActiva.num =  ((Math.round(Math.random()*23))+1);
            fichaActiva.rot= 0;  

          }else{
               alert("Dummy no valid0");
            } 
        }else if(code==56 && esvalida ) { 
          e.preventDefault();
          console.log("8 presionado");
          if(dummyValido(fichaActiva,8)){
            fichaActiva.token=8;
            nuevax=fichaActiva.coord[0]
            nuevay=fichaActiva.coord[1]
        
            var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
             boards[2].add(nuevaFicha);  
            /***************************************************
            AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
            
            **********************************************/  
            esvalida=false;      
            fichaActiva.num =  ((Math.round(Math.random()*23))+1);
            fichaActiva.rot= 0;

          }else{
               alert("Dummy no valid0");
            }   
        }else if(code==57 && esvalida ) { 
          e.preventDefault();
          console.log("9 presionado");
          if(dummyValido(fichaActiva,9)){
            fichaActiva.token=9;
            nuevax=fichaActiva.coord[0]
            nuevay=fichaActiva.coord[1]
        
            var nuevaFicha = new ficha(fichaActiva.num,nuevax,nuevay,fichaActiva.rot,fichaActiva.token,playerActivo);
             boards[2].add(nuevaFicha);  
            /***************************************************
            AQUI TENEMOS INFO PARA LOGICA DESPUES DE SELECCIONAR O NO UN MONIGOTE
            
            **********************************************/  
            esvalida=false;      
            fichaActiva.num =  ((Math.round(Math.random()*23))+1);
            fichaActiva.rot= 0;

          }else{
               alert("Dummy no valid0");
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
     }else if(sprite==501 ||sprite==502 ||sprite==503 ||sprite==504 ||sprite==505){
      ctx.drawImage(this.image,s.sx ,s.sy,s.w, 
                      s.h,x,y,anchoficha/3,altoficha/3);
     }else{
      ctx.drawImage(this.image,s.sx ,s.sy,s.w, 
                      s.h,x,y,anchoficha,altoficha);
     }    
    
  };

};

function posicionMonigote(pos){
  var x=0;
  var y=0;
  //N
  if(pos==1){
    y=-1;
  //NW
  }else if(pos==2){
    y= -1;
    x= -1;
  //W
  }else if(pos==3){
    y=0;
    x=-1
  //SW
  }else if(pos==4){
    y=1;
    x=-1
  //S
  }else if(pos==5){
    y=1;
    x=0;
  //SE
  }else if(pos==6){
    y=1;
    x=1;
  //E
  }else if(pos==7){
    y=0;
    x=1;
  //NE
  }else if(pos==8){
    y=-1;
    x=1;
  //Centro
  }else if(pos==9){
    x=0;
    y=0;
  }
  return [x,y];
}

//--------------------------------------------------------------------------------------------------
function TableroFijadas(fichasFijadas){

  this.draw = function(ctx){

    for (i = 0; i < fichasFijadas.length; i++) {
    var coorMon= posicionMonigote(fichasFijadas[i].token);
     
      SpriteSheet.draw(ctx,fichasFijadas[i].num,fichasFijadas[i].coord[0],
                          fichasFijadas[i].coord[1]);

      //Dibujamos monigotes si tienen
       
      if (fichasFijadas[i].token!=0){
        SpriteSheet.draw(ctx,500+fichasFijadas[i].player,
                          //El +****/2 es para dibujar a partir del centro de la ficha
                          //El - ****/6 es para dibujar a partir del centro del token
                          //El + coorMon/3.6 es variable y sirve para separar mas las piezas  que se vea mejor
                          fichasFijadas[i].coord[0]+anchoficha/2 -anchoficha/6 + coorMon[0]*anchoficha/3.6,
                          fichasFijadas[i].coord[1]+anchoficha/2 -altoficha/6 + coorMon[1]*altoficha/3.6);
      }
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

            SpriteSheet.draw(ctx,fichAzul,posicionesValidas[i][j].coord[0]*altoficha,
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

    game.addEventListener('mousemove',actPosition ,false);
    function actPosition(evt) {
      if(!esvalida){
        var pos = getMousePos(canvas, evt);

        fichaActiva.coord[0]=pos.x   - anchoficha/2;
        fichaActiva.coord[1]=pos.y  - altoficha/2;

        /*console.log("scrolls ofset")
        console.log(rect.left);
        console.log(rect.top);*/
      }
    }        
  }

}

function TableroPuntuaciones(jugadores){
  this.draw = function(ctx){
    for (i = 0; i < jugadores.length; i++) {
      ctx.font = "20px Arial";
      ctx.fillText("Jugador " +jugadores[i].nombre + " :",0,i*50 +20);
      ctx.fillText("Puntuacion :" + jugadores[i].puntos, 0, i*50 +40);
    }
    
    

    
  }

  this.step = function(x,y) {

      //TODO:
      //DEberiamos moverlo junto con el scroll del canvas
      //Para que esté en la esquina de la parte visible  
           
  }

}

//--------------------------------------------------------------------------------------------------
function TableroFondo(fondo){
  this.draw = function(ctx){
    
    SpriteSheet.draw(ctx,fondo.num,fondo.coord[0],
        fondo.coord[1]);
  }
   

}

