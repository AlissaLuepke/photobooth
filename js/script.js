// first we need to create a stage

var width= window.innerWidth;
var height= window.innerHeight;

var stage = new Konva.Stage({
  container: 'container',   // id of container <div>
  width: width,
  height: height
});
// then create layer
var circlelayer = new Konva.Layer();
var circle2lay = new Konva.Layer();
var imageLayer = new  Konva.Layer();
var HaseLayer = new  Konva.Layer();


var circleX = stage.getWidth()/2-50;
var circle2X = stage.getWidth()/2-80;
var circle2Y = stage.getWidth()/2-30;
var circleY = stage.getHeight()/2-25;
var imageObj = new Image();
var OhrenObj = new Image();
    


// create our shape


var circle2 = new Konva.Circle({
  x: circle2X,
  y: circle2Y,
  radius: 15,
  fill: '#309318',
  stroke: 'black',
  strokeWidth: 1,
    draggable: true 
});
var circle = new Konva.Circle({
  x: circleX,
  y: circleY,
  radius: 10,
  fill: '#b6ffa5',
  stroke: 'black',
  strokeWidth: 1,
    draggable: true 
});

//circle.setZIndex(9999);

 circle.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    circle.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });


imageObj.onload = function() {
      var yoda = new Konva.Image({
        x: 50,
        y: 50,
        image: imageObj,
        width: 427,
          height: 640
      });
     // add the shape to the layer
      circlelayer.add(yoda);
      // add the layer to the stage
      stage.add(circlelayer);
    yoda.setZIndex(0);
   
     
    };
imageObj.src = '/img/DSC_1711.jpg';
OhrenObj.onload = function() {
      var hase = new Konva.Image({
        x: 550,
        y: 550,
        image: OhrenObj,
        width: 150,
          height: 150,
          draggable:true
      });
     // add the shape to the layer
      circlelayer.add(hase);
      // add the layer to the stage
      stage.add(circlelayer);
    hase.setZIndex(2);
   
     
    };
OhrenObj.src = '/img/hase-01.png';
//circle2.setZIndex(0);
//circle2lay.add(circle2);

// add the shape to the layer
circlelayer.add(circle2, circle);
// add the layer to the stage
stage.add(circlelayer, circle2lay);

// yoda.setZIndex(0);


 