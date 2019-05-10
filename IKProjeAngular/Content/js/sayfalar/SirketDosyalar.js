$(document).ready(function () {
    $("#addfile").click(function () {
        var fileObject = new Object();
        fileObject.Name = $("#fileName").val();
        fileObject.File = $("#fileFile").val();
        fileObject.Guid = guid(3);

        if (fileObject.Name == "" || fileObject.File == "") {
            alert("Lütfen bütün bilgileri eksiksiz doldurunuz.");
            return false;
        }

        var htmlResult = "<div class='row' data-guid='" + fileObject.Guid + "'>";
        htmlResult += "<div class='title'>" + fileObject.Name + "</div>";

        htmlResult += "<div class='word'><a target='_blank' href='#'>" + fileObject.File.split('\\')[fileObject.File.split('\\').length - 1] + "</a></div>";
        htmlResult += "<a onclick='javascript:;' class='red button removefile'>Sil</a>";

        $(this).parent().after(htmlResult);
    });
});

$(function () {
    $(document).on("click", ".removefile", function () {
        $(this).parent("div.row").fadeOut("slow", function () { $(this).remove(); });
    });
});