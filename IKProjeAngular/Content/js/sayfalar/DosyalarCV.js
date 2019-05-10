$(function () {
    $("#addfile").click(function () {
        var addButton = $(this);

        var ozgecmisDosya = new Object();
        ozgecmisDosya.Baslik = $("#fileName").val();
        ozgecmisDosya.Dosya = $("#fileFile").val().split('\\')[$("#fileFile").val().split('\\').length - 1];
        ozgecmisDosya.Kod = guid(6) + "a";

        if (ozgecmisDosya.Baslik = "" || ozgecmisDosya.Dosya == "") {
            alert("Lütfen bütün bilgileri eksiksiz doldurunuz.");
            return false;
        }

        var formData = new FormData();
        var totalFiles = document.getElementById("fileFile").files.length;
        var file = document.getElementById("fileFile").files[0];
        if (file.size <= 0 || file.size > 200000) {
            alert("Dosya boyutu 0 byte olamaz ve 200 kb'tan da büyük olamaz.");
        }
        else {
            formData.append("fileFile", file);

            $.ajax({
                type: "POST",
                url: MainPath + "/Ajax/Kullanici/DosyaGonder",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                success: function (dosya) {
                    if (dosya != "") {
                        ozgecmisDosya.Dosya = dosya;
                        ozgecmisDosya.Baslik = $("#fileName").val();

                        $.ajax({
                            url: MainPath + "/Ajax/Kullanici/OzgecmisDosyaEkle",
                            data: "{ ozgecmisDosya: '" + JSON.stringify(ozgecmisDosya) + "' }",
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (answer) {
                                if (answer == true) {
                                    alert("Kayıt Başarılı.");

                                    var htmlResult = "<div class='row' data-guid='" + ozgecmisDosya.Kod + "'>";
                                    htmlResult += "<div class='title'>" + ozgecmisDosya.Baslik + "</div>";

                                    htmlResult += "<div class='word'><a target='_blank' href='" + UploadPath + "/Aday/" + $("#hdnLoginGuid").val() + "/" + ozgecmisDosya.Dosya + "'>" + ozgecmisDosya.Dosya + "</a></div>";
                                    htmlResult += "<a onclick='javascript:;' class='red button removefile' data-guid='" + ozgecmisDosya.Kod + "'>Sil</a></div>";

                                    $("#fileName").val("");
                                    $("#fileFile").val("")

                                    addButton.parent("div.row").after(htmlResult);
                                }
                                else {
                                    if (answer == "bilgi") {
                                        alert("Girdiğiniz bilgiler yanlış.");
                                    }
                                    else {
                                        alert("Kayıt Başarız!!!");
                                    }
                                }
                            }
                        });
                    }
                    else {
                        alert("Dosya uzantısı geçersiz.");
                    }
                }
            });
        }
    });

    $(document).on("click", ".removefile", function () {
        var answer = confirm("İlgili dosyayı silmek istediğinize emin misiniz?");
        var deleteObject = $(this);

        if (answer == true) {
            var ozgecmisDosya = new Object();
            ozgecmisDosya.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisDosyaSil",
                data: "{ ozgecmisDosya: '" + JSON.stringify(ozgecmisDosya) + "' }",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (answer) {
                    if (answer == true) {
                        alert("Silme İşlemi Başarılı.");

                        deleteObject.parent("div.row").fadeOut("slow", function () {
                            $(this).remove();
                        });
                    }
                    else {
                        if (answer == "bilgi") {
                            alert("Bilgiler yanlış.");
                        }
                        else if (answer == "dosya") {
                            alert("Dosya Silinemedi!!!");
                        }
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });
});