var MainPath = null;
var AdminPath = null;
var ScriptPath = null;
var StylePath = null;
var ImagePath = null;
var UploadPath = null;
var Url = null;

$(document).ready(function () {
    MainPath = "http://emlak.sinasalik.net";
    AdminPath = "http://emlak.sinasalik.net/Admin";
    ScriptPath = MainPath + "/Content/js";
    StylePath = MainPath + "/Content/css";
    ImagePath = MainPath + "/Content/img";
    UploadPath = MainPath + "/Uploads";
    Url = $("#hdnUrl").val();
});