$(document).ready(function () {
    $("#table .row .column.second a").click(function () {
        $("div.hiddeninfo").fadeOut("slow");

        $(this).parent().children(".hiddeninfo").fadeIn("slow");
        $(this).parent().children(".hiddeninfo").css("width", ($(this).parent().parent().width() * (7 / 10)).toString() + "px");
        $(this).parent().children(".hiddeninfo").css("max-height", ($("#table").height() * (6 / 10)).toString() + "px");
    });

    $("html").click(function (e) {
        if ($(".hiddeninfo:visible").length > 0) {
            var hiddenitem = $(".hiddeninfo:visible");
            var clickedPosX = e.pageX,
                clickedPosY = e.pageY;

            var posX = hiddenitem.offset().left,
                posX2 = hiddenitem.offset().left + hiddenitem.width() + parseInt(hiddenitem.css("padding-left").replace("px", "")) + parseInt(hiddenitem.css("padding-right").replace("px", "")),
                posY = hiddenitem.offset().top,
                posY2 = hiddenitem.offset().top + hiddenitem.height() + parseInt(hiddenitem.css("padding-top").replace("px", "")) + parseInt(hiddenitem.css("padding-bottom").replace("px", ""));

            if (clickedPosX < posX || clickedPosY < posY || clickedPosX > posX2 || clickedPosY > posY2) {
                hiddenitem.fadeOut("slow");
            }
        }
    });

    $('.hiddeninfo:visible').click(function (event) {
        event.stopPropagation();
    });

    $('#table .row .column.second a').click(function (event) {
        event.stopPropagation();
    });
});