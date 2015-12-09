var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

var angleInDegrees=0;

var image=document.createElement("img");
image.onload=function(){
    ctx.drawImage(image,canvas.width/2-image.width/2,canvas.height/2-image.width/2);
}
image.src="https://dl.dropboxusercontent.com/u/139992952/stackoverflow/house-icon.png";

$("#clockwise").click(function(){ 
    angleInDegrees+=90;
    drawRotated(angleInDegrees);
});

$("#counterclockwise").click(function(){ 
    angleInDegrees-=90;
    drawRotated(angleInDegrees);
});

function drawRotated(degrees){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(degrees*Math.PI/180);
    ctx.drawImage(image,-image.width/2,-image.width/2);
    ctx.restore();
}
