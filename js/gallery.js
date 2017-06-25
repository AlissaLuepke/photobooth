var carousel = $("#carousel").flipster({
    style: 'carousel',
    spacing: -0.5,
    nav: false,
    buttons: true,
    loop: true,
    
    start: 0
});


$("#flat").flipster({
    style: 'flat',
    spacing: -0.15,
   
    start: 0
});
// AJAX Request --> Holen der Bilder
$.ajax({
    url: "/dir",
    method: "GET"
    
}).done(function(message){
  for(var x in message){
      $.ajax({
          url: "/photos/"+message[x],
          method: "GET"
      }).done(function(message) {
      	 var temp = "<li class='gallery_image'>";
          temp += "<img src='"+decodeURIComponent(message.img)+"'>";
          temp += "<p class='font_" + message.font + "'>" + decodeURIComponent(decodeURI(message.text)) + "</p>";
          temp += "</li>";
          $('#gallery').append(temp);
      });
      
  }
    
    
});

$('#0').click(function(){
   
    
    carousel.flipster('jump', 0); // Jump to a specific index
});


$('#1').click(function(){
   
    
    carousel.flipster('jump', 2); // Jump to a specific index
});




