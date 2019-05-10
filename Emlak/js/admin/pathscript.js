var ProjectPath = null;
var MainPath = null;
var ScriptPath = null;
var StylePath = null;
var ImagePath = null;
var UploadPath = null;
var Lang = null;
var Url = null;
var UserID = null;

$(document).ready(function () {
    ProjectPath = "http://localhost/Emlak";
    MainPath = "http://localhost/Emlak/Admin";
    ScriptPath = ProjectPath + "/js/admin";
    StylePath = ProjectPath + "/css/admin";
    ImagePath = ProjectPath + "/img/admin";
    UploadPath = ProjectPath + "/Uploads";
    Lang = $("#hdnLang").val();
    Url = $("#hdnUrl").val();
    UserID = $("#hdnUserID").val();
});