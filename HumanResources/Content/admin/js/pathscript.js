var MainPath = null;
var ScriptPath = null;
var StylePath = null;
var ImagePath = null;
var AjaxPath = null;

var AdminPath = null;
var AdminScriptPath = null;
var AdminStylePath = null;
var AdminImagePath = null;
var AdminAjaxPath = null;

var UploadPath = null;

var Lang = null;
var UserID = null;
var Url = null;
var Urling = new Object();

$(document).ready(function () {
    MainPath = "http://localhost/HumanResources";
    ScriptPath = MainPath + "/Content/js";
    StylePath = MainPath + "/Content/css";
    ImagePath = MainPath + "/Content/img";
    AjaxPath = MainPath + "/Ajax";

    AdminPath = "http://localhost/HumanResources/Admin";
    AdminScriptPath = MainPath + "/Content/admin/js";
    AdminStylePath = MainPath + "/Content/admin/css";
    AdminImagePath = MainPath + "/Content/admin/img";
    AdminAjaxPath = MainPath + "/Ajax/Ajax";

    UploadPath = MainPath + "/Uploads";

    Lang = $("#hdnLang").val();
    Url = $("#hdnUrl").val();
    UserID = $("#hdnUserID").val();

    if (Url != undefined) {
        var tempurl = Url.replace(AdminPath + "/", "");
        var extParams = tempurl.split('?')[1];

        tempurl = tempurl.replace("?" + extParams, "");

        Urling.path = tempurl;
        Urling.controller = tempurl.split('/')[0];
        Urling.action = tempurl.split('/')[1];
        Urling.parameter = tempurl.split('/')[2];

        if (extParams != undefined)
            Urling.parameters = extParams.split('&');
    }
});