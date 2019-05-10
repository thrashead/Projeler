$(document).ready(function () {
    TDDropDown($("#introletter"));
    TDDropDown($("#cityjob"));
    TDDropDown($("#salaryjob"));

    $("#acceptjob").click(function () {
        $(this).css("pointer-events", "none");
        $("#hiddencontent").fadeIn("slow");
    });

    $(".select li").click(function () {
        var control = true;
        $(".select").each(function () {
            if ($(this).prev("div").attr("data-value") == 0) {
                control = false;
            }
        });

        if (control == true) {
            $("#acceptjob").css("pointer-events", "");
        }
    });
});
