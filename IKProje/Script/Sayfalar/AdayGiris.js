var cityArray = null;

$(document).ready(function () {
    var sartlar = new Object();
    sartlar.SehirGetirme = [99, 340, 34];
    cityArray = returnCities(sartlar);

    $("#resumestatus").click(function () {
        if ($("#resumestatus").hasClass("active")) {
            ChangeResumeStatus(false);
        }
        else {
            ChangeResumeStatus(true);
        }
    });

    $("#deletephoto").click(function () {
        var answer = confirm("Resminizi silmek istediğinize emin misiniz?");
        if (answer == true) {
            DeletePicture();
        }
    });

    $("#changephoto").click(function () {
        $("#Resim").click();
    });

    function ChangeResumeStatus(active) {
        $.ajax({
            type: "POST",
            url: MainPath + '/Ajax/Kullanici/OzgecmisAktif',
            data: "{ aktif: '" + active + "' }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    if ($("#resumestatus").hasClass("active")) {
                        $("#resumestatus").removeClass("active");
                        $("#resumestatus").addClass("passive");
                        $("#resumestatus").text("Pasif");
                        $("#statusnote").text("Özgeçmişin sadece başvuru yaptığınız firmalar tarafından görüntülenecektir.");
                    }
                    else if ($("#resumestatus").hasClass("passive")) {
                        $("#resumestatus").removeClass("passive");
                        $("#resumestatus").addClass("active");
                        $("#resumestatus").text("Aktif");
                        $("#statusnote").text("Özgeçmişin tüm firmalar tarafından görüntülenecektir.");
                    }
                }
                else {
                    alert("Hata oluştu.");
                }
            }
        });
    }

    function DeletePicture() {
        $.ajax({
            type: "POST",
            url: MainPath + '/Ajax/Kullanici/ResimSil',
            success: function (answer) {
                if (answer == true) {
                    alert("Resminiz silindi.");
                    $("#userphoto").attr("src", ImagePath + "/resimyok.jpg");
                }
                else {
                    alert("Resminiz silinirken bir hata oluştu.");
                }
            }
        });
    }
});

