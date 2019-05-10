$(document).ready(function () {
    GetData();
    GetWhichSide();

    $(".whichside select").change(function () {
        var data = new Object();
        data.Yon = $(this).val();

        ChangeSide(data);
    });
});

function GetData() {
    $.ajax({
        type: "POST",
        url: ProjectPath + "/Ajax/SiteDesign/GetData",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (answer) {
            var sitedesignList = answer;
            $("#sitedesign").html("");

            if (sitedesignList != null) {
                var say = 1;
                var htmlResult = "<li class='top'><div>İsim</div><div>Kısa İsmi</div><div>Sıra</div><div>Göster</div><div>İşlem</div></li>";
                $(sitedesignList).each(function (crap, data) {
                    var dataShow = data.Show == true ? "checked=\"checked\"" : "";

                    htmlResult += "<li><div>" + data.Name + "</div><div>" + data.ShortName + "</div><div><input data-name='or' type=\"text\" value=\"" + data.Order + "\" /></div><div><input data-name='sh' type=\"checkbox\" " + dataShow + " /></div><div><input type='button' class='savebtn' value='Kaydet' data-id=\"" + data.ID + "\" onclick='javascript:SaveData(" + data.ID + ");' /></div></li>";

                    say++;
                });

                $("#sitedesign").html(htmlResult);
            }
        }
    });
}

function GetWhichSide() {
    $.ajax({
        type: "POST",
        url: ProjectPath + "/Ajax/SiteDesign/GetWhichSide",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (answer) {
            if (answer == true) {
                $(".whichside select").val("sol");
            }
            else {
                $(".whichside select").val("sag");
            }
        }
    });
}

function ChangeSide(data) {
    $.ajax({
        type: "POST",
        url: ProjectPath + "/Ajax/SiteDesign/ChangeSide",
        data: "{ data: '" + JSON.stringify(data) + "' }",
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}

function SaveData(id) {
    var data = new Object();
    var obje = $("input[data-id='" + id + "']");
    data.ID = parseInt(id);
    data.Order = parseInt(obje.parent("div").parent("li").children("div").children("input[data-name='or']").val());
    data.Show = obje.parent("div").parent("li").children("div").children("input[data-name='sh']").is(":checked");

    $.ajax({
        type: "POST",
        url: ProjectPath + "/Ajax/SiteDesign/SaveData",
        data: "{ data: '" + JSON.stringify(data) + "' }",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (answer) {
            if (answer == true) {
                alert("Kayıt başarıyla gerçekleşti.");
            }
            else {
                alert("Kayıt sırasında bir hata oluştu.");
            }
        }
    });
}