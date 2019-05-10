$(document).ready(function () {
    TDDropDown($("#sectorselect"));
    TDDropDown($("#cityselect"));
    $('#phone').mask("999 999 99 99");
    $('#fax').mask("999 999 99 99");
    $('#idnumber').mask("99999999999");
    $('#cellphone').mask("999 999 99 99");

    $('#save').click(function () {
        if ($("#password").val() != $("#password2").val()) {
            alert("Lütfen şifrelerinizi kontrol ediniz.");
            return false;
        }

        if ($("#companyname").val().length < 2) {
            alert("Şirket İsminizi kontrol ediniz.");
            return false;
        }

        if ($("#name").val().length < 2 || $("#name").val().length > 25) {
            alert("Adınızı kontrol ediniz. Minimum 2, Maksimum 25 karakter olmalı.");
            return false;
        }

        if ($("#surname").val().length < 2 || $("#surname").val().length > 35) {
            alert("Soyadınızı kontrol ediniz. Minimum 2, Maksimum 35 karakter olmalı.");
            return false;
        }

        if ($("#username").val().length < 5 || $("#username").val().length > 12) {
            alert("Kullanıcı adınızı kontrol ediniz. Minimum 5, Maksimum 12 karakter olmalı.");
            return false;
        }

        if (!isValid($("#username").val(), "username"))
        {
            alert("Kullanıcı adınız geçersiz.");
            return false;
        }

        if (!isValid($("#mail").val(), "email") || $("#mail").val().length > 255) {
            alert("Mail adresinizi kontrol ediniz.");
            return false;
        }

        if ($("#password").val().length < 8 || $("#password").val().length > 255) {
            alert("Şifrenizi kontrol ediniz. Minimum 8 karakter olmalı.");
            return false;
        }

        if (!isValid($("#password").val(), "password")) {
            alert("Şifreniz geçersiz.");
            return false;
        }

        if ($("#idnumber").val().length != 11) {
            alert("TC Kimlik Numaranızı kontrol ediniz. 11 karakter olmalı.");
            return false;
        }

        if ($("#phone").val().replace(/\ /g, "").length < 10) {
            alert("Telefon numaranızı kontrol ediniz. 10 karakter olmalı.");
            return false;
        }

        if ($("#cellphone").val().replace(/\ /g, "").length < 10) {
            alert("Telefon numaranızı kontrol ediniz. 10 rakamdan oluşmalı.");
            return false;
        }

        if (!$("#contract").is(":checked")) {
            alert("Lütfen önce Üyelik Sözleşmesini konaylayınız.");
            return false;
        }

        var Firma = new Object();
        Firma.SirketAdi = $("#companyname").val();
        Firma.Ad = $("#name").val();
        Firma.Soyad = $("#surname").val();
        Firma.TCKimlikNo = parseInt($("#idnumber").val());
        Firma.Eposta = $("#mail").val();
        Firma.KullaniciAdi = $("#username").val();
        Firma.Sifre = $("#password").val();
        Firma.Sektor = parseInt($("#sectoroptions li[data-selected='true']").attr("data-value"));
        Firma.Sehir = parseInt($("#cityoptions li[data-selected='true']").attr("data-value"));
        Firma.Telefon = $("#phone").val();
        Firma.CepTelefon = $("#cellphone").val();
        Firma.Faks = $("#fax").val();
        Firma.Website = $("#website").val();
        Firma.Hakkinda = $("#about").val();
        Firma.HaberUyelik = $("#newsletter").is(":checked");

        $.ajax({
            url: MainPath + "/Ajax/Kayit/SirketKayit",
            data: "{ firma: '" + JSON.stringify(Firma) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı. Giriş sayfasına yönlendiriliyorsunuz.");
                    window.location.href = MainPath + "/Sirket/Islem/Giris";
                }
                else {
                    if (answer == "bilgi") {
                        alert("Girdiğiniz kullanıcı adı, mail adresi, telefon, cep telefonu veya TC kimlik numarası bilgisi başka bir kullanıcı tarafından daha önce kullanılmış.");
                    }
                    else {
                        alert("Kayıt Başarız!!!");
                    }
                }
            }
        });
    });

});