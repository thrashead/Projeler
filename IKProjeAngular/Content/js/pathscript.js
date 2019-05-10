var MainPath = null;
var AdminPath = null;
var AdayPath = null;
var SirketPath = null;
var StylePath = null;
var ScriptPath = null;
var ImagePath = null;
var UploadPath = null;
var Url = null;
var LoginType = null;

$(document).ready(function () {
    MainPath = "http://localhost/IKProjeAngular";
    AdminPath = "http://localhost/IKProjeAngular/Yonet";
    AdayPath = "http://localhost/IKProjeAngular/Aday";
    SirketPath = "http://localhost/IKProjeAngular/Sirket";
    StylePath = MainPath + "/Content/css";
    ScriptPath = MainPath + "/Content/js";
    ImagePath = MainPath + "/Content/img";
    UploadPath = MainPath + "/Content/files";
    Url = $("#hdnUrl").val();
    LoginType = $("#hdnLoginType").val();
})