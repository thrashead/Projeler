$(document).ready(function () {
    $("#jobheader").watermark("İlan Başlığı / Şirket Adı");
    $("#appnumber").watermark("Başvuru Numarası");
    $("#appstartdate").watermark("Başvuru Tarihi (Başlangıç)");
    $("#appenddate").watermark("Başvuru Tarihi (Bitiş)");

    $("#appstartdate").tdCalendar();
    $("#appenddate").tdCalendar();

    $(".tdCalendar").addClass("orange");

    $("#appstartdate").val("");
    $("#appenddate").val("");
});