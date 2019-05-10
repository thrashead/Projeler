$(document).ready(function () {
    TDDropDown($("#genderselect"));
    TDDropDown($("#cityselect"));
    $('#phone').mask("999 999 99 99");

    $('#save').click(function () {
        if ($("#password").val() != $("#password2").val()) {
            alert("Lütfen şifrelerinizi kontrol ediniz.");
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

        if (!isValid($("#username").val(), "username")) {
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

        if ($("#phone").val().replace(/\ /g, "").length < 10) {
            alert("Telefon numaranızı kontrol ediniz. 10 rakamdan oluşmalı.");
            return false;
        }

        if (!$("#contract").is(":checked")) {
            alert("Lütfen önce Üyelik Sözleşmesini konaylayınız.");
            return false;
        }

        var Kullanici = new Object();
        Kullanici.Ad = $("#name").val();
        Kullanici.Soyad = $("#surname").val();
        Kullanici.Eposta = $("#mail").val();
        Kullanici.KullaniciAdi = $("#username").val();
        Kullanici.Sifre = $("#password").val();
        Kullanici.Cinsiyet = parseInt($("#genderoptions li[data-selected='true']").attr("data-value"));
        Kullanici.Telefon = $("#phone").val();
        Kullanici.Sehir = parseInt($("#cityoptions li[data-selected='true']").attr("data-value"));
        Kullanici.Hakkinda = $("#about").val();
        Kullanici.HaberUyelik = $("#newsletter").is(":checked");

        $.ajax({
            url: MainPath + "/Ajax/Kayit/AdayKayit",
            data: "{ kullanici: '" + JSON.stringify(Kullanici) + "' }",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    alert("Kayıt Başarılı. Giriş sayfasına yönlendiriliyorsunuz.");
                    window.location.href = MainPath + "/Aday/Islem/Giris";
                }
                else {
                    if (answer == "bilgi") {
                        alert("Girdiğiniz kullanıcı adı, mail adresi veya telefon bilgisi başka bir kullanıcı tarafından daha önce kullanılmış.");
                    }
                    else {
                        alert("Kayıt Başarız!!!");
                    }
                }
            }
        });
    });

});