$(document).ready(function() {

});

$(function () {
    $(document).on("click", ".dropdown-toggle", function () {
        $(this).parent().addClass("open");
    });

    $(document).on("click", '.submenu > a', function () {
        var submenu = $(this).siblings('ul');
        var li = $(this).parents('li');
        var submenus = $('#sidebar li.submenu ul');
        if (li.hasClass('open')) {

            if (($(window).width() > 768) || ($(window).width() < 479)) {
                submenu.slideUp();
                li.removeClass('open');
            } else {
                submenu.fadeOut(250);
                li.removeClass('open');
            }

        } else {

            if (($(window).width() > 768) || ($(window).width() < 479)) {
                submenus.slideUp();
                submenu.slideDown();
                li.addClass('open');
            } else {
                submenus.fadeOut(250);
                submenu.fadeIn(250);
                li.addClass('open');
            }

        }
    });

    $(document).on("click", '.submenu ul li a', function () {
        $('.submenu ul li a').removeClass("active");
        $(this).addClass("active");
    });

    var ul = $('#sidebar > ul');

    $(document).on("click", '#sidebar > a', function (e) {
        e.preventDefault();
        var sidebar = $('#sidebar');

        if (sidebar.hasClass('open')) {
            sidebar.removeClass('open');
            ul.slideUp(250);
            sidebar.find("ul").fadeOut("slow");
        } else {
            sidebar.addClass('open');
            ul.slideDown(250);
            sidebar.find("ul").fadeIn("slow");
        }
    });
});