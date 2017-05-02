$.ajax({
    url: "/dir",
    method: "GET"
    
}).done(function(message){
  for(var x in message){
      $.ajax({
          url: "/photos/"+x,
          method: "GET"
      }).done(function(message){
          $("#gallery").append("<img src='"+message+"'>");
      })
      
  }
    
    
});