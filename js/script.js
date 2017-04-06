// first we need to create a stage

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container', // id of container <div>
    width: width,
    height: height
});
// then create layer
var circlelayer = new Konva.Layer();
//var circle2lay = new Konva.Layer();
var imageLayer = new Konva.Layer();
var HaseLayer = new Konva.Layer();


//var circleX = stage.getWidth()/2-50;
//var circle2X = stage.getWidth()/2-80;
//var circle2Y = stage.getWidth()/2-30;
//var circleY = stage.getHeight()/2-25;
var imageObj = new Image();
var OhrenObj = new Image();


Konva.angleDeg = false;



// create our shape








/*var circle2 = new Konva.Circle({
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
});*/

//circle.setZIndex(9999);

/*
 circle.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    circle.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });
*/


imageObj.onload = function () {
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
/*OhrenObj.onload = function() {
      var hase = new Konva.Image({
        x: 250,
        y: 250,
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



    
   
OhrenObj.src = '/img/hase-01.png';*/
//circle2.setZIndex(0);
//circle2lay.add(circle2);

// add the shape to the layer
//circlelayer.add(circle2, circle);
// add the layer to the stage
stage.add(circlelayer);

// yoda.setZIndex(0);



function update(activeAnchor) {
    var group = activeAnchor.getParent();
    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    var topMiddle = group.get('.topMiddle')[0];
    var image = group.get('Image')[0];
    var anchorX = activeAnchor.getX();
    var anchorY = activeAnchor.getY();
    // update anchor positions
    switch (activeAnchor.getName()) {
    case 'topLeft':
        topRight.setY(anchorY);
        bottomLeft.setX(anchorX);
        topMiddle.setY(anchorY);
        topMiddle.setX(((topRight.getX() - anchorX) / 2) + anchorX);
        break;
    case 'topRight':
        topLeft.setY(anchorY);
        bottomRight.setX(anchorX);
        topMiddle.setY(anchorY);
        topMiddle.setX(((topLeft.getX() - anchorX) / 2) + anchorX);
        break;
    case 'bottomRight':
        bottomLeft.setY(anchorY);
        topRight.setX(anchorX);
        //topMiddle.setY(anchorY);
        topMiddle.setX(((topLeft.getX() - anchorX) / 2) + anchorX);
        break;
    case 'bottomLeft':
        bottomRight.setY(anchorY);
        topLeft.setX(anchorX);
        topMiddle.setX(((topRight.getX() - anchorX) / 2) + anchorX);
        break;
    case 'topMiddle':

        break;
    }
    image.position(topLeft.position());
    var width = topRight.getX() - topLeft.getX();
    var height = bottomLeft.getY() - topLeft.getY();
    if (width && height) {
        image.width(width);
        image.height(height);
    }
}

function addAnchor(group, x, y, name, drag, strokecolor) {
    var stage = group.getStage();
    var criclelayer = group.getLayer();
    var anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: strokecolor || '#f7f5f5',
        strokeWidth: 1,
        radius: 5,
        name: name,
        draggable: drag,
        dragOnTop: false
    });
    /*anchor.on('dragmove', function () {
        update(this);
        circlelayer.draw();
    });
    anchor.on('mousedown touchstart', function () {
        group.setDraggable(false);
        this.moveToTop();
    });
    anchor.on('dragend', function () {
        group.setDraggable(true);
        circlelayer.draw();
    });*/
    // add hover styling
    anchor.on('mouseover', function () {
        var circlelayer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(4);
        circlelayer.draw();
    });
    anchor.on('mouseout', function () {
        var circlelayer = this.getLayer();
        document.body.style.cursor = 'default';
        this.setStrokeWidth(2);
        circlelayer.draw();
    });
    if (name === 'topMiddle') {
        console.log('topMiddle');
        anchor.controlled = false;
        anchor.on('mousedown', function (evt) {
            //this.angularVelocity = 0;
            group.setDraggable(false);
            this.controlled = true;
            console.log('hallo');
        });
        stage.on('contentMouseup', function () {
            anchor.controlled = false;
            console.log('andout');
            group.setDraggable(true);
        });
        /*        
                
                var arrow = document.querySelector("#arrow");
        var arrowRects = arrow.getBoundingClientRect();
        var arrowX = arrowRects.left + arrowRects.width / 2;
        var arrowY = arrowRects.top + arrowRects.height / 2;

        addEventListener("mousemove", function(event) {
            arrow.style.transform = "rotate(" + Math.atan2(event.clientY - arrowY, event.clientX - arrowX) + "rad)";
        });*/
        stage.on('contentMousemove', function () {
            if (anchor.controlled) {
                 var mousePos = stage.getPointerPosition();
                //console.log(mousePos);
                var rot_x = (darthVaderGroup.getPosition().x + darthVaderGroup.getSize().width/2) - mousePos.x;
                var rot_y = (darthVaderGroup.getPosition().y + darthVaderGroup.getSize().height/2) - mousePos.y;
                //console.log(rot_x + ", " + rot_y);
                
              
                darthVaderGroup.setRotation(0.5 * Math.PI + Math.atan(rot_y / rot_x));
                //group.setRotation(Math.random(0, 300));
                console.log(darthVaderGroup.setRotation());
                if (mousePos.x <= stage.getWidth() / 2) {
                    darthVaderGroup.rotate(Math.PI);
                }
            }
        });
    } else {
        anchor.on('dragmove', function () {
            update(this);
            circlelayer.draw();
        });
        anchor.on('mousedown touchstart', function () {
            group.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function () {
            group.setDraggable(true);
            circlelayer.draw();
        });
    }

    group.add(anchor);
}


