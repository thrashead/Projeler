var MainPath = null;
var AdminPath = null;
var ScriptPath = null;
var StylePath = null;
var ImagePath = null;
var ProjectFilePath = null;
var UploadPath = null;
var Url = null;

$(document).ready(function () {
    MainPath = "http://localhost/CeyhanPolat";
    ScriptPath = MainPath + "/Scripts";
    StylePath = MainPath + "/Content";
    ImagePath = MainPath + "/Content/images";
    ProjectFilePath = MainPath + "/files";
    UploadPath = MainPath + "/Uploads";
    Url = $("#hdnUrl").val();
});