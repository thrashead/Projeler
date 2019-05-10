var editCode;
var isEdit = false;

$(document).ready(function () {
    $('#phone').mask("999 999 99 99");

    $("#resumeupdate li a").click(function () {
        var tab = $(this).attr("data-tab");
        if (!$("#updatecv .content[data-tab='" + tab + "']").is(":visible")) {
            $("#resumeupdate li a").removeClass("active");
            $(this).addClass("active");
            $("#updatecv .content").hide();
            $("#updatecv .content[data-tab='" + tab + "']").fadeIn("slow");
        }

        if ($("body").width() <= 1024) {
            $("html, body").animate({
                scrollTop: 120
            }, 1000);
        }
    });
});

$(function () {
    /* Genel */
    $.ajax({
        type: "GET",
        url: MainPath + "/Ajax/Kullanici/OzgecmisGenelGetir",
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                $("#phone").val(result.Telefon);
                $("#mail").val(result.Mail);
                $("#birth").val(result.DogumTarih);

                if (result.Askerlik == 1) {
                    $("#militaryno").prop("checked", true);
                }
                else if (result.Askerlik == 2) {
                    $("#militaryno2").prop("checked", true);
                }
                else if (result.Askerlik == 3) {
                    $("#militaryok").prop("checked", true);
                    $("#militarydate").prop("disabled", false);
                    $("#militarydate").val(result.AskerlikTarih);
                }

                if (result.Ehliyet = true) {
                    $("#driverok").prop("checked", true);
                    $("#driverclass").val(result.EhliyetSinif);
                    $("#driverclass").prop("disabled", false);
                }

                $("#city").next("ul").children("li[data-value='" + result.Sehir.toString() + "']").click();
                $("#smoking").next("ul").children("li[data-value='" + (result.Sigara + 1).toString() + "']").click();
                $("#gender").next("ul").children("li[data-value='" + result.Cinsiyet.toString() + "']").click();
                $("#marriage").next("ul").children("li[data-value='" + result.MedeniHal.toString() + "']").click();
            }
        }
    });

    $("#savegeneral").click(function () {
        if ($("#phone").val().replace(/\ /g, "").length < 10) {
            alert("Telefon numaranızı kontrol ediniz. 10 karakter olmalı.");
            return false;
        }

        if (!isValid($("#mail").val(), "email") || $("#mail").val().length > 255) {
            alert("Mail adresinizi kontrol ediniz.");
            return false;
        }

        if ($("#birth").val().length < 8 || $("#birth").val().length > 10) {
            alert("Tarih boş geçemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
            return false;
        }

        if ($("#militaryok").is(":checked")) {
            if ($("#militarydate").val().length < 8 || $("#militarydate").val().length > 10) {
                alert("Terhis Tarihi boş geçemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
                return false;
            }
        }

        if ($("#driverok").is(":checked")) {
            if ($("#driverclass").val().length < 0) {
                alert("Ehliyet Sınıfı boş geçemez.");
                return false;
            }
        }

        var ozgecmisGenel = new Object();
        ozgecmisGenel.Sehir = parseInt($("#city").attr("data-value"));
        ozgecmisGenel.Telefon = $("#phone").val();
        ozgecmisGenel.Mail = $("#mail").val();
        ozgecmisGenel.DogumTarih = $("#birth").val();
        ozgecmisGenel.Cinsiyet = parseInt($("#gender").attr("data-value"));
        ozgecmisGenel.MedeniHal = parseInt($("#marriage").attr("data-value"));
        if ($("#militaryok").is(":checked")) {
            ozgecmisGenel.Askerlik = 3;
            ozgecmisGenel.AskerlikTarih = $("#militarydate").val();
        }
        else {
            if ($("#militaryno").is(":checked")) {
                ozgecmisGenel.Askerlik = 1;
            }
            else {
                ozgecmisGenel.Askerlik = 2;
            }

            ozgecmisGenel.AskerlikTarih = null;
        }

        if ($("#driverok").is(":checked")) {
            ozgecmisGenel.Ehliyet = true;
            ozgecmisGenel.EhliyetSinif = $("#driverclass").val();
        }
        else {
            ozgecmisGenel.Ehliyet = false;
            ozgecmisGenel.EhliyetSinif = null;
        }

        if (parseInt($("#smoking").attr("data-value")) == 1) {
            ozgecmisGenel.Sigara = false;
        }
        else {
            ozgecmisGenel.Sigara = true;
        }

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisGenelGuncelle",
            data: "{ ozgecmisGenel: '" + JSON.stringify(ozgecmisGenel) + "' }",
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

    /* Calisma */
    $.ajax({
        type: "GET",
        url: MainPath + "/Ajax/Kullanici/OzgecmisCalismaGetir",
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                $("#jobname").val(result.MeslekUnvan);
                $("#perjobinfo").val(result.KisiselBilgi);

                $("#workingstatus").next("ul").children("li[data-value='" + result.CalismaDurumu.toString() + "']").click();
                $("#workingtime").next("ul").children("li[data-value='" + (result.ToplamDeneyim).toString() + "']").click();
            }
        }
    });

    $("#savepersonal").click(function () {
        if ($("#jobname").val().length < 1) {
            alert("Lütfen meslek ve ünvanınızı belirtiniz.");
            return false;
        }

        var ozgecmisCalisma = new Object();
        ozgecmisCalisma.MeslekUnvan = $("#jobname").val();
        ozgecmisCalisma.KisiselBilgi = $("#perjobinfo").val();
        ozgecmisCalisma.CalismaDurumu = parseInt($("#workingstatus").attr("data-value"));
        ozgecmisCalisma.ToplamDeneyim = parseInt($("#workingtime").attr("data-value"));

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisCalismaGuncelle",
            data: "{ ozgecmisCalisma: '" + JSON.stringify(ozgecmisCalisma) + "' }",
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

    /* Tercih */
    $.ajax({
        type: "GET",
        url: MainPath + "/Ajax/Kullanici/OzgecmisTercihGetir",
        dataType: "json",
        success: function (result) {
            if (result != undefined) {
                if (result.Sektor.split(',').length > 1) {
                    $(result.Sektor.split(',')).each(function (i, data) {
                        $("#sector").next("ul").children("li[data-value='" + data.toString() + "']").click();
                        $("#addsector").click();
                    });
                }
                else {
                    $("#sector").next("ul").children("li[data-value='" + result.Sektor.toString() + "']").click();
                }

                if (result.Bolum.split(',').length > 1) {
                    $(result.Bolum.split(',')).each(function (i, data) {
                        $("#division").next("ul").children("li[data-value='" + data.toString() + "']").click();
                        $("#adddivision").click();
                    });
                }
                else {
                    $("#division").next("ul").children("li[data-value='" + result.Bolum.toString() + "']").click();
                }

                if (result.Pozisyon.split(',').length > 1) {
                    $(result.Pozisyon.split(',')).each(function (i, data) {
                        $("#position").next("ul").children("li[data-value='" + data.toString() + "']").click();
                        $("#addposition").click();
                    });
                }
                else {
                    $("#position").next("ul").children("li[data-value='" + result.Pozisyon.toString() + "']").click();
                }

                $("#salary").next("ul").children("li[data-value='" + result.Maas.toString() + "']").click();
            }
        }
    });

    $("#saveprefer").click(function () {
        var ozgecmisTercih = new Object();
        ozgecmisTercih.Sektor = "";
        ozgecmisTercih.Bolum = "";
        ozgecmisTercih.Pozisyon = "";

        if ($("#addedsectors li").length > 0) {
            $("#addedsectors li").each(function () {
                ozgecmisTercih.Sektor += $(this).attr("data-value") + ",";
            });
            ozgecmisTercih.Sektor = RemoveLastChar(ozgecmisTercih.Sektor);
        }
        else {
            if (parseInt($("#sector").attr("data-value")) > 0) {
                ozgecmisTercih.Sektor = parseInt($("#sector").attr("data-value"));
            }
        }

        if ($("#addeddivisions li").length > 0) {
            $("#addeddivisions li").each(function () {
                ozgecmisTercih.Bolum += $(this).attr("data-value") + ",";
            });
            ozgecmisTercih.Bolum = RemoveLastChar(ozgecmisTercih.Bolum);
        }
        else {
            if (parseInt($("#division").attr("data-value")) > 0) {
                ozgecmisTercih.Bolum = parseInt($("#division").attr("data-value"));
            }
        }

        if ($("#addedpositions li").length > 0) {
            $("#addedpositions li").each(function () {
                ozgecmisTercih.Pozisyon += $(this).attr("data-value") + ",";
            });
            ozgecmisTercih.Pozisyon = RemoveLastChar(ozgecmisTercih.Pozisyon);
        }
        else {
            if (parseInt($("#position").attr("data-value")) > 0) {
                ozgecmisTercih.Pozisyon = parseInt($("#position").attr("data-value"));
            }
        }

        ozgecmisTercih.Maas = parseInt($("#salary").attr("data-value"));

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisTercihGuncelle",
            data: "{ ozgecmisTercih: '" + JSON.stringify(ozgecmisTercih) + "' }",
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

    /* Deneyim */
    $("#addjob").click(function () {
        var addButton = $(this);

        var ozgecmisDeneyim = new Object();
        ozgecmisDeneyim.Tip = $("#jobJob").is(":checked") ? 1 : 2;

        if (isEdit == true) {
            ozgecmisDeneyim.Kod = editCode;
            ozgecmisDeneyim.Guncelle = true;
        }
        else {
            ozgecmisDeneyim.Kod = guid(6) + "a";
            ozgecmisDeneyim.Guncelle = false;
        }

        if ($("#jobCompany").val().length >= 3) {
            ozgecmisDeneyim.SirketIsmi = $("#jobCompany").val();
        }
        else {
            alert("Şirket ismi en az 3 karakter olmalı.");
            return false;
        }

        ozgecmisDeneyim.Sehir = parseInt($("#jobcity").attr("data-value"));
        ozgecmisDeneyim.Sektor = parseInt($("#jobsector").attr("data-value"));
        ozgecmisDeneyim.Bolum = parseInt($("#jobdivision").attr("data-value"));;
        ozgecmisDeneyim.Pozisyon = parseInt($("#jobposition").attr("data-value"));

        if ($("#jobStartDate").val().length >= 8 && $("#jobStartDate").val().length <= 10) {
            ozgecmisDeneyim.GirisTarih = $("#jobStartDate").val();
        }
        else {
            alert("Giriş Tarihi boş geçemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
            return false;
        }

        if (!$("#jobContinue").is(":checked")) {
            ozgecmisDeneyim.Devam = false;

            if ($("#jobEndDate").val().length >= 8 && $("#jobEndDate").val().length <= 10) {
                ozgecmisDeneyim.CikisTarih = $("#jobEndDate").val();
            }
            else {
                alert("Çıkış Tarihi boş geçemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
                return false;
            }
        }
        else {
            ozgecmisDeneyim.CikisTarih = null;
            ozgecmisDeneyim.Devam = true;
        }

        ozgecmisDeneyim.Aciklama = $("#jobDescription").val();

        var sehir = "";
        var sektor = "";
        var bolum = "";
        var pozisyon = "";

        BringCity(ozgecmisDeneyim.Sehir).success(function (data) {
            sehir = data;

            BringSector(ozgecmisDeneyim.Sektor).success(function (data2) {
                sektor = data2;

                BringDepartment(ozgecmisDeneyim.Bolum).success(function (data3) {
                    bolum = data3;

                    BringPosition(ozgecmisDeneyim.Pozisyon).success(function (data4) {
                        pozisyon = data4;

                        $.ajax({
                            url: MainPath + "/Ajax/Kullanici/OzgecmisDeneyimEkle",
                            data: "{ ozgecmisDeneyim: '" + JSON.stringify(ozgecmisDeneyim) + "' }",
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (answer) {
                                if (answer == true) {
                                    alert("Kayıt Başarılı.");

                                    if ($("h3[data-type='" + ozgecmisDeneyim.Tip.toString() + "']").length <= 0) {
                                        if (ozgecmisDeneyim.Tip == 1) {
                                            addButton.parent("div.row").after("<h3 data-type='1'>İş Deneyimleri</h3>");
                                        }
                                        else {
                                            if ($("h3[data-type='1']").length <= 0) {
                                                addButton.parent("div.row").after("<h3 data-type='2'>Staj Deneyimleri</h3>");
                                            }
                                            else {
                                                $("h3[data-type='reference']").before("<h3 data-type='2'>Staj Deneyimleri</h3>");
                                            }
                                        }
                                    }

                                    var htmlResult = "<div class='row' data-guid='" + ozgecmisDeneyim.Kod + "' data-type='";
                                    htmlResult += ozgecmisDeneyim.Tip == 1 ? "1'>" : "2'>";
                                    htmlResult += "<div class='title'>" + ozgecmisDeneyim.SirketIsmi + "<br /><br /><span>";

                                    if (ozgecmisDeneyim.Sector != "") {
                                        htmlResult += sektor + "<br />";
                                    }
                                    if (ozgecmisDeneyim.Division != "") {
                                        htmlResult += bolum + "<br />";
                                    }
                                    if (ozgecmisDeneyim.Position != "") {
                                        htmlResult += pozisyon + "<br />";
                                    }

                                    htmlResult += "<br />" + ozgecmisDeneyim.GirisTarih + "<br />";

                                    if (ozgecmisDeneyim.Devam) {
                                        htmlResult += "Devam Ediyor";
                                    }
                                    else {
                                        htmlResult += ozgecmisDeneyim.CikisTarih;
                                    }

                                    htmlResult += "<br /><br />" + sehir + "</span></div>";
                                    htmlResult += "<div class='word'>" + ozgecmisDeneyim.Aciklama + "</div>";
                                    htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisDeneyim.Kod + "' data-type='";
                                    htmlResult += ozgecmisDeneyim.Tip == 1 ? "1'" : "2'";
                                    htmlResult += " class='red button removejob'>Sil</a>";
                                    htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisDeneyim.Kod + "' data-type='";
                                    htmlResult += ozgecmisDeneyim.Tip == 1 ? "1'" : "2'";
                                    htmlResult += " class='orange button editjob'>Düzenle</a></div>";

                                    if (isEdit) {
                                        $("div.row[data-guid='" + ozgecmisDeneyim.Kod + "']").remove();
                                    }

                                    if (ozgecmisDeneyim.Tip == 1) {
                                        $("h3[data-type='1']").after(htmlResult);
                                    }
                                    else {
                                        $("h3[data-type='2']").after(htmlResult);
                                    }

                                    $("#jobCompany").val("");
                                    $("#jobcity").next("ul").children("li").first().click();
                                    $("#jobsectoroptions").children("li").first().click();
                                    $("#jobdivisionoptions").children("li").first().click();
                                    $("#jobpositionoptions").children("li").first().click();
                                    $("#jobpositionoptions").children("li").first().click();
                                    $("#jobStartDate").val("");
                                    $("#jobContinue").prop("checked", false);
                                    $("#jobEndDate").prop("disabled", false);
                                    $("#jobEndDate").val("");
                                    $("#jobDescription").val("");
                                    ResetEdit();

                                    var workcount = $("div.row[data-type='1']").length;
                                    var interncount = $("div.row[data-type='2']").length;

                                    if (workcount <= 0) {
                                        $("h3[data-type='1']").fadeOut("slow", function () {
                                            $(this).remove();
                                        });
                                    }

                                    if (interncount <= 0) {
                                        $("h3[data-type='2']").fadeOut("slow", function () {
                                            $(this).remove();
                                        });
                                    }
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
                });
            });
        });
    });

    $("#canceljob").click(function () {
        $("#jobJob").prop("checked", "checked");
        $("#jobCompany").val("");
        $("#jobcity").next("ul").children("li").first().click();
        $("#jobsectoroptions").children("li").first().click();
        $("#jobdivisionoptions").children("li").first().click();
        $("#jobpositionoptions").children("li").first().click();
        $("#jobpositionoptions").children("li").first().click();
        $("#jobStartDate").val("");
        $("#jobContinue").prop("checked", false);
        $("#jobEndDate").prop("disabled", false);
        $("#jobEndDate").val("");
        $("#jobDescription").val("");
        ResetEdit();
    });

    $(document).on("click", ".editjob", function () {
        var ozgecmisDeneyim = new Object();
        ozgecmisDeneyim.Tip = parseInt($(this).attr("data-type"));
        ozgecmisDeneyim.Kod = $(this).attr("data-guid");

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisDeneyimGetir",
            data: "{ ozgecmisDeneyim: '" + JSON.stringify(ozgecmisDeneyim) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer != undefined) {
                    var ozgecmisDeneyim = answer;

                    isEdit = true;
                    editCode = ozgecmisDeneyim.Kod;

                    if (ozgecmisDeneyim.Tip == 1) {
                        $("#jobJob").prop("checked", true);
                    }
                    else {
                        $("#jobIntern").prop("checked", true);
                    }

                    $("#jobCompany").val(ozgecmisDeneyim.SirketIsmi);

                    $("#jobcity").next("ul").children("li[data-value='" + ozgecmisDeneyim.Sehir + "']").click();
                    $("#jobsector").next("ul").children("li[data-value='" + ozgecmisDeneyim.Sektor + "']").click();
                    $("#jobdivision").next("ul").children("li[data-value='" + ozgecmisDeneyim.Bolum + "']").click();
                    $("#jobposition").next("ul").children("li[data-value='" + ozgecmisDeneyim.Pozisyon + "']").click();

                    $("#jobStartDate").val(ozgecmisDeneyim.GirisTarih);

                    if (ozgecmisDeneyim.Devam == false) {
                        $("#jobContinue").prop("checked", false);
                        $("#jobEndDate").removeAttr("disabled");
                        $("#jobEndDate").val(ozgecmisDeneyim.CikisTarih);
                    } else {
                        $("#jobContinue").prop("checked", true);
                        $("#jobEndDate").attr("disabled", "disabled");
                        $("#jobEndDate").val("");
                    }

                    $("#jobDescription").val(ozgecmisDeneyim.Aciklama);

                    $("html, body").animate({
                        scrollTop: $("h3[data-type='work']").offset().top
                    }, 1000);
                }
                else {
                    alert("Deneyim bulunamadı!!!");
                }
            }
        });
    });

    $(document).on("click", ".removejob", function () {
        var answer = confirm("İlgili deneyimi silmek istediğinize emin misiniz?");
        var deleteObject = $(this);


        if (answer == true) {
            var ozgecmisDeneyim = new Object();
            ozgecmisDeneyim.Tip = parseInt($(this).attr("data-type"));
            ozgecmisDeneyim.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisDeneyimSil",
                data: "{ ozgecmisDeneyim: '" + JSON.stringify(ozgecmisDeneyim) + "' }",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (answer) {
                    if (answer == true) {
                        alert("Silme İşlemi Başarılı.");

                        deleteObject.parent("div.row").fadeOut("slow", function () {
                            $(this).remove();

                            var workcount = $("div.row[data-type='1']").length;
                            var interncount = $("div.row[data-type='2']").length;

                            if (workcount <= 0) {
                                $("h3[data-type='1']").fadeOut("slow", function () {
                                    $(this).remove();
                                });
                            }

                            if (interncount <= 0) {
                                $("h3[data-type='2']").fadeOut("slow", function () {
                                    $(this).remove();
                                });
                            }
                        });
                    }
                    else {
                        if (answer == "bilgi") {
                            alert("Bilgiler yanlış.");
                        }
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });

    /* Referans */
    $("#addref").click(function () {
        var addButton = $(this);

        var ozgecmisReferans = new Object();

        if (isEdit == true) {
            ozgecmisReferans.Kod = editCode;
            ozgecmisReferans.Guncelle = true;
        }
        else {
            ozgecmisReferans.Kod = guid(6) + "a";
            ozgecmisReferans.Guncelle = false;
        }

        if ($("#refName").val().length >= 3) {
            ozgecmisReferans.AdSoyad = $("#refName").val();
        }
        else {
            alert("Ad Soyad kısmı en az 3 karakter olmalı.");
            return false;
        }

        if ($("#refCompany").val().length >= 3) {
            ozgecmisReferans.Sirket = $("#refCompany").val();
        }
        else {
            alert("Şirket ismi en az 3 karakter olmalı.");
            return false;
        }

        if ($("#refPosition").val().length >= 3) {
            ozgecmisReferans.Gorev = $("#refPosition").val();
        }
        else {
            alert("Görev kısmı en az 3 karakter olmalı.");
            return false;
        }

        if ($("#refPhone").val().replace(/\ /g, "").length < 10) {
            alert("Telefon numaranızı kontrol ediniz. 10 karakter olmalı.");
            return false;
        }
        else {
            ozgecmisReferans.Telefon = $("#refPhone").val();
        }

        if (!isValid($("#refMail").val(), "email") || $("#refMail").val().length > 255) {
            alert("Mail adresinizi kontrol ediniz.");
            return false;
        }
        else {
            ozgecmisReferans.Mail = $("#refMail").val();
        }

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisReferansEkle",
            data: "{ ozgecmisReferans: '" + JSON.stringify(ozgecmisReferans) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");

                    var htmlResult = "<div class='row' data-guid='" + ozgecmisReferans.Kod + "'>";
                    htmlResult += "<div class='title'>" + ozgecmisReferans.AdSoyad + "<br /><br /><span>";
                    htmlResult += ozgecmisReferans.Sirket + "<br /><i>" + ozgecmisReferans.Gorev + "</i></span></div>";
                    htmlResult += "<div class='word'>" + ozgecmisReferans.Telefon + "<br />" + ozgecmisReferans.Mail + "</div>";
                    htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisReferans.Kod + "' class='red button removeref'>Sil</a>";
                    htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisReferans.Kod + "' class='orange button editref'>Düzenle</a></div>";

                    if (isEdit) {
                        $("div.row[data-guid='" + ozgecmisReferans.Kod + "']").remove();
                    }

                    $("#addref").parent("div.row").after(htmlResult);

                    $("#refName").val("");
                    $("#refCompany").val("");
                    $("#refPosition").val("");
                    $("#refPhone").val("");
                    $("#refMail").val("");
                    ResetEdit();
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

    $("#cancelref").click(function () {
        $("#refName").val("");
        $("#refCompany").val("");
        $("#refPosition").val("");
        $("#refPhone").val("");
        $("#refMail").val("");
        ResetEdit();
    });

    $(document).on("click", ".editref", function () {
        var ozgecmisReferans = new Object();
        ozgecmisReferans.Kod = $(this).attr("data-guid");

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisReferansGetir",
            data: "{ ozgecmisReferans: '" + JSON.stringify(ozgecmisReferans) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer != undefined) {
                    var ozgecmisReferans = answer;

                    isEdit = true;
                    editCode = ozgecmisReferans.Kod;

                    $("#refName").val(ozgecmisReferans.AdSoyad);
                    $("#refCompany").val(ozgecmisReferans.Sirket);
                    $("#refPosition").val(ozgecmisReferans.Gorev);
                    $("#refPhone").val(ozgecmisReferans.Telefon);
                    $("#refMail").val(ozgecmisReferans.Mail);

                    $("html, body").animate({
                        scrollTop: $("h3[data-type='reference']").offset().top
                    }, 1000);
                }
                else {
                    alert("Deneyim bulunamadı!!!");
                }
            }
        });
    });

    $(document).on("click", ".removeref", function () {
        var answer = confirm("İlgili referansı silmek istediğinize emin misiniz?");
        var deleteObject = $(this);

        if (answer == true) {
            var ozgecmisReferans = new Object();
            ozgecmisReferans.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisReferansSil",
                data: "{ ozgecmisReferans: '" + JSON.stringify(ozgecmisReferans) + "' }",
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
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });

    /* Egitim */
    $("#addschool").click(function () {
        var addButton = $(this);

        var ozgecmisEgitim = new Object();
        ozgecmisEgitim.Seviye = parseInt($("#edulevel").attr("data-value"));
        ozgecmisEgitim.Okul = $("#eduSchool").val();
        ozgecmisEgitim.Fakulte = $("#eduFaculty").val();
        ozgecmisEgitim.Bolum = $("#eduDivision").val();
        ozgecmisEgitim.Sehir = parseInt($("#educity").attr("data-value"));
        ozgecmisEgitim.BaslangicTarih = $("#eduStartDate").val();
        ozgecmisEgitim.BitisTarih = $("#eduEndDate").val();
        ozgecmisEgitim.Devam = $("#eduContinue").is(":checked");
        ozgecmisEgitim.Burs = parseInt($("#eduticket").attr("data-value"));
        ozgecmisEgitim.Ortalama = $("#eduNote").val();

        if (isEdit == true) {
            ozgecmisEgitim.Kod = editCode;
            ozgecmisEgitim.Guncelle = true;
        }
        else {
            ozgecmisEgitim.Kod = guid(6) + "a";
            ozgecmisEgitim.Guncelle = false;
        }

        if (ozgecmisEgitim.Okul == "" || ozgecmisEgitim.BaslangicTarih == "" || ozgecmisEgitim.Fakulte == "" || ozgecmisEgitim.Bolum == "" || ozgecmisEgitim.Ortalama == "") {
            alert("Lütfen gerekli bilgileri boş bırakmayınız.");
            return false;
        }

        if (ozgecmisEgitim.Devam == false && ozgecmisEgitim.BitisTarih == "") {
            alert("Lütfen bitiş tarihi kısmını boş bırakmayınız.");
            return false;
        }

        if ($("#eduStartDate").val().length < 8 || $("#eduStartDate").val().length > 10) {
            alert("Başlangıç tarihi boş geçemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
            return false;
        }

        if (!ozgecmisEgitim.Devam) {
            if ($("#eduEndDate").val().length < 8 && $("#eduEndDate").val().length > 10) {
                alert("Bitiş tarihi boş geçemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
                return false;
            }
        }
        else {
            ozgecmisEgitim.BitisTarih = null;
        }

        var sehir = "";
        var seviye = "";
        var burs = "";

        BringCity(ozgecmisEgitim.Sehir).success(function (data) {
            sehir = data;

            BringLevel(ozgecmisEgitim.Seviye).success(function (data2) {
                seviye = data2;

                BringTicket(ozgecmisEgitim.Burs).success(function (data3) {
                    burs = data3;

                    $.ajax({
                        url: MainPath + "/Ajax/Kullanici/OzgecmisEgitimEkle",
                        data: "{ ozgecmisEgitim: '" + JSON.stringify(ozgecmisEgitim) + "' }",
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function (answer) {
                            if (answer == true) {
                                alert("Kayıt Başarılı.");

                                var htmlResult = "<div class='row' data-guid='" + ozgecmisEgitim.Kod + "'>";
                                htmlResult += "<div class='title'>" + ozgecmisEgitim.Okul + "<br /><br /><span>" + ozgecmisEgitim.BaslangicTarih + "<br />";

                                htmlResult += ozgecmisEgitim.Devam == false ? ozgecmisEgitim.BitisTarih : "Devam Ediyor";
                                htmlResult += "<br /><br />" + sehir
                                htmlResult += "</span></div><div class='word'>";
                                if (ozgecmisEgitim.Fakulte != "") {
                                    htmlResult += ozgecmisEgitim.Fakulte + "<br />";
                                }
                                htmlResult += "<span>";
                                if (ozgecmisEgitim.Bolum != "") {
                                    htmlResult += ozgecmisEgitim.Bolum + "<br />";
                                }

                                htmlResult += seviye + "<br />";
                                htmlResult += burs + "<br />";

                                if (ozgecmisEgitim.Ortalama != "") {
                                    htmlResult += ozgecmisEgitim.Ortalama + "<br />";
                                }

                                htmlResult += ozgecmisEgitim.Devam == false ? "</span></div>" : "Devam Ediyor</span></div>";

                                htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisEgitim.Kod + "' class='red button removeschool'>Sil</a>";
                                htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisEgitim.Kod + "' class='orange button editschool'>Düzenle</a></div>";

                                if (isEdit) {
                                    $("div.row[data-guid='" + ozgecmisEgitim.Kod + "']").remove();
                                }

                                addButton.parent().after(htmlResult);

                                $("#edulevel").next("ul").children("li").first().click();
                                $("#educity").next("ul").children("li").first().click();
                                $("#eduticket").next("ul").children("li").first().click();
                                $("#eduSchool").val("");
                                $("#eduFaculty").val("");
                                $("#eduDivision").val("");
                                $("#eduStartDate").val("");
                                $("#eduContinue").prop("checked", false);
                                $("#eduEndDate").prop("disabled", false);
                                $("#eduEndDate").val("");
                                $("#eduNote").val("");
                                ResetEdit();
                            }
                        }
                    });
                });
            });
        });
    });

    $("#cancelschool").click(function () {
        $("#edulevel").next("ul").children("li").first().click();
        $("#educity").next("ul").children("li").first().click();
        $("#eduticket").next("ul").children("li").first().click();
        $("#eduSchool").val("");
        $("#eduFaculty").val("");
        $("#eduDivision").val("");
        $("#eduStartDate").val("");
        $("#eduContinue").prop("checked", false);
        $("#eduEndDate").prop("disabled", false);
        $("#eduEndDate").val("");
        $("#eduNote").val("");
        ResetEdit();
    });

    $(document).on("click", ".editschool", function () {
        var ozgecmisEgitim = new Object();
        ozgecmisEgitim.Kod = $(this).attr("data-guid");

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisEgitimGetir",
            data: "{ ozgecmisEgitim: '" + JSON.stringify(ozgecmisEgitim) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer != undefined) {
                    var ozgecmisEgitim = answer;

                    isEdit = true;
                    editCode = ozgecmisEgitim.Kod;

                    $("#edulevel").next("ul").children("li[data-value='" + ozgecmisEgitim.Seviye + "']").click();
                    $("#eduSchool").val(ozgecmisEgitim.Okul);
                    $("#eduFaculty").val(ozgecmisEgitim.Fakulte);
                    $("#eduDivision").val(ozgecmisEgitim.Bolum);
                    $("#educity").next("ul").children("li[data-value='" + ozgecmisEgitim.Sehir + "']").click();
                    $("#eduStartDate").val(ozgecmisEgitim.BaslangicTarih);
                    if (ozgecmisEgitim.Devam == false) {
                        $("#eduContinue").prop("checked", false);
                        $("#eduEndDate").removeAttr("disabled");
                        $("#eduEndDate").val(ozgecmisEgitim.BitisTarih);
                    } else {
                        $("#eduContinue").prop("checked", true);
                        $("#eduEndDate").attr("disabled", "disabled");
                        $("#eduEndDate").val("");
                    }
                    $("#eduticket").next("ul").children("li[data-value='" + ozgecmisEgitim.Burs + "']").click();
                    $("#eduNote").val(ozgecmisEgitim.Ortalama);

                    $("html, body").animate({
                        scrollTop: $("h3[data-type='school']").offset().top
                    }, 1000);
                }
                else {
                    alert("Deneyim bulunamadı!!!");
                }
            }
        });
    });

    $(document).on("click", ".removeschool", function () {
        var answer = confirm("İlgili egitim bilgisini silmek istediğinize emin misiniz?");
        var deleteObject = $(this);


        if (answer == true) {
            var ozgecmisEgitim = new Object();
            ozgecmisEgitim.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisEgitimSil",
                data: "{ ozgecmisEgitim: '" + JSON.stringify(ozgecmisEgitim) + "' }",
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
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });

    /* Sertifika */
    $("#addcert").click(function () {
        var addButton = $(this);

        var ozgecmisSertifika = new Object();
        ozgecmisSertifika.Baslik = $("#certName").val();
        ozgecmisSertifika.Kurum = $("#certCompany").val();
        ozgecmisSertifika.Tarih = $("#certDate").val();
        ozgecmisSertifika.Aciklama = $("#certDescription").val();

        if (isEdit == true) {
            ozgecmisSertifika.Kod = editCode;
            ozgecmisSertifika.Guncelle = true;
        }
        else {
            ozgecmisSertifika.Kod = guid(6) + "a";
            ozgecmisSertifika.Guncelle = false;
        }

        if (ozgecmisSertifika.Baslik == "" || ozgecmisSertifika.Kurum == "" || ozgecmisSertifika.Tarih == "" || ozgecmisSertifika.Aciklama == "") {
            alert("Lütfen bütün bilgileri eksiksiz doldurunuz.");
            return false;
        }

        if (ozgecmisSertifika.Tarih.length < 8 || ozgecmisSertifika.Tarih.length > 10) {
            alert("Tarihi alanı boş geçilemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
            return false;
        }

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisSertifikaEkle",
            data: "{ ozgecmisSertifika: '" + JSON.stringify(ozgecmisSertifika) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");

                    var htmlResult = "<div class='row' data-guid='" + ozgecmisSertifika.Kod + "'>";
                    htmlResult += "<div class='title'>" + ozgecmisSertifika.Baslik + "<br /><br /><span>" + ozgecmisSertifika.Kurum + "<br /><br />" + ozgecmisSertifika.Tarih + "</span></div>";

                    htmlResult += "<div class='word'><span>" + ozgecmisSertifika.Aciklama;
                    htmlResult += "</span></div><a onclick='javascript:;' data-guid='" + ozgecmisSertifika.Kod + "' class='red button removecert'>Sil</a>";
                    htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisSertifika.Kod + "' class='orange button editcert'>Düzenle</a></div>";

                    if (isEdit) {
                        $("div.row[data-guid='" + ozgecmisSertifika.Kod + "']").remove();
                    }

                    addButton.parent("div.row").after(htmlResult);

                    $("#certName").val("");
                    $("#certCompany").val("");
                    $("#certDate").val("");
                    $("#certDescription").val("");
                    ResetEdit();
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

    $("#cancelcert").click(function () {
        $("#certName").val("");
        $("#certCompany").val("");
        $("#certDate").val("");
        $("#certDescription").val("");
        ResetEdit();
    });

    $(document).on("click", ".editcert", function () {
        var ozgecmisSertifika = new Object();
        ozgecmisSertifika.Kod = $(this).attr("data-guid");

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisSertifikaGetir",
            data: "{ ozgecmisSertifika: '" + JSON.stringify(ozgecmisSertifika) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer != undefined) {
                    var ozgecmisSertifika = answer;

                    isEdit = true;
                    editCode = ozgecmisSertifika.Kod;

                    $("#certName").val(ozgecmisSertifika.Baslik);
                    $("#certCompany").val(ozgecmisSertifika.Kurum);
                    $("#certDate").val(ozgecmisSertifika.Tarih);
                    $("#certDescription").val(ozgecmisSertifika.Aciklama);

                    $("html, body").animate({
                        scrollTop: $("h3[data-type='certificate']").offset().top
                    }, 1000);
                }
                else {
                    alert("Deneyim bulunamadı!!!");
                }
            }
        });
    });

    $(document).on("click", ".removecert", function () {
        var answer = confirm("İlgili sertifikayı silmek istediğinize emin misiniz?");
        var deleteObject = $(this);

        if (answer == true) {
            var ozgecmisSertifika = new Object();
            ozgecmisSertifika.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisSertifikaSil",
                data: "{ ozgecmisSertifika: '" + JSON.stringify(ozgecmisSertifika) + "' }",
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
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });

    /* Sınav */
    $("#addexam").click(function () {
        var addButton = $(this);

        var ozgecmisSinav = new Object();
        ozgecmisSinav.Baslik = $("#examName").val();
        ozgecmisSinav.Kurum = $("#examCompany").val();
        ozgecmisSinav.Tarih = $("#examDate").val();
        ozgecmisSinav.Puan = $("#examPoint").val();
        ozgecmisSinav.Aciklama = $("#examDescription").val();

        if (isEdit == true) {
            ozgecmisSinav.Kod = editCode;
            ozgecmisSinav.Guncelle = true;
        }
        else {
            ozgecmisSinav.Kod = guid(6) + "a";
            ozgecmisSinav.Guncelle = false;
        }

        if (ozgecmisSinav.Baslik == "" || ozgecmisSinav.Kurum == "" || ozgecmisSinav.Tarih == "" || ozgecmisSinav.Aciklama == "" || ozgecmisSinav.Puan == "") {
            alert("Lütfen bütün bilgileri eksiksiz doldurunuz.");
            return false;
        }

        if (ozgecmisSinav.Tarih.length < 8 || ozgecmisSinav.Tarih.length > 10) {
            alert("Tarihi alanı boş geçilemez ve yandaki formatta olmalı. (Örn: 08.06.1984)");
            return false;
        }

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisSinavEkle",
            data: "{ ozgecmisSinav: '" + JSON.stringify(ozgecmisSinav) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");

                    var htmlResult = "<div class='row' data-guid='" + ozgecmisSinav.Kod + "'>";
                    htmlResult += "<div class='title'>" + ozgecmisSinav.Baslik + "<br /><span>" + ozgecmisSinav.Kurum + "<br />" + ozgecmisSinav.Tarih + "</span></div>";

                    htmlResult += "<div class='word'>" + ozgecmisSinav.Puan + "<br /><br /><span>" + ozgecmisSinav.Aciklama;
                    htmlResult += "</span></div><a onclick='javascript:;' data-guid='" + ozgecmisSinav.Kod + "' class='red button removeexam'>Sil</a>";
                    htmlResult += "<a onclick='javascript:;' data-guid='" + ozgecmisSinav.Kod + "' class='orange button editexam'>Düzenle</a></div>";

                    if (isEdit) {
                        $("div.row[data-guid='" + ozgecmisSinav.Kod + "']").remove();
                    }

                    addButton.parent("div.row").after(htmlResult);

                    $("#examName").val("");
                    $("#examCompany").val("");
                    $("#examDate").val("");
                    $("#examPoint").val("");
                    $("#examDescription").val("");
                    ResetEdit();
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

    $("#cancelexam").click(function () {
        $("#examName").val("");
        $("#examCompany").val("");
        $("#examDate").val("");
        $("#examPoint").val("");
        $("#examDescription").val("");
        ResetEdit();
    });

    $(document).on("click", ".editexam", function () {
        var ozgecmisSinav = new Object();
        ozgecmisSinav.Kod = $(this).attr("data-guid");

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisSinavGetir",
            data: "{ ozgecmisSinav: '" + JSON.stringify(ozgecmisSinav) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer != undefined) {
                    var ozgecmisSinav = answer;

                    isEdit = true;
                    editCode = ozgecmisSinav.Kod;

                    $("#examName").val(ozgecmisSinav.Baslik);
                    $("#examCompany").val(ozgecmisSinav.Kurum);
                    $("#examDate").val(ozgecmisSinav.Tarih);
                    $("#examPoint").val(ozgecmisSinav.Puan);
                    $("#examDescription").val(ozgecmisSinav.Aciklama);

                    $("html, body").animate({
                        scrollTop: $("h3[data-type='exam']").offset().top
                    }, 1000);
                }
                else {
                    alert("Deneyim bulunamadı!!!");
                }
            }
        });
    });

    $(document).on("click", ".removeexam", function () {
        var answer = confirm("İlgili sınavı silmek istediğinize emin misiniz?");
        var deleteObject = $(this);

        if (answer == true) {
            var ozgecmisSinav = new Object();
            ozgecmisSinav.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisSinavSil",
                data: "{ ozgecmisSinav: '" + JSON.stringify(ozgecmisSinav) + "' }",
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
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });

    /* Dil */
    $("#addlang").click(function () {
        var addButton = $(this);

        var ozgecmisDil = new Object();
        ozgecmisDil.Dil = $("#langName").val();
        ozgecmisDil.Okuma = $("#langreading").text();
        ozgecmisDil.Yazma = $("#langwriting").text();
        ozgecmisDil.Konusma = $("#langspeaking").text();
        ozgecmisDil.Kod = guid(6) + "a";

        if (ozgecmisDil.Dil == "") {
            alert("Lütfen dil ismi bilgisini giriniz.");
            return false;
        }

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisDilEkle",
            data: "{ ozgecmisDil: '" + JSON.stringify(ozgecmisDil) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");

                    var htmlResult = "<div class='row' data-guid='" + ozgecmisDil.Kod + "'>";
                    htmlResult += "<div class='title'>" + ozgecmisDil.Dil + "</div>";

                    htmlResult += "<div class='word'>Okuma (" + ozgecmisDil.Okuma + "), Yazma (" + ozgecmisDil.Yazma + "), Konuşma (" + ozgecmisDil.Konusma + ")</div><a onclick='javascript:;' class='red button removelang' data-guid='" + ozgecmisDil.Kod + "'>Sil</a></div>";

                    $("#langName").val("");
                    $("#langreading").next("ul").children("li").first().click();
                    $("#langwriting").next("ul").children("li").first().click();
                    $("#langspeaking").next("ul").children("li").first().click();

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
    });

    $(document).on("click", ".removelang", function () {
        var answer = confirm("İlgili dil bilgisini silmek istediğinize emin misiniz?");
        var deleteObject = $(this);

        if (answer == true) {
            var ozgecmisDil = new Object();
            ozgecmisDil.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisDilSil",
                data: "{ ozgecmisDil: '" + JSON.stringify(ozgecmisDil) + "' }",
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
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });

    /* Bilgisayar */
    $("#addcomp").click(function () {
        var addButton = $(this);

        var ozgecmisBilgisayar = new Object();
        ozgecmisBilgisayar.Tip = parseInt($("#comptype").attr("data-value"));
        ozgecmisBilgisayar.Baslik = $("#compName").val();
        ozgecmisBilgisayar.Seviye = $("#comppoint").text();
        ozgecmisBilgisayar.Kod = guid(6) + "a";

        if (ozgecmisBilgisayar.Baslik == "") {
            alert("Lütfen bilgisayar bilgisi ismini giriniz.");
            return false;
        }

        var appendItem = "";

        switch (ozgecmisBilgisayar.Tip) {
            case 1:
                appendItem = "#compsoftware";
                break;
            case 2:
                appendItem = "#comphardware";
                break;
            case 3:
                appendItem = "#compdata";
                break;
            case 4:
                appendItem = "#compdesign";
                break;
            case 5:
                appendItem = "#compother";
                break;
            default:
                appendItem = "#compsoftware";
                break;
        }

        $.ajax({
            url: MainPath + "/Ajax/Kullanici/OzgecmisBilgisayarEkle",
            data: "{ ozgecmisBilgisayar: '" + JSON.stringify(ozgecmisBilgisayar) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı.");

                    $("#compName").val("");
                    $("#comptype").next("ul").children("li").first().click();
                    $("#comppoint").next("ul").children("li").first().click();

                    $(appendItem).append("<label class='remover' data-guid='" + ozgecmisBilgisayar.Kod + "'>" + ozgecmisBilgisayar.Baslik + " (" + ozgecmisBilgisayar.Seviye + ") <a class='removecomp' onclick='javascript:;' data-guid='" + ozgecmisBilgisayar.Kod + "'></a></label>");
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

    $(document).on("click", ".removecomp", function () {
        var answer = confirm("İlgili bilgisayar bilgisini silmek istediğinize emin misiniz?");
        var deleteObject = $(this);

        if (answer == true) {
            var ozgecmisBilgisayar = new Object();
            ozgecmisBilgisayar.Kod = $(this).attr("data-guid");

            $.ajax({
                url: MainPath + "/Ajax/Kullanici/OzgecmisBilgisayarSil",
                data: "{ ozgecmisBilgisayar: '" + JSON.stringify(ozgecmisBilgisayar) + "' }",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (answer) {
                    if (answer == true) {
                        alert("Silme İşlemi Başarılı.");

                        deleteObject.parent("label.remover").fadeOut("slow", function () { $(this).remove(); });
                    }
                    else {
                        if (answer == "bilgi") {
                            alert("Bilgiler yanlış.");
                        }
                        else {
                            alert("Silme İşlemi Başarız!!!");
                        }
                    }
                }
            });
        }
    });

    /* Dosya */
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

    function BringCity(cityID) {
        return $.ajax({
            type: "GET",
            url: MainPath + "/Ajax/Genel/SehirGetir",
            data: "sehirID=" + parseInt(cityID),
            dataType: "json"
        });
    }

    function BringSector(sectorID) {
        return $.ajax({
            type: "GET",
            url: MainPath + "/Ajax/Genel/SektorGetir",
            data: "sektorID=" + parseInt(sectorID),
            dataType: "json"
        });
    }

    function BringDepartment(departmentID) {
        return $.ajax({
            type: "GET",
            data: "bolumID=" + parseInt(departmentID),
            url: MainPath + "/Ajax/Genel/BolumGetir",
            dataType: "json"
        });
    }

    function BringPosition(positionID) {
        return $.ajax({
            type: "GET",
            url: MainPath + "/Ajax/Genel/PozisyonGetir",
            data: "pozisyonID=" + parseInt(positionID),
            dataType: "json"
        });
    }

    function BringLevel(levelID) {
        return $.ajax({
            type: "GET",
            url: MainPath + "/Ajax/Genel/SeviyeGetir",
            data: "seviyeID=" + parseInt(levelID),
            dataType: "json"
        });
    }

    function BringTicket(ticketID) {
        return $.ajax({
            type: "GET",
            url: MainPath + "/Ajax/Genel/BursGetir",
            data: "bursID=" + parseInt(ticketID),
            dataType: "json"
        });
    }
});

function RemoveLastChar(s) {
    return s.substring(0, s.length - 1);
}

function ResetEdit() {
    isEdit = false;
    editCode = "";
}
