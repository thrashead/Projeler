$(document).ready(function () {
    $("#appperson").watermark("Aday Ad Soyad");
    $("#appnumber").watermark("İlan İsmi/Numarası");
    $("#appstartdate").watermark("Başvuru Tarihi (Başlangıç)");
    $("#appenddate").watermark("Başvuru Tarihi (Bitiş)");

    $("#appstartdate").tdCalendar();
    $("#appenddate").tdCalendar();

    $(".tdCalendar").addClass("blue");

    $("#appstartdate").val("");
    $("#appenddate").val("");
});