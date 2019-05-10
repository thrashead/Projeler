var MainPath = null;
var AdminPath = null;
var ScriptPath = null;
var StylePath = null;
var ImagePath = null;
var UploadPath = null;
var Url = null;
var LoginType = null;

$(document).ready(function () {
    MainPath = "http://localhost/IKProje";
    AdminPath = "http://localhost/IKProje/Yonet";
    AdayPath = "http://localhost/IKProje/Aday";
    SirketPath = "http://localhost/IKProje/Sirket";
    ScriptPath = MainPath + "/Script";
    StylePath = MainPath + "/Stil";
    ImagePath = MainPath + "/Resim";
    UploadPath = MainPath + "/Dosya";
    Url = $("#hdnUrl").val();
    LoginType = $("#hdnLoginType").val();
});