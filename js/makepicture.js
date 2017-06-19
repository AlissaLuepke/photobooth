$('#send').click(function() {
				$.ajax({
					method: "POST",
					url: "http://raspberrypi:8000",
					data: $('#rgbForm').serialize()
				}).done( function (msg) {
					alert(msg.status);
				});
			});
			/*
			$('#pre').click(function() {
				$.ajax({
					method: "GET",
					url: "http://raspberrypi:8000/pre"
				}).done( function (msg) {
					var i = Math.floor(Math.random() * 20000);
					console.log(i);
					$('#preview').attr("src", msg.image + "?" + i);
				});
			});*/
			$('#pre').click(function() {
				$.ajax({
					method: "GET",
					url: "http://raspberrypi:8000/start"
				});
			});
			
			$('#shoot').click(function() {
				$.ajax({
					method: "POST",
					url: "http://raspberrypi:8000",
					data: $('#shootForm').serialize()
				}).done( function (msg) {
					location.href = "http://raspberrypi:8000/index.html";
				});
			});
			
			var settings;
			
			$(document).ready(function () {
				$.ajax({
					method: "POST",
					url: "http://raspberrypi:8000/settings"
				}).done( function (msg) {
					settings = msg.settings;
					
					for (var property in settings) {
						if (settings.hasOwnProperty(property)) {
							
							$('#parameter').append('<option id="' + property + '" value="' + property + '">' + settings[property].type + '</option>');
						}
					}
					
					$('#parameter').change(function () {
						$('#value').html("");
						for (key in settings[$('#parameter').val()].options) {
							$('#value').append('<option value="' + key + '" >' + settings[$('#parameter').val()].options[key] + '</option>');
						}
					});
				});
				
				var counter = 0;
				setInterval(function () {
					$('#preview').attr("src", "http://raspberrypi:8000/buffer" + "?" + counter);
					counter = counter + 1;
				}, 100);
			});