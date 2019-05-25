$(document).ready(function () {
    if ($("#Description").length > 0 && Urling.controller != "Resim" && Urling.controller != "Dosya" && Urling.controller != "FormEleman" && Urling.controller != "FormElemanGrup" && Urling.controller != "KullaniciGrup" && Urling.controller != "KullaniciGrupIslem" && Urling.controller != "LogIslem") {
        ClassicEditor
            .create(document.querySelector('#Description'), {
                //toolbar: ['bold', 'italic']
            })
            .then(editor => {
                window.editor = editor;
            })
            .catch(err => {
                console.error(err.stack);
            });
    }

    /* Login Sayfası*/
    if ($("#loginbox").length > 0) {
        $("#txtUserName").focus();

        $("#btnGiris").click(function () {
            GirisYap();
        });

        $("button.close").click(function () {
            $(".alert-error").fadeOut("slow");
        });

        $("#txtUserName, #txtPassword").keyup(function (event) {
            if (event.keyCode == 13) {
                GirisYap();
            }
        });
    }
    /* Login Sayfası*/

    /* Logout Olayı*/
    if ($("a.logout").length > 0) {
        $("a.logout").click(function () {
            $.ajax({
                type: 'GET',
                url: AdminAjaxPath + "/Logout",
                success: function (answer) {
                    if (answer == true) {
                        window.location = AdminPath;
                    }
                }
            });
        });
    }
    /* Logout Olayı*/

    /* Menü Aktif */
    if (Urling.controller != undefined) {
        var activeLi = $("#sidebar li[data-url='" + Urling.controller + "']");
        var submenuLi = activeLi.parent("ul").parent("li");

        $("#sidebar li").removeClass("active");
        activeLi.addClass("active");

        if (submenuLi.hasClass("submenu")) {
            if ($("body").width() > 970 || $("body").width() <= 480) {
                submenuLi.addClass("open");
            }
            submenuLi.addClass("active");
        }
    }
    /* Menü Aktif */
});

function GirisYap() {
    $("#imgLoading").fadeIn("slow");

    var username = $("#txtUserName").val();
    var password = $("#txtPassword").val();

    if (!isValid(username, "username")) {
        $("#hataMesaj").text("Lütfen geçerli bir kullanıcı adı giriniz.");
        $(".alert-error").fadeIn("slow");

        $("#imgLoading").fadeOut("slow");
        return false;
    }

    if (!isValid(password, "password")) {
        $("#hataMesaj").text("Lütfen geçerli bir şifre giriniz.");
        $(".alert-error").fadeIn("slow");

        $("#imgLoading").fadeOut("slow");
        return false;
    }

    var loginInfo = new Object();
    loginInfo.Username = username;
    loginInfo.Password = password;

    $.ajax({
        type: "POST",
        url: AdminAjaxPath + "/Login",
        data: "{ login: '" + JSON.stringify(loginInfo) + "' }",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (answer) {
            if (answer == true) {
                window.location = AdminPath + "/Giris/AnaSayfa";
            }
            else {
                $("#hataMesaj").text("Lütfen kullanıcı adı ve şifrenizi kontrol ediniz.");
                $(".alert-error").fadeIn("slow");

                $("#imgLoading").fadeOut("slow");
            }
        }
    });
}

/* Validation Control */
function isValid(text, type) {
    var pattern;

    switch (type) {
        case "username": pattern = new RegExp(/^[a-z0-9_-]{3,16}$/); break;
        case "password": pattern = new RegExp(/^[a-z0-9_-]{3,18}$/); break;
        case "hex": pattern = new RegExp(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/); break;
        case "rewrite": pattern = new RegExp(/^[a-z0-9-]+$/); break;
        case "email": pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
        case "url": pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/); break;
        case "ipaddress": pattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/); break;
        case "htmltag": pattern = new RegExp(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/); break;
        default: pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
    }

    return pattern.test(text);
}

