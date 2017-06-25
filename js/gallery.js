$("#carousel").flipster({
    style: 'carousel',
    spacing: -0.5,
    nav: true,
    buttons: true,
    loop: true
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


