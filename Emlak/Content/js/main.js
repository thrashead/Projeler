$(window).load(function () { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({ 'overflow': 'visible' });
});

$(document).ready(function () {
    var $SearchToggle = $('.search-form .search-toggle');
    $SearchToggle.hide();

    $('.search-form .toggle-btn').off("click").on('click', function (e) {
        e.preventDefault();
        $SearchToggle.slideToggle(300);
    });


    $(".tdslider").each(function (i) {
        var slider = $(this);

        var min = parseInt(slider.attr("data-min"));
        var max = parseInt(slider.attr("data-max"));
        var step = parseInt(slider.attr("data-step"));

        if (slider.length) {
            slider.slider({
                min: min,
                max: max,
                step: step,
                values: [min, max],
                range: true,
                slide: function (event, ui) {
                    slider.find(".ui-slider-handle span.min").text(ui.values[0]);
                    slider.find(".ui-slider-handle span.max").text(ui.values[1]);
                    slider.parent().find("input.j-min").val(ui.values[0]);
                    slider.parent().find("input.j-max").val(ui.values[1]);
                },
                stop: function (event, ui) {
                    slider.find(".ui-slider-handle span.min").text(ui.values[0]);
                    slider.find(".ui-slider-handle span.max").text(ui.values[1]);
                    slider.parent().find("input.j-min").val(ui.values[0]);
                    slider.parent().find("input.j-max").val(ui.values[1]);
                }
            });

            if (slider.find("span.min").length <= 0)
                slider.find(".ui-slider-handle:first-of-type").append("<span class='min'>" + min + "</span>");

            if (slider.find("span.max").length <= 0)
                slider.find(".ui-slider-handle:last-of-type").append("<span class='max'>" + max + "</span>");
        }
    });
});