$(function () {
    $(".btn-save").attr("data-content", "Girilen değerleri kaydeder.");
    $(".btn-save").attr("data-placement", "top");
    $(".btn-save").attr("data-toggle", "popover");
    $(".btn-save").attr("data-original-title", "Kaydet");

    $(".btn-add").attr("data-content", "Yeni kayıt ekler.");
    $(".btn-add").attr("data-placement", "top");
    $(".btn-add").attr("data-toggle", "popover");
    $(".btn-add").attr("data-original-title", "Ekle");

    $(".btn-copy").attr("data-content", "İlgili veriyi kopyalar.");
    $(".btn-copy").attr("data-placement", "top");
    $(".btn-copy").attr("data-toggle", "popover");
    $(".btn-copy").attr("data-original-title", "Kopyala");

    $(".btn-cancel").attr("data-content", $(".btn-cancel").attr("data-controller") + " listesine geri döner.");
    $(".btn-cancel").attr("data-placement", "top");
    $(".btn-cancel").attr("data-toggle", "popover");
    $(".btn-cancel").attr("data-original-title", "İptal");

    $(".btn-clear").attr("data-content", $(".btn-clear").attr("data-controller") + " listesindeki verilerin tamamını temizler.");
    $(".btn-clear").attr("data-placement", "top");
    $(".btn-clear").attr("data-toggle", "modal");
    $(".btn-clear").attr("data-original-title", "Temizle");

    if ($("#loginbox").length <= 0) {
        $(".btn-save, .btn-cancel, .btn-copy, .btn-add, .btn-clear").popover();
    }

    $(document).on("click", "#btnMainSearch", function () {
        var txtValue = $("#txtMainSearch").val();

        switch (txtValue) {
            case "Kategoriler":
                window.location.href = AdminPath + "/Kategori";
                break;
            case "Kategoriler (Dil)":
                window.location.href = AdminPath + "/KategoriDil";
                break;
            case "İçerikler":
                window.location.href = AdminPath + "/Icerik";
                break;
            case "İçerikler (Dil)":
                window.location.href = AdminPath + "/IcerikDil";
                break;
            case "Ürünler":
                window.location.href = AdminPath + "/Urun";
                break;
            case "Ürünler (Dil)":
                window.location.href = AdminPath + "/UrunDil";
                break;
            case "Galeri":
                window.location.href = AdminPath + "/Galeri";
                break;
            case "Galeri (Dil)":
                window.location.href = AdminPath + "/GaleriDil";
                break;
            case "Resimler":
                window.location.href = AdminPath + "/Resim";
                break;
            case "Dosyalar":
                window.location.href = AdminPath + "/Dosya";
                break;
            case "Meta":
                window.location.href = AdminPath + "/Meta";
                break;
            case "Meta (Dil)":
                window.location.href = AdminPath + "/MetaDil";
                break;
            case "Bağlı Tipler":
                window.location.href = AdminPath + "/BagliTipler";
                break;
            case "Bağlantılar":
                window.location.href = AdminPath + "/Baglanti";
                break;
            case "Form Elemanları":
                window.location.href = AdminPath + "/FormEleman";
                break;
            case "Form Grupları":
                window.location.href = AdminPath + "/FormElemanGrup";
                break;
            case "Form Eleman Özellikleri":
                window.location.href = AdminPath + "/FormElemanOzellik";
                break;
            case "Form Eleman Değerleri":
                window.location.href = AdminPath + "/FormElemanDeger";
                break;
            case "Form Tipleri":
                window.location.href = AdminPath + "/FormTipler";
                break;
            case "Diller":
                window.location.href = AdminPath + "/Dil";
                break;
            default:
                $.gritter.add({
                    title: 'Arama Sonuç',
                    text: 'Aradığınız kelimeye uygun sonuç bulunamadı...',
                    sticky: false
                });
                break;
        }
    });

    /* Silme işlemi */
    $(document).on("click", "a.dltLink", function () {
        $(this).addClass("active-dlt");
        $(".dlt-yes").attr("data-id", $(this).attr("data-id"));
        $(".dlt-yes").attr("data-link", $(this).attr("data-link"));
    });
    $(document).on("click", "a.dlt-yes", function () {
        var link = $(this);
        var url = link.attr("data-link");
        var dataID = parseInt(link.attr("data-id"));

        $.ajax({
            type: 'POST',
            url: AdminPath + "/" + url + "/Sil",
            data: "{ id: " + dataID + " }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veri silindi.',
                        sticky: false
                    });

                    $("a.dltLink.active-dlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                        $(this).remove();
                    });
                }
                else {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veri silinemedi.',
                        sticky: false
                    });
                }
            }
        });
    });
    $(document).on("click", "a.dlt-no", function () {
        $(".dlt-yes").removeAttr("data-id");
        $(".dlt-yes").removeAttr("data-link");
        $("a.dltLink").removeClass("active-dlt");
    });
    /* Silme işlemi */

    /* Kaldırma işlemi */
    $(document).on("click", "a.rdltLink", function () {
        $(this).addClass("active-rdlt");
        $(".rdlt-yes").attr("data-id", $(this).attr("data-id"));
        $(".rdlt-yes").attr("data-link", $(this).attr("data-link"));
    });
    $(document).on("click", "a.rdlt-yes", function () {
        var link = $(this);
        var url = link.attr("data-link");
        var dataID = parseInt(link.attr("data-id"));

        $.ajax({
            type: 'POST',
            url: AdminPath + "/" + url + "/Kaldir",
            data: "{ id: " + dataID + " }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veri kaldırıldı.',
                        sticky: false
                    });

                    $("a.rdltLink.active-rdlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                        $(this).remove();
                    });
                }
                else {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veri kaldırılamadı.',
                        sticky: false
                    });
                }
            }
        });
    });
    $(document).on("click", "a.rdlt-no", function () {
        $(".rdlt-yes").removeAttr("data-id");
        $(".rdlt-yes").removeAttr("data-link");
        $("a.rdltLink").removeClass("active-rdlt");
    });
    /* Kaldırma işlemi */

    /* Kopyalama işlemi */
    $(document).on("click", "a.cpyLink, a.btn-copy", function () {
        $(".cpy-yes").attr("data-id", $(this).attr("data-id"));
        $(".cpy-yes").attr("data-link", $(this).attr("data-link"));
    });
    $(document).on("click", "a.cpy-yes", function () {
        var link = $(this);
        var url = link.attr("data-link");
        var dataID = parseInt(link.attr("data-id"));

        $.ajax({
            type: 'POST',
            url: AdminPath + "/" + url + "/Kopyala",
            data: "{ id: " + dataID + " }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veri kopyalandı.',
                        sticky: false
                    });

                    setTimeout(function () {
                        window.location.href = Url;
                    }, 2000);
                }
                else {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veri kopyalanamadı.',
                        sticky: false
                    });
                }
            }
        });
    });
    $(document).on("click", "a.cpy-no", function () {
        $(".cpy-yes").removeAttr("data-id");
        $(".cpy-yes").removeAttr("data-link");
    });
    /* Kopyalama işlemi */

    /* Temizleme işlemi */
    $(document).on("click", "a.btn-clear", function () {
        $(this).addClass("active-clr");
        $(".clr-yes").attr("data-link", $(this).attr("data-controller"));
    });
    $(document).on("click", "a.clr-yes", function () {
        var link = $(this);
        var url = link.attr("data-link");

        $.ajax({
            type: 'POST',
            url: AdminPath + "/" + url + "/Sil",
            success: function (answer) {
                if (answer == true) {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veriler temizlendi.',
                        sticky: false
                    });

                    setTimeout(function () {
                        window.location.href = Url;
                    }, 2000);
                }
                else {
                    $.gritter.add({
                        title: 'Sonuç',
                        text: 'İlgili veriler temizlenemedi.',
                        sticky: false
                    });
                }
            }
        });
    });
    $(document).on("click", "a.clr-no", function () {
        $(".clr-yes").removeAttr("data-link");
        $("a.btn-clear").removeClass("active-clr");
    });
    /* Temizleme işlemi */

    $(document).on("change", "select.mainType", function () {
        var typeID = $(this).val();

        $.ajax({
            type: "GET",
            url: AdminPath + "/BagliTipler/FillTypes?typeID=" + typeID,
            success: function (answer) {
                $("select.selectMain").html("");

                $.each(answer, function (i, data) {
                    $("select.selectMain").append("<option value='" + data.Value + "'>" + data.Text + "</option>");
                });
            }
        });
    });

    if (Url.indexOf("Baglanti") > 0 && Url.indexOf("Ekle") > 0) {
        $(document).on("change", "select#LinkTypeID", function () {
            var linkTypeID = $(this).val();

            $.ajax({
                type: "GET",
                url: AdminPath + "/Baglanti/FillObject?linkTypeID=" + linkTypeID,
                success: function (answer) {
                    $("select#LinkID").html("");

                    $.each(answer, function (i, data) {
                        $("select#LinkID").append("<option value='" + data.Value + "'>" + data.Text + "</option>");
                    });
                }
            });
        });
    }

    $(document).on("click", ".dropdown-toggle", function () {
        $(this).parent().addClass("open");
    });
});