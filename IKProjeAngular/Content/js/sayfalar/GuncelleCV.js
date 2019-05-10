$(document).ready(function () {
    $('#phone').mask("999 999 99 99");
    $('#refPhone').mask("999 999 99 99");
    TDDropDown($("#city"));
    TDDropDown($("#gender"));
    TDDropDown($("#marriage"));
    TDDropDown($("#smoking"));
    TDDropDown($("#workingstatus"));
    TDDropDown($("#workingtime"));
    TDDropDown($("#salary"));
    TDDropDown($("#sector"));
    TDDropDown($("#division"));
    TDDropDown($("#position"));
    TDDropDown($("#jobsector"));
    TDDropDown($("#jobdivision"));
    TDDropDown($("#jobposition"));
    TDDropDown($("#jobcity"));
    TDDropDown($("#eduselect"));
    TDDropDown($("#educity"));
    TDDropDown($("#edulevel"));
    TDDropDown($("#eduticket"));
    TDDropDown($("#langreading"));
    TDDropDown($("#langwriting"));
    TDDropDown($("#langspeaking"));
    TDDropDown($("#comptype"));
    TDDropDown($("#comppoint"));

    //Çalışma
    $("#addsector").click(function () {
        AddItem($("#sectoroptions"), $("#addedsectors"));
    });

    $("#adddivision").click(function () {
        AddItem($("#divisionoptions"), $("#addeddivisions"));
    });

    $("#addposition").click(function () {
        AddItem($("#positionoptions"), $("#addedpositions"));
    });

    $("#militaryno, #militaryno2, #militaryok").change(function () {
        if ($(this).attr("id") == "militaryok" && $(this).is(":checked")) {
            $("#militarydate").val("");
            $("#militarydate").prop("disabled", false);
        }
        else {
            $("#militarydate").val("");
            $("#militarydate").prop("disabled", true);
        }
    });

    $("#driverno, #driverok").change(function () {
        if ($(this).attr("id") == "driverok" && $(this).is(":checked")) {
            $("#driverclass").val("");
            $("#driverclass").prop("disabled", false);
        }
        else {
            $("#driverclass").val("");
            $("#driverclass").prop("disabled", true);
        }
    });

    $("#eduContinue").change(function () {
        if ($(this).is(":checked")) {
            $("#eduEndDate").val("");
            $("#eduEndDate").prop("disabled", true);
        }
        else {
            $("#eduEndDate").val("");
            $("#eduEndDate").prop("disabled", false);
        }
    });

    $("#jobContinue").change(function () {
        if ($(this).is(":checked")) {
            $("#jobEndDate").val("");
            $("#jobEndDate").prop("disabled", true);
        }
        else {
            $("#jobEndDate").val("");
            $("#jobEndDate").prop("disabled", false);
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
    $(document).on("click", "#addedsectors li, #addeddivisions li, #addedpositions li", function () {
        $(this).fadeOut("slow", function () { $(this).remove(); });
    });
});