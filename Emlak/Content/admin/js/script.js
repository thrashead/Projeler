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
            } else {
                submenu.fadeOut(250);
            }
        } else {
            if (($(window).width() > 768) || ($(window).width() < 479)) {
                submenus.slideUp();
                submenu.slideDown();
            } else {
                submenus.fadeOut(250);
                submenu.fadeIn(250);
            }
        }
    });

    $(document).on("click", '.submenu ul li a', function (e) {
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
        } else {
            sidebar.addClass('open');
            ul.slideDown(250);
        }
    });
});

function goPage(newURL) {
    if (newURL != "") {
        if (newURL == "-") {
            resetMenu();
        }
        else {
            document.location.href = newURL;
        }
    }
}

function resetMenu() {
    document.gomenu.selector.selectedIndex = 2;
}