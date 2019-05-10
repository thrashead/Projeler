$(document).ready(function () {
    $("#loginbutton").click(function () {
        if ($("#loginmenu").is(":visible")) {
            $("#loginmenu").slideUp("slow");
            $("#loginbutton").animate({ 'marginTop': '0px' }, 500);
        }
        else {
            $("#loginmenu").slideDown("slow");
            $("#loginbutton").animate({ 'marginTop': '190px' }, 600);
        }
    });
});