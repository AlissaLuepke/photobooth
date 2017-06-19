
// AJAX Request --> Holen der Bilder
$.ajax({
    url: "/dir",
    method: "GET"
    
}).done(function(message){
  for(var x in message){
      $.ajax({
          url: "/photos/"+message[x],
          method: "GET"
      }).done(function(message){
          $("#gallery").append("<img src='"+decodeURIComponent(message.img)+"'>");
          $("#gallery").append("<p>" + decodeURIComponent(message.text) + " ; FontID:" + message.font + "</p>");
      })
      
  }
    
    
});

