var settings;
var counter = 0;

$('#shoot').click(function() {
     $(".button").attr('src',"img/buttons/Ausloeser_Pressed_mitBlitz_new.svg");
    
	$.ajax({
		method: "POST",
		url: "/",
		data: $('#shootForm').serialize()
	}).done( function (msg) {
		location.href = "/index.html";
	});
});
			
$(document).ready(function () {
	$.ajax({
		method: "POST",
		url: "/settings"
	}).done( function (msg) {
		if (msg.status == "error") {
			alert("Keine Kamera gefunden! Bitte Kamera anschließen und neu laden! <Durch Modal tauschen>");
			$('#shoot').unbind().css("cursor","not-allowed");
		} else {
			setInterval(function () {
				$('#preview').attr("src", "/buffer" + "?" + counter);
				counter = counter + 1;
			}, 100);
		}
	});
});
