var MainPath = null;
var AdminPath = null;
var ScriptPath = null;
var StylePath = null;
var ImagePath = null;
var ProjectFilePath = null;
var UploadPath = null;
var Url = null;

$(document).ready(function () {
    MainPath = "http://localhost/Emlak";
    AdminPath = "http://localhost/Emlak/Admin";
    ScriptPath = MainPath + "/js";
    StylePath = MainPath + "/css";
    ImagePath = MainPath + "/img";
    ProjectFilePath = MainPath + "/files";
    UploadPath = MainPath + "/Uploads";
    Url = $("#hdnUrl").val();
});