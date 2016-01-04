

if (Meteor.isServer) {

  Meteor.methods({
  	'generateTile' : function(){
  		var idRandom = Math.random()*23 + 1;

  		return parseInt(idRandom);
  	}

  });
  Meteor.startup(function () {
  });
}
