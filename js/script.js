class FilterType {
    constructor(name, func) {
        this.name = name;
        this.func = func;
    }
}
// neues Canvas Element wurde erstellt 
var canvas = new fabric.Canvas('canvas', {
    backgroundColor: 'rgb(239, 239, 239)'
    , selectionColor: 'black'
    , selectionLineWidth: 2
    , selectionBorderColor: 'black'
    , selectionLineWidth: 2
});
$(window).resize(function () {
    var imagewidth = $('#preview-container').width();
    $('#preview-container').height(imagewidth / 1.25);
    $('#preview-container').css('min-height', imagewidth / 1.25);
    var canvas_size = $('#canvas_image').width();
    canvas.setWidth(imagewidth - 50);
    canvas.setHeight((imagewidth - 50) * 0.66);
    var ratio = canvas.width / canvas.getObjects()[0].width;
    canvas.getObjects()[0].scaleX = ratio;
    canvas.getObjects()[0].scaleY = ratio;
    canvas.renderAll();
});
// Aufgenommenes Bild der Kamera wird dynamisch zum Canvas hinzugefügt
//fabric.Image.fromURL('img/1036476_8332460.jpg', function (oImg) {
var canvas_image = fabric.Image.fromURL('capture.jpg', function (oImg) {
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
        slideWidth: 600
        , minSlides: 6
        , maxSlides: 8
        , slideMargin: 10
        , pager: false
    });
    $(window).resize();
});
/// STICKER
$("#herz").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Herzal.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#Kullerauge").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Kullerauge.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#anker").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Anker.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#augenklappe").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Augenklappe.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#Clownsnase").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Clownsnase.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});


$("#denkblase_blanco").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Denkblase_blanco.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#denkblase_omg").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Denkblase_OMG.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#denkblase_wtf").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Denkblase_WTF.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#kussmund").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Kussmund.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#monokel").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Monokel.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#zylinder").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Zylinder.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#sprechblase_blanco").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Sprechblase_blanco.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#sprechblase_wtf").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Sprechblase_WTF.svg', function (objects, options) {
        var obj = fabric.util.groupSVGElements(objects, options);
        canvas.add(obj).renderAll();
    });
});
$("#sprechblase_omg").click(function () {
    fabric.loadSVGFromURL('img/svg_sticker/Sprechblase_OMG.svg', function (objects, options) {
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
    var theText = encodeURIComponent($('#text').val());
    console.log(theText);
    $.ajax({
        url: "/"
        , method: "POST"
        , data: {
            save: canvas.toDataURL('png')
            , text: theText
            , font: $('#font').val()
        }
    }).done(function (msg) {
        alert("Image saved");
    });
});
/// Filter Slider (Helligkeit, Kontrast etc.)
var rangeSlider = function () {
    var slider = $('.range-slider')
        , range = $('.range-slider__range')
        , value = $('.range-slider__value');
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
    }))
    , new FilterType("blocksize", new fabric.Image.filters.Pixelate({
        blocksize: 0
    }))
    , new FilterType("saturate", new fabric.Image.filters.Saturate({
        saturate: 0
    }))
    , new FilterType("brightness", new fabric.Image.filters.Brightness({
        brightness: 0
    }))


];
$('#text').keyup(function () {
    $('#font option').html($(this).val());
    $('#subtext').html($(this).val());
    changeFont();
});
$('#font').change(function () {
    changeFont();
});

$('.gallerybutton').mouseover( function(){
      $(this).attr('src','img/buttons/Gallery_pressed_new.svg')
    });

function changeFont() {
    $('#subtext').removeClass(function () {
        return $(this).attr("class");
    });
    $('#subtext').addClass("font_" + $('#font').val());
    $('#font').removeClass(function () {
        return $(this).attr("class");
    });
    $('#font').addClass("font_" + $('#font').val());
}
document.addEventListener("DOMContentLoaded", function () {
    wait();
});

function wait() {
    console.log("Function Called");
    var e = document.getElementById('flex-container');
    //e.preventDefault();
    //e.className = e.className + " waited";
};