class FilterType {

    constructor(name, func) {
        this.name = name;
        this.func = func;
    }

}

var canvas = new fabric.Canvas('canvas', {
    backgroundColor: 'rgb(239, 239, 239)',
    selectionColor: 'black',
    selectionLineWidth: 2,
    selectionBorderColor: 'black',
    selectionLineWidth: 2
});


//fabric.Image.fromURL('img/1036476_8332460.jpg', function (oImg) {
fabric.Image.fromURL('capture.jpg', function (oImg) {
    wImg = oImg.getOriginalSize().width;
    wCan = canvas.width;
    oImg.scale(wCan / wImg);
    oImg.selectable = false;
    canvas.add(oImg);

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
$(document).ready(function(){
  $('.slider1').bxSlider({
    slideWidth: 600, 
    minSlides: 6,
    maxSlides: 8,
    slideMargin: 10,
      pager: false
  });
});

$("#rectangle").click(function () {

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

  var rangeSlider = function(){
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    slider.each(function(){

      value.each(function(){
        var value = $(this).prev().attr('value');
        $(this).html(value);
      });

      range.on('input', function(){
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
