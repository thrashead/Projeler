$(document).ready(function () {
    if ($("body").width() <= 480) {
        CKEDITOR.replace('anncontent', {
            height: "200px",
            enterMode: Number(2),
            contentsLanguage: "tr",
            skin: "office2003",
            toolbar: [
                ['Source', 'Bold', 'Italic', 'Underline', 'StrikeThrough'], ['Undo', 'Redo', 'Cut', 'Copy', 'Paste'],
                ['Font'], ['FontSize']
            ]
        });
    }
    else {
        CKEDITOR.replace('anncontent',
        {
            enterMode: Number(2),
            height: "500px",
            contentsLanguage: "tr",
            skin: "office2003"
        });
    }

    TDDropDown($("#anngender"));
    TDDropDown($("#annworktype"));
    TDDropDown($("#anneducation"));
    TDDropDown($("#annexperience"));
    TDDropDown($("#anncity"));
    TDDropDown($("#annsalary"));
    TDDropDown($("#annsector"));
    TDDropDown($("#anndepart"));
    TDDropDown($("#annposition"));

    $("#annstartdate").watermark("Başlangıç Tarihi");
    $("#annenddate").watermark("Bitiş Tarihi");

    $("#annstartdate").tdCalendar();
    $("#annenddate").tdCalendar();

    $(".tdCalendar").addClass("blue");

    $("#annstartdate").val("");
    $("#annenddate").val("");

    $(".questionType").change(function () {
        if ($("#questionType1").is(":checked")) {
            if ($(".questionoptions").is(":visible")) {
                $(".questionoptions").fadeOut("slow");
            }
        }
        else if ($("#questionType2").is(":checked")) {
            $(".questionoptions").fadeIn("slow");
        }
    });

    $("#addcity").click(function () {
        AddItem($("#anncityoptions"), $("#addedcities"));
    });

    $("#addedu").click(function () {
        AddItem($("#anneduoptions"), $("#addededus"));
    });

    $("#addexper").click(function () {
        AddItem($("#annexperoptions"), $("#addedexpers"));
    });

    $("#addsector").click(function () {
        AddItem($("#annsectoroptions"), $("#addedsectors"));
    });

    $("#adddepart").click(function () {
        AddItem($("#anndepartoptions"), $("#addeddeparts"));
    });

    $("#addposition").click(function () {
        AddItem($("#annpositionoptions"), $("#addedpositions"));
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

    $("#addquestionopt").click(function () {
        if ($("#questionopttext").val().trim() != "") {
            var appendtext = "<li data-value=\"" + $("#questionopttext").val() + "\">" + $("#questionopttext").val() + "</li>";
            $("#addedquestionopts").append(appendtext);
        }
    });

    //İçerik Kaydet
    $(".addannounce").click(function () {
        var datatipi = parseInt($(this).attr("data-type"));
        var ilanOzellik = new Object();

        ilanOzellik.IlanNo = $("#annnumber").attr("data-val");
        ilanOzellik.SoruAktifArac = $("#activeDriver").is(":checked");
        ilanOzellik.SoruHaftaSonu = $("#workOnWeekend").is(":checked");;

        ilanOzellik.Aktif = $("#annactive").is(":checked");

        if ($("#annheader").val().length >= 1 && $("#annheader").val().length <= 255) {
            ilanOzellik.Baslik = $("#annheader").val();
        }
        else {
            alert("Başlık boş geçilemez ve 255 karakterden fazla olamaz.");
            return false;
        }

        ilanOzellik.Aciklama = CKEDITOR.instances['anncontent'].getData();

        if (ilanOzellik.Aciklama.length <= 0) {
            alert("Açıklama boş geçilemez.");
            return false;
        }

        if ($("#annstartdate").val().length >= 8 && $("#annstartdate").val().length <= 10) {
            ilanOzellik.BaslangicTarih = $("#annstartdate").val();
        }
        else {
            alert("Başlangıç Tarihi boş geçilemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
            return false;
        }

        if ($("#annenddate").val().length >= 8 && $("#annenddate").val().length <= 10) {
            ilanOzellik.BitisTarih = $("#annenddate").val();
        }
        else {
            alert("Bitiş Tarihi boş geçilemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
            return false;
        }

        $.ajax({
            url: MainPath + "/Ajax/Firma/IlanIcerikKaydet",
            data: "{ ilanOzellik: '" + JSON.stringify(ilanOzellik) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı. İlanın diğer bilgilerini girebilmeniz için yandaki İlan Şartları ve İlan Soruları kısımları aktif edilmiştir.");

                    $("#addannounce .content[data-tab='sartn']").attr("data-tab", "sart");
                    $("#addannounce .content[data-tab='sorun']").attr("data-tab", "soru");

                    $("#announceadd li a").removeClass("passive");
                }
                else if (answer == "guncel") {
                    alert("Kayıt Başarılı.");

                    $("#addannounce .content[data-tab='sartn']").attr("data-tab", "sart");
                    $("#addannounce .content[data-tab='sorun']").attr("data-tab", "soru");

                    $("#announceadd li a").removeClass("passive");
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
    });
    //İçerik Kaydet

    //Şart Kaydet
    $(".saveprefer").click(function () {
        var ilanSart = new Object();

        ilanSart.IlanNo = $("#annnumber").attr("data-val");

        ilanSart.CalismaSekli = parseInt($("#annworktype").attr("data-value"));
        ilanSart.Cinsiyet = parseInt($("#anngender").attr("data-value"));
        ilanSart.Maas = parseInt($("#annsalary").attr("data-value"));

        ilanSart.Sehir = "";
        if ($("#addedcities li").length > 0) {
            $("#addedcities li").each(function () {
                ilanSart.Sehir += $(this).attr("data-value") + ",";
            });
            ilanSart.Sehir = RemoveLastChar(ilanSart.Sehir);
        }
        else {
            ilanSart.Sehir = parseInt($("#anncity").attr("data-value"));
        }

        ilanSart.SehirSor = $("#citycheck").is(":checked");

        ilanSart.Egitim = "";
        if ($("#addededus li").length > 0) {
            $("#addededus li").each(function () {
                ilanSart.Egitim += $(this).attr("data-value") + ",";
            });
            ilanSart.Egitim = RemoveLastChar(ilanSart.Egitim);
        }
        else {
            ilanSart.Egitim = parseInt($("#anneducation").attr("data-value"));
        }

        ilanSart.Deneyim = "";
        if ($("#addedexpers li").length > 0) {
            $("#addedexpers li").each(function () {
                ilanSart.Deneyim += $(this).attr("data-value") + ",";
            });
            ilanSart.Deneyim = RemoveLastChar(ilanSart.Deneyim);
        }
        else {
            ilanSart.Deneyim = parseInt($("#annexperience").attr("data-value"));
        }

        ilanSart.Sektor = "";
        if ($("#addedsectors li").length > 0) {
            $("#addedsectors li").each(function () {
                ilanSart.Sektor += $(this).attr("data-value") + ",";
            });
            ilanSart.Sektor = RemoveLastChar(ilanSart.Sektor);
        }
        else {
            ilanSart.Sektor = parseInt($("#annsector").attr("data-value"));
        }

        ilanSart.Departman = "";
        if ($("#addeddeparts li").length > 0) {
            $("#addeddeparts li").each(function () {
                ilanSart.Departman += $(this).attr("data-value") + ",";
            });
            ilanSart.Departman = RemoveLastChar(ilanSart.Departman);
        }
        else {
            ilanSart.Departman = parseInt($("#anndepart").attr("data-value"));
        }

        ilanSart.Pozisyon = "";
        if ($("#addedpositions li").length > 0) {
            $("#addedpositions li").each(function () {
                ilanSart.Pozisyon += $(this).attr("data-value") + ",";
            });
            ilanSart.Pozisyon = RemoveLastChar(ilanSart.Pozisyon);
        }
        else {
            ilanSart.Pozisyon = parseInt($("#annposition").attr("data-value"));
        }

        $.ajax({
            url: MainPath + "/Ajax/Firma/IlanSartKaydet",
            data: "{ ilanSart: '" + JSON.stringify(ilanSart) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");
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
    });
    //Şart Kaydet

    //Soru İçerik Kaydet
    $("#savequestion").click(function () {
        var datatipi = parseInt($(this).attr("data-type"));
        var ilanOzellik = new Object();

        ilanOzellik.IlanNo = $("#annnumber").attr("data-val");
        ilanOzellik.SoruAktifArac = $("#activeDriver").is(":checked");
        ilanOzellik.SoruHaftaSonu = $("#workOnWeekend").is(":checked");

        $.ajax({
            url: MainPath + "/Ajax/Firma/IlanSoruIcerikKaydet",
            data: "{ ilanOzellik: '" + JSON.stringify(ilanOzellik) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");
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
    });
    //İçerik Kaydet

    //Soru Kaydet
    $("#addquestion").click(function () {
        if ($("a.removequestion").length == 3) {
            alert("En fazla 3 adet soru girebilirsiniz.");
            return false;
        }

        var ilanSoru = new Object();
        ilanSoru.IlanNo = $("#annnumber").attr("data-val");
        ilanSoru.Soru = $("#questionText").val();

        if (ilanSoru.Soru == "") {
            alert("Lütfen soru kısmını doldurunuz.");
            return false;
        }

        ilanSoru.Guid = guid(3);

        if ($("#questionType1").is(":checked")) {
            ilanSoru.TekCevapliSoru = true;
            ilanSoru.TekSecenekliCevap = true;
            ilanSoru.Secenekler = "";
        }
        else {
            ilanSoru.TekCevapliSoru = false;
            var ilanSoruAdet = 0;

            ilanSoru.Secenekler = "";

            $("#addedquestionopts li").each(function () {
                ilanSoru.Secenekler += $(this).attr("data-value") + "|";
                ilanSoruAdet++;
            });

            ilanSoru.Secenekler = RemoveLastChar(ilanSoru.Secenekler);

            if (ilanSoruAdet < 2) {
                alert("Lütfen en az 2 soru seçeneği ekleyin.");
                return false;
            }

            if ($("#questionCrit1").is(":checked")) {
                ilanSoru.TekSecenekliCevap = true;
            }
            else {
                ilanSoru.TekSecenekliCevap = false;
            }
        }

        $.ajax({
            url: MainPath + "/Ajax/Firma/IlanSoruEkle",
            data: "{ ilanSoru: '" + JSON.stringify(ilanSoru) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");

                    var htmlResult = "";

                    if ($("#questionType2").is(":checked")) {
                        htmlResult += "<div class='row' data-guid='" + ilanSoru.Guid + "'>";
                        htmlResult += "<div class='title'>Soru</div>";
                        htmlResult += "<div class='word'>" + ilanSoru.Soru + "</div></div>";

                        htmlResult += "<div class='row' data-guid='" + ilanSoru.Guid + "'>";
                        htmlResult += "<div class='title'>Soru Seçenekleri</div>";
                        htmlResult += "<div class='word'>";

                        if ($("#questionCrit1").is(":checked")) {
                            htmlResult += "<select>";
                            $.each(ilanSoru.Secenekler.split('|'), function (index, data) {
                                if (data != "" || data != undefined) {
                                    htmlResult += "<option>" + data + "</option>";
                                }
                            });
                            htmlResult += "</select>";
                        }
                        else {
                            $.each(ilanSoru.Secenekler.split('|'), function (index, data) {
                                if (data != "" || data != undefined) {
                                    htmlResult += "<label><input class='questionType' type='checkbox' type='checkbox' /> " + data + "</label>";
                                }
                            });
                        }

                        htmlResult += "</div>";
                    }
                    else {
                        htmlResult += "<div class='row' data-guid='" + ilanSoru.Guid + "'>";
                        htmlResult += "<div class='title'>Soru</div>";
                        htmlResult += "<div class='word'>" + ilanSoru.Soru + "</div>";
                    }

                    htmlResult += "<a onclick='javascript:;' class='red button removequestion' data-guid='" + ilanSoru.Guid + "'>Sil</a></div>";

                    $("#addquestion").parent().after(htmlResult);
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
    });
    //Soru Kaydet
});

$(function () {
    $(document).on("click", "#addedquestionopts li, #addedcities li, #addededus li, #addedexpers li, #addedsectors li, #addeddeparts li, #addedpositions li", function () {
        $(this).fadeOut("slow", function () { $(this).remove(); });
    });

    $(document).on("click", ".removequestion", function () {
        var ilanSoru = new Object();
        ilanSoru.Guid = $(this).attr("data-guid");

        $.ajax({
            url: MainPath + "/Ajax/Firma/IlanSoruSil",
            data: "{ ilanSoru: '" + JSON.stringify(ilanSoru) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Silme İşlemi Başarılı.");

                    if ($(".removequestion[data-guid='" + ilanSoru.Guid + "']").parent("div.row").attr("data-guid") == $(".removequestion[data-guid='" + ilanSoru.Guid + "']").parent("div.row").prev("div.row").attr("data-guid")) {
                        $(".removequestion[data-guid='" + ilanSoru.Guid + "']").parent("div.row").prev("div.row").fadeOut("slow", function () { $(".removequestion[data-guid='" + ilanSoru.Guid + "']").remove(); });
                    }

                    $(".removequestion[data-guid='" + ilanSoru.Guid + "']").parent("div.row").fadeOut("slow", function () { $(".removequestion[data-guid='" + ilanSoru.Guid + "']").remove(); });
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
    });

    //Şart Getir
    var sartlar = "";

    BringAnnouncementCondition($("#annnumber").attr("data-val")).success(function (data) {
        sartlar = data;

        $("#annworktype").next("ul").children("li[data-value='" + sartlar.CalismaSekli + "']").click();
        $("#anngender").next("ul").children("li[data-value='" + sartlar.Cinsiyet + "']").click();
        $("#annsalary").next("ul").children("li[data-value='" + sartlar.Maas + "']").click();

        if (sartlar.Sehir.split(',').length > 1) {
            $.each(sartlar.Sehir.split(','), function (i, data) {
                $("#anncityoptions").children("li[data-value='" + data + "']").click();
                $("#addcity").click();
            });
        }
        else {
            $("#anncityoptions").children("li[data-value='" + sartlar.Sehir + "']").click();
        }

        $("#citycheck").prop("checked", sartlar.SehirSor);

        if (sartlar.Egitim.split(',').length > 1) {
            $.each(sartlar.Egitim.split(','), function (i, data) {
                $("#anneduoptions").children("li[data-value='" + data + "']").click();
                $("#addedu").click();
            });
        }
        else {
            $("#anneduoptions").children("li[data-value='" + sartlar.Egitim + "']").click();
        }

        if (sartlar.Deneyim.split(',').length > 1) {
            $.each(sartlar.Deneyim.split(','), function (i, data) {
                $("#annexperoptions").children("li[data-value='" + data + "']").click();
                $("#addexper").click();
            });
        }
        else {
            $("#annexperoptions").children("li[data-value='" + sartlar.Deneyim + "']").click();
        }

        if (sartlar.Sektor.split(',').length > 1) {
            $.each(sartlar.Sektor.split(','), function (i, data) {
                $("#annsectoroptions").children("li[data-value='" + data + "']").click();
                $("#addsector").click();
            });
        }
        else {
            $("#annsectoroptions").children("li[data-value='" + sartlar.Sektor + "']").click();
        }

        if (sartlar.Departman.split(',').length > 1) {
            $.each(sartlar.Departman.split(','), function (i, data) {
                $("#anndepartoptions").children("li[data-value='" + data + "']").click();
                $("#adddepart").click();
            });
        }
        else {
            $("#anndepartoptions").children("li[data-value='" + sartlar.Departman + "']").click();
        }

        if (sartlar.Pozisyon.split(',').length > 1) {
            $.each(sartlar.Pozisyon.split(','), function (i, data) {
                $("#annpositionoptions").children("li[data-value='" + data + "']").click();
                $("#addposition").click();
            });
        }
        else {
            $("#annpositionoptions").children("li[data-value='" + sartlar.Pozisyon + "']").click();
        }
    });

    function BringAnnouncementCondition(ilanNo) {
        return $.ajax({
            type: "GET",
            url: MainPath + "/Ajax/Firma/IlanSartGetir",
            data: "ilanNo=" + ilanNo,
            dataType: "json"
        });
    }
    //Şart Getir


    //Sorular Getir
    var sorular = "";

    BringAnnouncementQuestions($("#annnumber").attr("data-val")).success(function (data) {
        sorular = data;

        $.each(sorular, function (i, ilanSoru) {
            var htmlResult = "";

            if (ilanSoru.TekCevapliSoru == false) {
                htmlResult += "<div class='row' data-guid='" + ilanSoru.Guid + "'>";
                htmlResult += "<div class='title'>Soru</div>";
                htmlResult += "<div class='word'>" + ilanSoru.Soru + "</div></div>";

                htmlResult += "<div class='row' data-guid='" + ilanSoru.Guid + "'>";
                htmlResult += "<div class='title'>Soru Seçenekleri</div>";
                htmlResult += "<div class='word'>";

                if (ilanSoru.TekSecenekliCevap == true) {
                    htmlResult += "<select>";
                    $.each(ilanSoru.Secenekler.split('|'), function (index, data) {
                        if (data != "" || data != undefined) {
                            htmlResult += "<option>" + data + "</option>";
                        }
                    });
                    htmlResult += "</select>";
                }
                else {
                    $.each(ilanSoru.Secenekler.split('|'), function (index, data) {
                        if (data != "" || data != undefined) {
                            htmlResult += "<label><input class='questionType' type='checkbox' type='checkbox' /> " + data + "</label>";
                        }
                    });
                }

                htmlResult += "</div>";
            }
            else {
                htmlResult += "<div class='row' data-guid='" + ilanSoru.Guid + "'>";
                htmlResult += "<div class='title'>Soru</div>";
                htmlResult += "<div class='word'>" + ilanSoru.Soru + "</div>";
            }

            htmlResult += "<a onclick='javascript:;' class='red button removequestion' data-guid='" + ilanSoru.Guid + "'>Sil</a></div>";

            $("#addquestion").parent().after(htmlResult);
        });
    });

    function BringAnnouncementQuestions(ilanNo) {
        return $.ajax({
            type: "GET",
            url: MainPath + "/Ajax/Firma/IlanSorularGetir",
            data: "ilanNo=" + ilanNo,
            dataType: "json"
        });
    }
    //Sorular Getir
});

function RemoveLastChar(s) {
    return s.substring(0, s.length - 1);
}