stage.add(circlelayer);
// darth vader
var darthVaderImg = new Konva.Image({
    width: 150,
    height: 150
});




var darthVaderGroup = new Konva.Group({
    x: 100,
    y: 100,
    draggable: true
});
circlelayer.add(darthVaderGroup);
darthVaderGroup.add(darthVaderImg);
addAnchor(darthVaderGroup, 0, 0, 'topLeft', true);
addAnchor(darthVaderGroup, 150, 0, 'topRight', true);
addAnchor(darthVaderGroup, 150, 150, 'bottomRight', true);
addAnchor(darthVaderGroup, 0, 150, 'bottomLeft', true);
addAnchor(darthVaderGroup, 75, 0, 'topMiddle', false, 'black');

darthVaderImg.setZIndex(5);


var imageObj1 = new Image();

imageObj1.onload = function () {
    darthVaderImg.image(imageObj1);
    circlelayer.draw();

};
imageObj1.src = '/img/hase-01.png';




//Konva.angleDeg = false;


//var animatedLayer = new Konva.Layer();
/*  var star = new Konva.Star({
      x: stage.getWidth() / 2,
      y: stage.getHeight() / 2,
      outerRadius: 80,
      innerRadius: 40,
      stroke: '#005500',
      fill: '#b5ff88',
      strokeWidth: 4,
      numPoints: 5,
      lineJoin: 'round',
      shadowOffset: 5,
      shadowBlur: 10,
      shadowColor: 'black',
      shadowOpacity: 0.5,
      opacity: 0.8
  });*/
// custom properties
//star.lastRotation = 0;
//star.angularVelocity = 6;
//star.controlled = false;

/*topMiddle.on('mousedown', function(evt) {
    //this.angularVelocity = 0;
    this.controlled = true;
});*/
// animatedLayer.add(star);
/* var center = new Konva.Circle({
     x: stage.getWidth() / 2,
     y: stage.getHeight() / 2,
     radius: 3,
     fill: '#555'
 });
 animatedLayer.add(center);*/
// add listeners to container
/*stage.on('contentMouseup', function () {
    star.controlled = false;
});
stage.on('contentMousemove', function () {
    if (star.controlled) {
        var mousePos = stage.getPointerPosition();
        var x = star.getX() - mousePos.x;
        var y = star.getY() - mousePos.y;
        star.setRotation(0.5 * Math.PI + Math.atan(y / x));
        if (mousePos.x <= stage.getWidth() / 2) {
            star.rotate(Math.PI);
        }
    }
});*/
// stage.add(animatedLayer);
/* var anim = new Konva.Animation(function(frame) {
        animate(animatedLayer, star, frame);
    }, animatedLayer);
    // wait one second and then spin the star
    setTimeout(function() {
        anim.start();
    });
*/