$(document).ready(function () {
    TDDropDown($("#cityselect"));
    TDDropDown($("#genderselect"));
    TDDropDown($("#worktypeselect"));
    TDDropDown($("#sectorselect"));
    TDDropDown($("#departselect"));
    TDDropDown($("#positionselect"));
    TDDropDown($("#jobtimeselect"));
    TDDropDown($("#eduselect"));
    TDDropDown($("#experselect"));
    TDDropDown($("#otherselect"));

    $("#addcity").click(function () {
        AddItem($("#cityoptions"), $("#addedcities"))
    });

    $("#addworktype").click(function () {
        AddItem($("#worktypeoptions"), $("#addedworktypes"))
    });

    $("#addsector").click(function () {
        AddItem($("#sectoroptions"), $("#addedsectors"))
    });

    $("#adddepart").click(function () {
        AddItem($("#departoptions"), $("#addeddeparts"))
    });

    $("#addposition").click(function () {
        AddItem($("#positionoptions"), $("#addedpositions"))
    });

    $("#addedu").click(function () {
        AddItem($("#eduoptions"), $("#addededus"))
    });

    $("#addexper").click(function () {
        AddItem($("#experoptions"), $("#addedexpers"))
    });

    $("#addother").click(function () {
        AddItem($("#otheroptions"), $("#addedothers"))
    });

    $("#keyword").watermark("Anahtar Sözcük...");

    $("#leftclick").click(function () {
        if ($("#jobsearch").css("left") == "-300px") {
            $("#jobsearch").animate({
                "left": "0px"
            }, 100);
        }
        else if ($("#jobsearch").css("left") == "0px") {
            $("#jobsearch").animate({
                "left": "-300px"
            }, 100);
        }
    });

    $(window).scroll(function () {
        var top = ($(document).scrollTop() + $(window).height()) - $(".buttonsearch").height();
        var top2 = $("#jobsearch").offset().top + $("#jobsearch").height();

        if ($("#leftclick").is(":visible")) {
            top -= 150;
            top2 -= 150;
        }

        if (top <= top2) {
            if ($("#leftclick").is(":visible")) {
                $(".buttonsearch").css("top", top.toString() + "px");
            }
            else {
                $(".buttonsearch").css("top", top.toString() + "px");
            }
        }
        else {
            if (DetectBrowser("Firefox") == true) {
                $(".buttonsearch").css("top", (top2 - $(".buttonsearch").height() - 1).toString() + "px");
            }
            else {
                $(".buttonsearch").css("top", (top2 - $(".buttonsearch").height() - 3).toString() + "px");
            }
        }
    });

    function AddItem(options, addItem) {
        if (options.prev().attr("data-value") != 0) {
            var item = options.children("li[data-selected=\"true\"]");
            var appendtext = "<li data-value=\"" + item.attr("data-value") + "\">" + item.text() + "</li>";
            if (addItem.html().indexOf(appendtext) <= -1) {
                addItem.append(appendtext);
            }
        }
    }
});

$(function () {
    $(document).on("click", "#addedcities li, #addedworktypes li, #addedsectors li, #addeddeparts li, #addedpositions li, #addededus li, #addedexpers li, #addedothers li", function () {
        $(this).fadeOut("slow", function () { $(this).remove(); });
    });
});