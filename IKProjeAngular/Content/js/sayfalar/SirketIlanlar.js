$(document).ready(function () {
    $("#appname").watermark("İlan İsmi");
    $("#appnumber").watermark("İlan Numarası");
    $("#appstartdate").watermark("Başvuru Tarihi (Başlangıç)");
    $("#appenddate").watermark("Başvuru Tarihi (Bitiş)");

    $("#appstartdate").tdCalendar();
    $("#appenddate").tdCalendar();

    $(".tdCalendar").addClass("blue");

    $("#appstartdate").val("");
    $("#appenddate").val("");
});