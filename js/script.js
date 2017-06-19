class FilterType {

    constructor(name, func) {
        this.name = name;
        this.func = func;
    }

}
// neues Canvas Element wurde erstellt 
var canvas = new fabric.Canvas('canvas', {
    backgroundColor: 'rgb(239, 239, 239)',
    selectionColor: 'black',
    selectionLineWidth: 2,
    selectionBorderColor: 'black',
    selectionLineWidth: 2
});

$(window).resize(function () {

    var imagewidth = $('#preview-container').width();
    $('#preview-container').height(imagewidth / 1.25);
    $('#preview-container').css('min-height', imagewidth / 1.25);


    var canvas_size = $('#canvas_image').width();

//    $('#canvas_image').height(imagewidth - 50);
//    $('canvas_image').css('min-height', (imagewidth - 50) / 1.25);
    
    canvas.setWidth( imagewidth - 50);
    canvas.setHeight( (imagewidth - 50) * 0.66);
    canvas.calcOffset();
    canvas.renderAll();


});

canvas.width = 900;
canvas.height = 900;
// canvas.height = (imagewidth) * 0.66;
canvas.calcOffset();
// Aufgenommene Bilder der Kamera wird dynamisch zum Canvas hinzugefügt

//fabric.Image.fromURL('img/1036476_8332460.jpg', function (oImg) {
fabric.Image.fromURL('capture.jpg', function (oImg) {
    wImg = oImg.getOriginalSize().width;
    wCan = canvas.width;
    oImg.scale(wCan / wImg);
    oImg.selectable = false;
    canvas.add(oImg);
    // Anwendung des Filter auf das Bild
    $(function () {
        $('.filters').on("change", "input", function () {

            var id = $(this).data("filter");
            var isChecked = ($(this).prop("checked") || id >= 0);

            /*if (filter == 5) {
                console.log("duh...");
                oImg.filters[filter] = new fabric.Image.filters.Saturate({
                        saturate: $('#saturation').val()
                    });
                oImg.applyFilters(function () {
                    canvas.renderAll();
                });
                
            } else { */

            current = filters[id];

            oImg.filters[id] = isChecked ? current.func : null;

            if (isChecked) oImg.filters[id][current.name] = parseInt($('#' + current.name).val(), 10);

            oImg.applyFilters(function () {
                canvas.renderAll();
            });
            //}
        });

    });
});

// Hinzufügen des bxSliders
$(document).ready(function () {
    $('.sliderSticker').bxSlider({
        slideWidth: 600,
        minSlides: 6,
        maxSlides: 8,
        slideMargin: 10,
        pager: false
    });
});







/// STICKER


$("#beard").click(function () {

    fabric.loadSVGFromURL('img/beard.svg', function (objects, options) {

        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();


    });

});
$("#flower").click(function () {

    fabric.loadSVGFromURL('img/augenklappe.svg', function (objects, options) {

        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();


    });

});
$("#crown").click(function () {

    fabric.loadSVGFromURL('img/crown.svg', function (objects, options) {

        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();


    });

});


$("#target").click(function () {
    var selected = canvas.getActiveObject();
    canvas.remove(selected);
});


//Speichern des neuen Bildes

$("#save").click(function () {

    $.ajax({
        url: "/",
        method: "POST",
        data: {
            save: canvas.toDataURL('png')
        }
    }).done(function (msg) {
        alert("Image saved");
    });
});


/// Filter Slider (Helligkeit, Kontrast etc.)
var rangeSlider = function () {
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    slider.each(function () {

        value.each(function () {
            var value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};

rangeSlider();

var filters = [

    new FilterType("contrast", new fabric.Image.filters.Contrast({
        contrast: 0
    })),
    new FilterType("blocksize", new fabric.Image.filters.Pixelate({
        blocksize: 0
    })),
    new FilterType("saturate", new fabric.Image.filters.Saturate({
        saturate: 0
    })),
    new FilterType("brightness", new fabric.Image.filters.Brightness({
        brightness: 0
    }))


];


document.addEventListener("DOMContentLoaded", function () {

    wait();

});

function wait() {
    console.log("Function Called");

    var e = document.getElementById('flex-container');

    e.preventDefault;

    e.className = e.className + " waited";


};