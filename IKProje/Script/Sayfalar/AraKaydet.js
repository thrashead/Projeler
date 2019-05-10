$(document).ready(function () {
    TDDropDown($("#searchselect"));


});

$(function () {
    $(document).on("click", "#searchoptions li", function () {
        var searchID = parseInt($(this).attr("data-value"));
        $("#searchoptions li").removeAttr("data-selected");
        $("#searchoptions li[data-value='" + searchID.toString() + "']").attr("data-selected", "true");
        $("#searchselect").val($("#searchoptions li[data-selected='true']").text());
    });

    $(document).on("click", "#savesearch", function () {
        $(".saveSearchArea").fadeIn("slow");
        $("#middlesaveArea").fadeIn("slow");
    });

    $(document).on("click", "#searchCancel", function () {
        $("#searchHeader").val("");
        $(".saveSearchArea").fadeOut("slow");
        $("#middlesaveArea").fadeOut("slow");
    });

    $(document).on("click", "#searchSave", function () {
        if ($("#searchHeader").val().length > 2) {
            var searchObject = new Object();

            searchObject.Baslik = $("#searchHeader").val();
            searchObject.Sozcuk = $("#keyword").val();
            searchObject.SozcukTumu = $("#headertext").is(":checked") ? false : true;
            searchObject.Cinsiyet = parseInt($("#genderoptions li[data-selected='true']").attr("data-value"));
            searchObject.Tarih = parseInt($("#jobtimeoptions li[data-selected='true']").attr("data-value"));

            searchObject.Sehir = ApplyValue(searchObject.Sehir, $("#addedcities"), $("#cityoptions"));
            searchObject.CalismaTipi = ApplyValue(searchObject.CalismaTipi, $("#addedworktypes"), $("#worktypeoptions"));
            searchObject.Sektor = ApplyValue(searchObject.Sektor, $("#addedsectors"), $("#sectoroptions"));
            searchObject.Departman = ApplyValue(searchObject.Departman, $("#addeddeparts"), $("#departoptions"));
            searchObject.Pozisyon = ApplyValue(searchObject.Pozisyon, $("#addedpositions"), $("#positionoptions"));
            searchObject.Egitim = ApplyValue(searchObject.Egitim, $("#addededus"), $("#eduoptions"));
            searchObject.Tecrube = ApplyValue(searchObject.Tecrube, $("#addedexpers"), $("#experoptions"));
            searchObject.Diger = ApplyValue(searchObject.Diger, $("#addedothers"), $("#otheroptions"));

            $.ajax({
                url: MainPath + "/Ajax/Arama/Kayit",
                data: "{ arama: '" + JSON.stringify(searchObject) + "' }",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (answer) {
                    if (answer != false) {
                        alert("Kayıt Başarılı.");
                        $("#searchoptions").append("<li data-value=\"" + answer + "\">" + searchObject.Baslik + "</li>");
                        $("#searchCancel").click();
                    }
                    else {
                        alert("Kayıt Başarız!!!");
                    }
                }
            });
        }
        else {
            alert("Başlık en az 3 karakter olmalıdır.");
            return false;
        }

        function ApplyValue(val, added, option) {
            val = "";
            if (added.children("li").length > 0) {
                added.children("li").each(function () {
                    val += $(this).attr("data-value") + ",";
                });
                val = RemoveLastChar(val);
            }
            else {
                val = option.children("li[data-selected='true']").attr("data-value");
            }

            return val;
        }
    });

    $(document).on("click", "#applysearch", function () {
        var searchID = parseInt($("#searchoptions li[data-selected='true']").attr("data-value"));

        if (searchID > 0) {
            $(".saveSearchArea").fadeIn("slow");
            $(".saveSearchArea #loadimg").css("display", "block");

            $.ajax({
                type: "POST",
                url: MainPath + '/Ajax/Arama/Getir',
                data: "{'searchID': " + searchID + "}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result != null) {
                        $("#keyword").val(result.Sozcuk);

                        if (result.SozcukTumu == true) {
                            $("#alltext").prop("checked", true);
                            $("#headertext").prop("checked", false);
                        }
                        else {
                            $("#alltext").prop("checked", false);
                            $("#headertext").prop("checked", true);
                        }

                        $("#genderoptions li[data-value='" + result.Cinsiyet + "']").click();
                        $("#jobtimeoptions li[data-value='" + result.Tarih + "']").click();

                        FillValues(result.Sehir, $("#addedcities"), $("#cityoptions"));
                        FillValues(result.CalismaTipi, $("#addedworktypes"), $("#worktypeoptions"));
                        FillValues(result.Sektor, $("#addedsectors"), $("#sectoroptions"));
                        FillValues(result.Departman, $("#addeddeparts"), $("#departoptions"));
                        FillValues(result.Pozisyon, $("#addedpositions"), $("#positionoptions"));
                        FillValues(result.Egitim, $("#addededus"), $("#eduoptions"));
                        FillValues(result.Tecrube, $("#addedexpers"), $("#experoptions"));
                        FillValues(result.Diger, $("#addedothers"), $("#otheroptions"));

                        $(".saveSearchArea #loadimg").hide();
                        $(".saveSearchArea").fadeOut("slow");
                    }
                    else {
                        $(".saveSearchArea #loadimg").hide();
                        $(".saveSearchArea").fadeOut("slow");

                        alert("Arama getirilemedi.");
                    }
                },
                error: function (request, status, error) {
                    $(".saveSearchArea #loadimg").hide();
                    $(".saveSearchArea").fadeOut("slow");

                    alert("Arama getirilemedi.");
                }
            });
        }
        else {
            alert("Lütfen geçerli bir arama seçiniz.");
        }

        function FillValues(val, added, option) {
            added.html("");

            var vals = val.split(',');
            var valcount = vals.length;

            if (valcount > 1) {
                for (var i = 0; i < valcount; i++) {
                    option.children("li[data-value='" + vals[i] + "']").click();
                    option.next("a").click();
                }
            }
            else {
                option.children("li[data-value='" + val + "']").click();
            }
        }
    });

    $(document).on("click", "#deletesearch", function () {
        var searchID = parseInt($("#searchoptions li[data-selected='true']").attr("data-value"));

        if (searchID > 0) {
            $(".saveSearchArea").fadeIn("slow");
            $(".saveSearchArea #loadimg").css("display", "block");

            $.ajax({
                type: "POST",
                url: MainPath + '/Ajax/Arama/Sil',
                data: "{'searchID': " + searchID + "}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    if (result == true) {
                        alert("Arama başarıyla silindi.");
                        $("#searchoptions li[data-selected='true']").remove();
                        $("#searchoptions li").removeAttr("data-selected");
                        $("#searchoptions li[data-value='0']").attr("data-selected", "true");
                        $("#searchselect").val($("#searchoptions li[data-selected='true']").text());

                        $(".saveSearchArea #loadimg").hide();
                        $(".saveSearchArea").fadeOut("slow");
                    }
                    else {
                        $(".saveSearchArea #loadimg").hide();
                        $(".saveSearchArea").fadeOut("slow");

                        alert("Arama silinemedi.");
                    }
                },
                error: function (request, status, error) {
                    $(".saveSearchArea #loadimg").hide();
                    $(".saveSearchArea").fadeOut("slow");

                    alert("Arama silinemedi.");
                }
            });
        }
        else {
            alert("Lütfen geçerli bir arama seçiniz.");
        }
    });
});

function RemoveLastChar(s) {
    return s.substring(0, s.length - 1);
}