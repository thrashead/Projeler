$(document).ready(function () {
    $(".col-xs-2[data-filter='radioMainSearch'] label.b-search__main-type-svg").click(function () {
        var hasActive = $(this).hasClass("active");

        if (hasActive) {
            $(this).removeClass("active");
        }
        else {
            $("label.b-search__main-type-svg").removeClass("active");
            $(this).addClass("active");
        }
    });
    $(".col-xs-2[data-filter='radioMainSearch'] h5").click(function () {
        var hasActive = $(this).prev("label.b-search__main-type-svg").hasClass("active");

        if (hasActive) {
            $(this).prev("label.b-search__main-type-svg").removeClass("active");
        }
        else {
            $("label.b-search__main-type-svg").removeClass("active");
            $(this).prev("label.b-search__main-type-svg").addClass("active");
        }
    });
});

$(function () {

});

function isValid(text, type) {
    var pattern;

    switch (type) {
        case "username": pattern = new RegExp(/^[a-z0-9_-]{3,16}$/); break;
        case "password": pattern = new RegExp(/^[a-z0-9_-]{3,18}$/); break;
        case "hex": pattern = new RegExp(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/); break;
        case "rewrite": pattern = new RegExp(/^[a-z0-9-]+$/); break;
        case "email": pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
        case "url": pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/); break;
        case "ipaddress": pattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/); break;
        case "htmltag": pattern = new RegExp(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/); break;
        default: pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
    }

    return pattern.test(text);
}