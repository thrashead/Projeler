$(document).ready(function () {
    $("#table .row .column.second a").click(function () {
        var dataid = $(this).parent().parent().attr("data-id");
        $(this).parent().parent().removeClass("unread");
    });
});