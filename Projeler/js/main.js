$(document).ready(function () {
    $(".main .frame .cell a").mouseover(function () {
        $(this).children("div.gowebsite").css("display", "block");
    }).mouseleave(function () {
        $(this).children("div.gowebsite").css("display", "none");
    });
});