/* Atamalar */

var formopencount = 1;
var type = new Object();

function FillAssignItems() {
    $("#AssignmentsTableContainer #processframe").css("display", "block");

    var data = new Object();
    data.TargetType = $("#targettypeul").children("li").children("input[type='radio']:checked").attr("name");
    data.TargetTypeID = $("#targettypeul").children("li").children("input[type='radio']:checked").attr("data-id");
    data.MainType = $("#maintypeul").children("li").children("input[type='checkbox']").attr("name");

    var listname = $.trim($("#targettypeul").children("li").children("input[type='radio']:checked").parent("li").text().replace($("#targettypeul").children("li").children("input[type='radio']:checked").parent("li").children("span").text(), ""));

    if ((data.TargetType != undefined && data.TargetTypeID != undefined && data.MainType != undefined) || data.TargetType == data.MainType) {
        $.ajax({
            type: "POST",
            url: ProjectPath + '/Ajax/Assignments/GetAssignItems',
            data: "{ data: '" + JSON.stringify(data) + "' }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                var result = answer;
                $("#maintypeul li input[type='checkbox']").prop("checked", false);
                if (result != null) {
                    $(result).each(function (crap, data) {
                        var item = $("#maintypeul li input[type='checkbox'][data-id=\"" + data + "\"]");
                        item.prop("checked", true);
                        item.parent("li").parent("ul").prepend(item.parent("li"));
                    });
                }
                $("#AssignmentsTableContainer #processframe").css("display", "none");
            }
        });
    }
    else {
        $("#maintypeul li input[type='checkbox']").prop("checked", false);
        $("#AssignmentsTableContainer #processframe").css("display", "none");
    }

}

$(document).ready(function () {
    FillAssignItems();

    if ($("#AssignmentsTableContainer").length > 0) {

        type = new Object();
        type.Name = $("#targettype").val();
        type.FilterName = $("#targetfiltername").val();

        $.ajax({
            type: "POST",
            url: ProjectPath + '/Ajax/Assignments/GetTargetData',
            data: "{ type: '" + JSON.stringify(type) + "' }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                $("#targettyperesult").html(answer);
            }
        });

        type.Name = $("#maintype").val();
        type.FilterName = $("#mainfiltername").val();

        $.ajax({
            type: "POST",
            url: ProjectPath + '/Ajax/Assignments/GetMainData',
            data: "{ type: '" + JSON.stringify(type) + "' }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                $("#maintyperesult").html(answer);
                FillAssignItems();
            }
        });

        $("#targettype").change(function () {
            if ($(this).val() != $("#maintype").val()) {
                type.Name = $(this).val();
                type.FilterName = $("#targetfiltername").val();
                $.ajax({
                    type: "POST",
                    url: ProjectPath + '/Ajax/Assignments/GetTargetData',
                    data: "{ type: '" + JSON.stringify(type) + "' }",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (answer) {
                        $("#targettyperesult").html(answer);
                        FillAssignItems();
                    }
                });
            }
            else {
                $("#targettyperesult").html("");
            }
        });

        $("#targetfiltername").keyup(function () {
            if ($("#targettype").val() != $("#maintype").val()) {
                type.Name = $("#targettype").val();
                type.FilterName = $("#targetfiltername").val();
                $.ajax({
                    type: "POST",
                    url: ProjectPath + '/Ajax/Assignments/GetTargetData',
                    data: "{ type: '" + JSON.stringify(type) + "' }",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (answer) {
                        $("#targettyperesult").html(answer);
                        FillAssignItems();
                    }
                });
            }
            else {
                $("#targettyperesult").html("");
            }
        });

        $("#maintype").change(function () {
            if ($(this).val() != $("#targettype").val()) {
                type.Name = $(this).val();
                type.FilterName = $("#mainfiltername").val();
                $.ajax({
                    type: "POST",
                    url: ProjectPath + '/Ajax/Assignments/GetMainData',
                    data: "{ type: '" + JSON.stringify(type) + "' }",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (answer) {
                        $("#maintyperesult").html(answer);
                        FillAssignItems();
                    }
                });
            }
            else {
                $("#maintyperesult").html("");
            }
        });

        $("#mainfiltername").keyup(function () {
            if ($("#maintype").val() != $("#targettype").val()) {
                type.Name = $("#maintype").val();
                type.FilterName = $("#mainfiltername").val();
                $.ajax({
                    type: "POST",
                    url: ProjectPath + '/Ajax/Assignments/GetMainData',
                    data: "{ type: '" + JSON.stringify(type) + "' }",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (answer) {
                        $("#maintyperesult").html(answer);
                        FillAssignItems();
                    }
                });
            }
            else {
                $("#maintyperesult").html("");
            }
        });
    }
});

$(function () {
    $(document).on("change", "input:radio", function () {
        FillAssignItems();
    });

    $(document).on("change", "input:checkbox", function () {
        var sender = $(this);
        var data = new Object();
        data.TargetType = $("#targettype").val();
        data.TargetTypeID = $("#targettypeul").children("li").children("input[type='radio']:checked").attr("data-id");
        data.MainType = $("#maintype").val();
        data.MainTypeID = $(this).attr("data-id");

        if (data.TargetType != undefined && data.TargetTypeID != undefined && data.MainType != undefined && data.MainTypeID != undefined) {
            if ($(this).prop("checked") == false) {
                $.ajax({
                    type: "POST",
                    url: ProjectPath + '/Ajax/Assignments/RemoveIt',
                    data: "{ data: '" + JSON.stringify(data) + "' }",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (answer) {
                        if (answer == "true") {
                            alert("Atama kaldırılmıştır.");
                        }
                        else {
                            sender.prop("checked", true);
                            alert(answer);
                        }
                    }
                });
            }
            else {
                $.ajax({
                    type: "POST",
                    url: ProjectPath + '/Ajax/Assignments/AssignIt',
                    data: "{ data: '" + JSON.stringify(data) + "' }",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (answer) {
                        if (answer == "true") {
                            alert("Atama yapılmıştır.");
                        }
                        else {
                            sender.prop("checked", false);
                            alert(answer);
                        }
                    }
                });
            }
        }
        else {
            alert("Atanacak (Ana) ve Bağlanacak tipleri doğru seçiniz...");
        }
    });
});

/* Atamalar */
