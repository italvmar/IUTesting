// collecion donde iremos almacenando las jugadas de cada jugador, para imprimirlas y que
// los demas jugadores sepan que es lo que esta haciendo ese jugador.

Movimientos = new Meteor.Collection('Movimientos')



if (Meteor.isClient) {

// Estructura de datos de la ficha

  var numTile = 23;
  var tileID;
  var posRot = 0;
  var gameID;  //Identificador de partida necesaria para la parte lógica del juego
  
  Session.set('showRotateTile', false);
  Session.set('showFollowers', false);
  Session.set('showPickTile', true);
  
  //var TileList = new Array(); //TileList es un array de objetos Tile
  var Tile = new Object(); //Objeto ficha, sus atributos serán toda la info necesaria de una ficha
  //Tile.Id
  //Tile.Rot[]
  
  Tile.Rot = new Array();
  var iterator;
  for(iterator=0; iterator<=3; iterator++)
  {
	Tile.Rot[iterator] = new Object(); //Es un objeto que contiene dos atributos, uno con la info de posibles posiciones en el tablero y otro con los posibles followers
	Tile.Rot[iterator].Followers = new Array(); //Es un array de las posibles posiciones de un follower {n, nw, w, sw, s, se, e, ne, c}
	Tile.Rot[iterator].TablePos = new Array(); //RotInfo.TablePos es un array de objetos Coord
  };

  var Coord = new Object(); //Objeto coordenada (x, y) para las posibles posiciones en el tablero
  Coord.x = undefined;
  Coord.y = undefined;


//Estructura de datos de un jugador
/*
  var PlayerList = new Array();  // seran 4 jugadores
  var Player = new Object();
  
  var iterator;
  for(iterator=1; iterator<=4; iterator++)
  {
	PlayerList[iterator].Player = new Object();
	PlayerList[iterator].Player.Id = iterator; // identificador de jugador
	PlayerList[iterator].Player.Score = 0;		// puntuacion	
	PlayerList[iterator].Player.Followers = 7;	// Followers
	PlayerList[iterator].Player.Turn = false;	// si tiene el turno o no
  };

*/

  Tracker.autorun(function () {
    
    var move = Movimientos.findOne();
    if(move != undefined){
    	 console.log(move);
    }
  });

  Template.game.generateTile = function(){
  	var idRandom = Math.random()*23 + 1;

  	return parseInt(idRandom);
  }, 
  
  Template.game.endOfTurn = function(){
	posRot = 0;
	Session.set('showPickTile', true);
	Session.set('showRotateTile', false);
	Session.set('showFollowers', false);
	//Pasar info a logica
  }, 
  
  Template.game.startTurn = function(){
  // meteor.call a logica
  // desencapsulamos la info
	tileID = Template.game.generateTile();
  startGame(tileID); //Hay k adaptar el codigo y cambiar la llamada
  Game.loop(Tile.Rot[posRot].TablePos);
	console.log(tileID);
  }, 
  
  Template.game.endOfGame = function(){
    Session.set('showPickTile', false);

  // meteor.call a logica
  // desencapsulamos la info
  //
  }, 
  
  Template.game.sendRotation = function(){
    Game.loop(Tile.Rot[posRot].TablePos);
  }, 
  
  Template.game.sendFollowers = function(){
	 return Tile.Rot[posRot].Followers;  //esto sera una llamada a una funcion
  }, 
  
  Template.game.helpers({
    pickTile: function () {
		return Session.get('showPickTile');
	},
	rotateTile: function () {
		return Session.get('showRotateTile');
	},
	followers: function () {
		return Session.get('showFollowers');
	}
	
  });

  Template.game.events({
	  
    'click button#PickTile': function () {

		
		Template.game.startTurn(); 
		Template.game.sendRotation(); // "enviamos" las posibles posiciones en el tablero para la rotacion por defecto
		Session.set('showRotateTile', true);
		Session.set('showpickTile', false);
    },

    'click button#RotateTile': function () {

  		console.log("Inicio: " + posRot)
  		posRot += 1;
  		if(posRot > 3)
  		{
  			posRot = 0;
  		}
  		console.log(posRot);
  	
  		Template.game.sendRotation(); // "enviamos" las posibles posiciones en el tablero para la rotacion actualizada
		
    },
    
    'click button#Ok': function () {
      // pedir las coordanas a prego 

      // if contador followers > 0
      // then 

		  Session.set('showFollowers', true);
    // else 
    //Template.game.endOfTurn();
		
    },
    
    'click button#Followers': function () {
      // comprbamos si ha colocado o no follower
      // si lo ha colocado pedimos a prego donde lo ha colocado 
      // Restar contador de followers
    	// Terminar el turno 
		  Template.game.endOfTurn();
      //Comprobar si es fin de partida, si lo es
      //Template.game.endOfGame();
		
		// controlar el fin de turno para bloquear las funciones de los demas usuarios
    },
    
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {


  });
}
