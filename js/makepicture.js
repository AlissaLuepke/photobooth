var settings;
var counter = 0;

$('#shoot').click(function() {
	$.ajax({
		method: "POST",
		url: "http://raspberrypi:8000",
		data: $('#shootForm').serialize()
	}).done( function (msg) {
		location.href = "http://raspberrypi:8000/index.html";
	});
});
			
$(document).ready(function () {
	$.ajax({
		method: "POST",
		url: "http://raspberrypi:8000/settings"
	}).done( function (msg) {
		if (msg.status == "error") {
			alert("Keine Kamera gefunden! Bitte Kamera anschließen und neu laden! <Durch Modal tauschen>");
			$('#shoot').unbind().css("cursor","not-allowed");
		} else {
			setInterval(function () {
				$('#preview').attr("src", "http://raspberrypi:8000/buffer" + "?" + counter);
				counter = counter + 1;
			}, 100);
		}
	});
});
