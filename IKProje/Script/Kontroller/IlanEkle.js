$(document).ready(function () {
    $("#announceadd li a").click(function () {
        var tab = $(this).attr("data-tab");

        if ($("#addannounce .content[data-tab='" + tab + "']").length > 0) {
            if (!$("#addannounce .content[data-tab='" + tab + "']").is(":visible")) {
                $("#announceadd li a").removeClass("active");
                $(this).addClass("active");
                $("#addannounce .content").hide();
                $("#addannounce .content.fixed").show();
                $("#addannounce .content[data-tab='" + tab + "']").fadeIn("slow");
            }

            if ($("body").width() <= 1024) {
                $("html, body").animate({
                    scrollTop: 120
                }, 1000);
            }
        }
        else {
            alert("Önce İlan İçeriği bilgilerini doldurup ilanınızı kaydetmelisiniz.")
        }
    });
});