$(document).ready(function () {
    TDDropDown($("#company"));

    $("#addcompany").click(function () {
        AddItem($("#companyoptions"), $("#addedcompanies"));
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
    $(document).on("click", "#addedcompanies li", function () {
        $(this).fadeOut("slow", function () { $(this).remove(); });
    });
});