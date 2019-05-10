$(document).ready(function () {
    TDDropDown($("#interviews"));
    $("#saveinterview").attr("data-value", "0");

    $("#clearinterview").click(function () {
        ClearForm();
    });

    $("#saveinterview").click(function () {
        if ($("#name").val() == "" || $("#description").val() == "") {
            alert("Lütfen Bilgileri Eksiksiz Giriniz.");
            return false;
        }

        var onyaziID = parseInt($(this).attr("data-value"));

        var onyazi = new Object();
        onyazi.ID = onyaziID;
        onyazi.Baslik = $("#name").val();
        onyazi.Aciklama = $("#description").val();

        SaveCoverLetter(onyazi);
    });

    function SaveCoverLetter(onyazi) {
        var islem = "Kaydet";

        if (onyazi.ID != 0) {
            islem = "Guncelle";
        }

        $.ajax({
            type: "POST",
            url: MainPath + '/Ajax/Kullanici/Onyazi' + islem,
            data: "{ onyazi: '" + JSON.stringify(onyazi) + "' }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer != false) {
                    alert("Kayıt Tamamlandı.");
                    if (onyazi.ID != 0) {
                        $("#interviewopt li[data-selected='true']").text(onyazi.Baslik);
                    }
                    else {
                        $("#interviewopt").append("<li data-value='" + answer.toString() + "'>" + onyazi.Baslik + "</li>");
                    }

                    ClearForm();
                }
                else {
                    alert("Kayıt Sırasında Hata Oluştu.");
                    return false;
                }
            }
        });
    }
});

$(function () {
    $(document).on("click", "#interviewopt li", function () {
        var onyaziID = parseInt($(this).attr("data-value"));
        $("#saveinterview").attr("data-value", onyaziID.toString());
        $("#interviewopt li").removeAttr("data-selected");
        $("#interviewopt li[data-value='" + onyaziID.toString() + "']").attr("data-selected", "true");
        if (onyaziID != 0) {
            BringCoverLetter(onyaziID);
        }
        else {
            ClearForm();
        }
    });

    $(document).on("click", "#deleteinterview", function () {
        var onyaziID = parseInt($("#interviews").attr("data-value"));

        if (onyaziID > 0) {
            DeleteCoverLetter(onyaziID);
        }
        else {
            alert("Lütfen geçerli bir önyazı seçiniz.");
            return false;
        }
    });

    function BringCoverLetter(onyaziID) {
        $.ajax({
            type: "POST",
            url: MainPath + '/Ajax/Kullanici/OnyaziGetir',
            data: "{'onyaziID': " + onyaziID + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (onyazi) {
                $("#interviews").attr("data-value", onyaziID);
                $("#interviews").text(onyazi.Baslik);
                $("#name").val(onyazi.Baslik);
                $("#description").val(onyazi.Aciklama);
            }
        });
    }

    function DeleteCoverLetter(onyaziID) {
        $.ajax({
            type: "POST",
            url: MainPath + '/Ajax/Kullanici/OnyaziSil',
            data: "{'onyaziID': " + onyaziID + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer != false) {
                    alert("Kayıt Silindi.");
                    $("#interviewopt li[data-value='" + onyaziID.toString() + "']").remove();
                    ClearForm();
                }
                else {
                    alert("Kayıt Sırasında Hata Oluştu.");
                    return false;
                }
            }
        });
    }
});

function ClearForm() {
    $("#interviewopt li").removeAttr("data-selected");
    $("#interviewopt li:first").attr("data-selected", "true");
    $("#interviews").attr("data-value", $("#interviewopt li:first").attr("data-value"));
    $("#interviews").text($("#interviewopt li:first").text());
    $("#name").val("");
    $("#description").val("");
    $("#saveinterview").attr("data-value", $("#interviewopt li:first").attr("data-value"));
}