$(function () {
    $("#Resim").click(function () {
        $(this).val(null);
    });

    $("#Resim").change(function () {
        var formData = new FormData();
        var totalFiles = document.getElementById("Resim").files.length;
        var file = document.getElementById("Resim").files[0];
        if (file.size <= 0 || file.size > 100000) {
            alert("Resim boyutu 0 byte olamaz ve 100 kb'tan da büyük olamaz.");
        }
        else {
            formData.append("Resim", file);

            $.ajax({
                type: "POST",
                url: MainPath + "/Ajax/Kullanici/ResimDegistir",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                success: function (resim) {
                    if (resim != "") {
                        $("#userphoto").attr("src", UploadPath + "/Aday/" + $("#hdnLoginGuid").val() + "/" + resim);
                    }
                    else {
                        alert("Dosya uzantısı geçersiz.");
                    }
                }
            });
        }
    });

    $("#updateprofile").click(function () {
        $("#updateprofile").parent().parent("div.row").hide();
        $("#updateprofile").parent().parent("div.row").prevAll("div.row").hide();

        if ($("#updatearea").length <= 0) {
            $.ajax({
                type: "GET",
                url: MainPath + "/Ajax/Kullanici/BilgiGetir",
                dataType: "json",
                success: function (result) {
                    if (result != undefined) {
                        var updateHtml = "<div id='updatearea' class='row' style='display:none;'>";
                        updateHtml += "<div class='subject'>Adınız : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updName' value='" + result.Ad + "' /></div>";
                        updateHtml += "<div class='subject'>Soyadınız : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updSurname' value='" + result.Soyad + "' /></div>";
                        updateHtml += "<div class='subject'>Kullanıcı Adınız : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updUsername' value='" + result.KullaniciAdi + "' /></div>";
                        updateHtml += "<div class='subject'>Şifreniz : </div>";
                        updateHtml += "<div class='object'><input type='password' id='updPassword' /></div>";
                        updateHtml += "<div class='subject'>Şifreniz (Tekrar) : </div>";
                        updateHtml += "<div class='object'><input type='password' id='updPassword2' /><br /><label>Boş kalırsa eski şifre korunacaktır.</label></div>";
                        updateHtml += "<div class='subject'>E-Mail Adresiniz : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updMail' value='" + result.Eposta + "' /></div>";
                        updateHtml += "<div class='subject'>Telefonunuz : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updPhone' value='" + result.Telefon + "' /></div>";


                        //Şehir
                        updateHtml += "<div class='subject'>Şehir : </div>";
                        updateHtml += "<div class='object'>";
                        updateHtml += "<div id='cityselect' class='select'></div>"
                        updateHtml += "<ul id='cityoptions' class='options'>";
                        $.each(cityArray.responseJSON, function (i, cityData) {
                            var sehirSelected = result.Sehir == parseInt(cityData.split(',')[1]) ? " data-selected='true'" : "";
                            updateHtml += "<li data-value='" + cityData.split(',')[1] + "'" + sehirSelected + ">" + cityData.split(',')[0] + "</li>";
                        });

                        updateHtml += "</ul></div>";


                        //Cinsiyet
                        var cinsiyet1 = result.Cinsiyet == 1 ? " data-selected='true'" : "";
                        var cinsiyet2 = result.Cinsiyet == 2 ? " data-selected='true'" : "";
                        updateHtml += "<div class='subject'>Cinsiyet : </div>";
                        updateHtml += "<div class='object'>";
                        updateHtml += "<div id='genderselect' class='select'></div>"
                        updateHtml += "<ul id='genderoptions' class='options'>";
                        updateHtml += "<li data-value='1'" + cinsiyet1 + ">Erkek</li>";
                        updateHtml += "<li data-value='2'" + cinsiyet2 + ">Kadın</li>";
                        updateHtml += "</ul></div>";

                        updateHtml += "<div class='subject'>Hakkınızda : </div>";
                        updateHtml += "<div class='object'><textarea id='updAbout'>" + result.Hakkinda + "</textarea></div>";
                        updateHtml += "<div class='subject'></div>";
                        var haberText = result.HaberUyelik == true ? " checked='checked'" : "";
                        updateHtml += "<div class='object'><label><input type='checkbox' id='updNewsletter'" + haberText + " /> Bana uygun ilan ve haberlerden beni mail ile haberdar et.</label></div>";
                        updateHtml += "<div class='subject'></div>";
                        updateHtml += "<div class='object'><input type='button' id='updSave' class='orange updbutton' value='Kaydet' /><input type='button' id='updCancel' class='orange updbutton' value='İptal' /></div>";
                        updateHtml += "<input type='hidden' id='updID' value='" + result.ID + "' />";

                        updateHtml += "</div>";

                        //Canlı da mask oluşturuyor
                        $(document).on("focus", "#updPhone", function () {
                            $("#updPhone").mask("999 999 99 99");
                        });

                        $("#updateprofile").parent().parent().after(updateHtml);
                        $("#updatearea").fadeIn("slow");

                        TDDropDown($("#cityselect"));
                        TDDropDown($("#genderselect"));

                        $("#cityoptions").prev().attr("data-value", result.Sehir);

                        $.each(cityArray.responseJSON, function (i, cityData) {
                            if (result.Sehir == parseInt(cityData.split(',')[1]))
                            {
                                $("#cityoptions").prev().text(cityData.split(',')[0]);
                            }
                        });

                        $("#updSave").click(function () {
                            if ($("#updPassword").val().length > 0 || $("#updPassword").val().length > 0) {
                                if (!isValid($("#updPassword").val(), "password")) {
                                    alert("Şifreniz geçersiz.");
                                    return false;
                                }

                                if ($("#updPassword").val() != $("#updPassword2").val()) {
                                    alert("Lütfen şifrelerinizi kontrol ediniz.");
                                    return false;
                                }

                                if ($("#updPassword").val().length < 8 || $("#updPassword").val().length > 255) {
                                    alert("Şifrenizi kontrol ediniz. Minimum 8 karakter olmalı.");
                                    return false;
                                }
                            }

                            if ($("#updName").val().length < 2 || $("#updName").val().length > 25) {
                                alert("Adınızı kontrol ediniz. Minimum 2, Maksimum 25 karakter olmalı.");
                                return false;
                            }

                            if ($("#updSurname").val().length < 2 || $("#updSurname").val().length > 35) {
                                alert("Soyadınızı kontrol ediniz. Minimum 2, Maksimum 35 karakter olmalı.");
                                return false;
                            }

                            if ($("#updUsername").val().length < 5 || $("#updUsername").val().length > 12) {
                                alert("Kullanıcı adınızı kontrol ediniz. Minimum 5, Maksimum 12 karakter olmalı.");
                                return false;
                            }

                            if (!isValid($("#updUsername").val(), "username")) {
                                alert("Kullanıcı adınız geçersiz.");
                                return false;
                            }

                            if (!isValid($("#updMail").val(), "email") || $("#updMail").val().length > 255) {
                                alert("Mail adresinizi kontrol ediniz.");
                                return false;
                            }

                            if ($("#updPhone").val().replace(/\ /g, "").length < 10) {
                                alert("Telefon numaranızı kontrol ediniz. 10 rakamdan oluşmalı.");
                                return false;
                            }

                            var Kullanici = new Object();

                            Kullanici.ID = parseInt($("#updID").val());
                            Kullanici.Ad = $("#updName").val();
                            Kullanici.Soyad = $("#updSurname").val();
                            Kullanici.Eposta = $("#updMail").val();
                            Kullanici.KullaniciAdi = $("#updUsername").val();
                            Kullanici.Sifre = $("#updPassword").val();
                            Kullanici.Telefon = $("#updPhone").val();
                            Kullanici.Sehir = parseInt($("#cityoptions li[data-selected='true'").attr("data-value"));
                            Kullanici.Cinsiyet = parseInt($("#genderoptions li[data-selected='true'").attr("data-value"));
                            Kullanici.Hakkinda = $("#updAbout").val();
                            Kullanici.HaberUyelik = $("#updNewsletter").is(":checked");

                            $.ajax({
                                url: MainPath + "/Ajax/Kullanici/BilgiGuncelle",
                                data: "{ kullanici: '" + JSON.stringify(Kullanici) + "' }",
                                type: "POST",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (answer) {
                                    if (answer == true) {
                                        alert("Bilgileriniz başarıyla güncellendi.");

                                        $("#namesurname").text(Kullanici.Ad + ' ' + Kullanici.Soyad);
                                        $("#username").text(Kullanici.KullaniciAdi);
                                        $("#mail").text(Kullanici.Eposta);

                                        $("#loginbutton").html("HoşGeldiniz<br /><b>" + Kullanici.Ad + ' ' + Kullanici.Soyad + "</b>");

                                        $("#updatearea").remove();
                                        $("div.row").fadeIn("slow");
                                    }
                                    else {
                                        if (answer == "bilgi") {
                                            alert("Girdiğiniz kullanıcı adı, mail adresi veya telefon bilgisi başka bir kullanıcı tarafından daha önce kullanılmış.");
                                        }
                                        else {
                                            alert("Güncelleme sırasında hata oluştu.");
                                        }
                                    }
                                }
                            });
                        });

                        $("#updCancel").click(function () {
                            $("#updatearea").remove();
                            $("div.row").fadeIn("slow");
                        });
                    }
                    else {
                        alert("Dosya uzantısı geçersiz.");
                    }
                }
            });
        }
    });
});