$(function () {

});

$(document).ready(function () {
    if ($("#msrcselect").length > 0) {
        $("#msrctext").watermark("Meslek, Şirket, Pozisyon Ara...");
    }

    if ($(".logout").length > 0) {
        $(".logout").click(function () {
            $.ajax({
                type: "POST",
                url: MainPath + "/Ajax/Giris/CikisYap",
                success: function (answer) {
                    window.location = MainPath;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Durum: " + textStatus);
                    alert("Hata: " + errorThrown);
                }
            });
        });
    }
});

function DetectBrowser(browsername) {
    /*
    "Chrome"
    "Firefox"
    "MSIE 8.0"
    "MSIE 9.0"
    */
    var browser = navigator.userAgent.search(browsername);

    if (browser > -1) {
        return true;
    }
    else {
        return false;
    }
}

function PrintDiv(elementID, cssFiles, title) {
    var contents = document.getElementById(elementID).innerHTML;
    var printFrame = document.createElement('iframe');
    printFrame.name = "printFrame";
    printFrame.style.position = "absolute";
    printFrame.style.top = "-1000000px";
    document.body.appendChild(printFrame);
    var frameDoc = printFrame.contentWindow ? printFrame.contentWindow : printFrame.contentDocument.document ? printFrame.contentDocument.document : printFrame.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head><title>' + title + '</title>');

    for (var i = 0; i < cssFiles.length; i++) {
        frameDoc.document.write('<link rel="stylesheet" type="text/css" href="' + cssFiles[i] + '" \/>');
    }

    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["printFrame"].focus();
        window.frames["printFrame"].print();
        document.body.removeChild(printFrame);
    }, 500);
    return false;
}

function guid(length) {
    var _guid = "";

    for (var i = 0; i < length; i++) {
        _guid += Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return _guid;
}

function isValid(text, type) {
    var pattern;

    switch (type) {
        case "username": pattern = new RegExp(/^[a-z0-9_-]{5,12}$/); break;
        case "password": pattern = new RegExp(/^[a-z0-9_-]{8,255}$/); break;
        case "hex": pattern = new RegExp(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/); break;
        case "rewrite": pattern = new RegExp(/^[a-z0-9-]+$/); break;
        case "email": pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
        case "url": pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/); break;
        case "ipaddress": pattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/); break;
        case "htmltag": pattern = new RegExp(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/); break;
        default: pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
    }

    return pattern.test(text);
};

function returnCities(conditions) {
    return $.ajax({
        type: "POST",
        url: MainPath + "/Ajax/Genel/Sehirler",
        data: "{ sartlar: '" + JSON.stringify(conditions) + "' }",
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}

function returnSektors(conditions) {
    return $.ajax({
        type: "POST",
        url: MainPath + "/Ajax/Genel/Sektorler",
        dataType: "json",
        contentType: "application/json; charset=utf-8"
    });
}