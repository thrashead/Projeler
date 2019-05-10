var cityArray = null;

$(document).ready(function () {
    var sartlar = new Object();
    sartlar.SehirGetirme = [99, 340, 34];
    cityArray = returnCities(sartlar);
    sektorArray = returnSektors();

    $("#deletephoto").click(function () {
        var answer = confirm("Logonuzu silmek istediğinize emin misiniz?");
        if (answer == true) {
            DeletePicture();
        }
    });

    $("#changephoto").click(function () {
        $("#Logo").click();
    });

    function DeletePicture() {
        $.ajax({
            type: "POST",
            url: MainPath + '/Ajax/Firma/ResimSil',
            success: function (answer) {
                if (answer == true) {
                    alert("Logonuz silindi.");
                    $("#companylogo").attr("src", ImagePath + "/resimyok.jpg");
                }
                else {
                    alert("Logonuz silinirken bir hata oluştu.");
                }
            }
        });
    }
});

$(function () {
    $("#Logo").click(function () {
        $(this).val(null);
    });

    $("#Logo").change(function () {
        var formData = new FormData();
        var totalFiles = document.getElementById("Logo").files.length;
        var file = document.getElementById("Logo").files[0];
        if (file.size <= 0 || file.size > 100000) {
            alert("Resim boyutu 0 byte olamaz ve 100 kb'tan da büyük olamaz.");
        }
        else {
            formData.append("Logo", file);

            $.ajax({
                type: "POST",
                url: MainPath + "/Ajax/Firma/ResimDegistir",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                success: function (resim) {
                    if (resim != "") {
                        $("#companylogo").attr("src", UploadPath + "/Sirket/" + $("#hdnLoginGuid").val() + "/" + resim);
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
                url: MainPath + "/Ajax/Firma/BilgiGetir",
                dataType: "json",
                success: function (result) {
                    if (result != undefined) {
                        var updateHtml = "<div id='updatearea' class='row' style='display:none;'>";
                        updateHtml += "<div class='subject'>Şirket Adı (Ünvanı) : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updCompany' value='" + result.SirketAdi + "' /></div>";
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
                        updateHtml += "<div class='subject'>TC Kimlik No : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updIdentity' value='" + result.TCKimlikNo + "' /></div>";
                        updateHtml += "<div class='subject'>E-Mail Adresiniz : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updMail' value='" + result.Eposta + "' /></div>";
                        updateHtml += "<div class='subject'>Telefonunuz : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updPhone' value='" + result.Telefon + "' /></div>";
                        updateHtml += "<div class='subject'>Cep Telefonunuz : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updCellphone' value='" + result.CepTelefon + "' /></div>";
                        updateHtml += "<div class='subject'>Faks Numaranız : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updFax' value='" + result.Faks + "' /></div>";
                        updateHtml += "<div class='subject'>Web Siteniz : </div>";
                        updateHtml += "<div class='object'><input type='text' id='updWebsite' value='" + result.Website + "' /></div>";
                        
                        //Sektör
                        var sektor1 = result.Sektor == 1 ? " data-selected='true'" : "";
                        var sektor2 = result.Sektor == 2 ? " data-selected='true'" : "";
                        updateHtml += "<div class='subject'>Sektör : </div>";
                        updateHtml += "<div class='object'>";
                        updateHtml += "<div id='sectorselect' class='select'></div>"
                        updateHtml += "<ul id='sectoroptions' class='options'>";

                        $.each(sektorArray.responseJSON, function (i, sektorData) {
                            var sektorSelected = result.Sektor == parseInt(sektorData.split(',')[1]) ? " data-selected='true'" : "";
                            updateHtml += "<li data-value='" + sektorData.split(',')[1] + "'" + sektorSelected + ">" + sektorData.split(',')[0] + "</li>";
                        });

                        updateHtml += "</ul></div>";
                        
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
                 
                        updateHtml += "<div class='subject'>Hakkınızda : </div>";
                        updateHtml += "<div class='object'><textarea id='updAbout'>" + result.Hakkinda + "</textarea></div>";
                        updateHtml += "<div class='subject'></div>";
                        var haberText = result.HaberUyelik == true ? " checked='checked'" : "";
                        updateHtml += "<div class='object'><label><input type='checkbox' id='updNewsletter'" + haberText + " /> Bana uygun ilan ve haberlerden beni mail ile haberdar et.</label></div>";
                        updateHtml += "<div class='subject'></div>";
                        updateHtml += "<div class='object'><input type='button' id='updSave' class='blue updbutton' value='Kaydet' /><input type='button' id='updCancel' class='blue updbutton' value='İptal' /></div>";
                        updateHtml += "<input type='hidden' id='updID' value='" + result.ID + "' />";

                        updateHtml += "</div>";

                        //Canlı da mask oluşturuyor
                        $(document).on("focus", "#updPhone", function () {
                            $("#updPhone").mask("999 999 99 99");
                        });
                        $(document).on("focus", "#updCellPhone", function () {
                            $("#updCellPhone").mask("999 999 99 99");
                        });
                        $(document).on("focus", "#updFax", function () {
                            $("#updFax").mask("999 999 99 99");
                        });
                        $(document).on("focus", "#updIdentity", function () {
                            $("#updIdentity").mask("99999999999");
                        });

                        $("#updateprofile").parent().parent().after(updateHtml);
                        $("#updatearea").fadeIn("slow");

                        TDDropDown($("#cityselect"));
                        TDDropDown($("#sectorselect"));

                        $("#cityoptions").prev().attr("data-value", result.Sehir);

                        $.each(cityArray.responseJSON, function (i, cityData) {
                            if (result.Sehir == parseInt(cityData.split(',')[1])) {
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

                            if ($("#updCompany").val().length < 2) {
                                alert("Şirket İsminizi kontrol ediniz.");
                                return false;
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

                            if ($("#updIdentity").val().length != 11) {
                                alert("TC Kimlik Numaranızı kontrol ediniz. 11 karakter olmalı.");
                                return false;
                            }

                            if ($("#updPhone").val().replace(/\ /g, "").length < 10) {
                                alert("Telefon numaranızı kontrol ediniz. 10 karakter olmalı.");
                                return false;
                            }

                            if ($("#updCellphone").val().replace(/\ /g, "").length < 10) {
                                alert("Telefon numaranızı kontrol ediniz. 10 rakamdan oluşmalı.");
                                return false;
                            }

                            var Firma = new Object();
                            Firma.ID = parseInt($("#updID").val());
                            Firma.SirketAdi = $("#updCompany").val();
                            Firma.Ad = $("#updName").val();
                            Firma.Soyad = $("#updSurname").val();
                            Firma.Eposta = $("#updMail").val();
                            Firma.Sektor = parseInt($("#sectoroptions li[data-selected='true'").attr("data-value"));
                            Firma.Sehir = parseInt($("#cityoptions li[data-selected='true'").attr("data-value"));
                            Firma.TCKimlikNo = parseInt($("#updIdentity").val());
                            Firma.KullaniciAdi = $("#updUsername").val();
                            Firma.Sifre = $("#updPassword").val();
                            Firma.Telefon = $("#updPhone").val();
                            Firma.CepTelefon = $("#updCellphone").val();
                            Firma.Faks = $("#updFax").val();
                            Firma.Website = $("#updWebsite").val();
                            Firma.Hakkinda = $("#updAbout").val();
                            Firma.HaberUyelik = $("#updNewsletter").is(":checked");

                            $.ajax({
                                url: MainPath + "/Ajax/Firma/BilgiGuncelle",
                                data: "{ firma: '" + JSON.stringify(Firma) + "' }",
                                type: "POST",
                                dataType: "json",
                                contentType: "application/json; charset=utf-8",
                                success: function (answer) {
                                    if (answer == true) {
                                        alert("Bilgileriniz başarıyla güncellendi.");

                                        $("#companyname").text(Firma.SirketAdi);
                                        $("#username").text(Firma.KullaniciAdi);
                                        $("#mail").text(Firma.Eposta);

                                        $("#loginbutton").html("HoşGeldiniz<br /><b>" + Firma.SirketAdi + "</b>");

                                        $("#updatearea").remove();
                                        $("div.row").fadeIn("slow");
                                    }
                                    else {
                                        if (answer == "bilgi") {
                                            alert("Girdiğiniz kullanıcı adı, mail adresi, telefon, cep telefonu veya TC kimlik numarası bilgisi başka bir kullanıcı tarafından daha önce kullanılmış.");
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