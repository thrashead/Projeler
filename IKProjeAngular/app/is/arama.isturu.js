"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var arama_service_1 = require("../services/arama.service");
var ik_service_1 = require("../services/ik.service");
var router_1 = require("@angular/router");
var aday_service_1 = require("../services/aday.service");
var library_1 = require("../library");
var IsIsTuruComponent = /** @class */ (function () {
    function IsIsTuruComponent(ikService, aramaService, adayService, route) {
        this.ikService = ikService;
        this.aramaService = aramaService;
        this.adayService = adayService;
        this.route = route;
    }
    IsIsTuruComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.tip = params['tip'];
            if (_this.tip == undefined) {
                _this.kodlar = [];
                _this.haric = true;
                _this.aramaService.Calismalar(_this.kodlar, _this.haric)
                    .subscribe(function (data) { return _this.calismalar = data; });
            }
            else {
                _this.kodlar = [parseInt(_this.tip)];
                _this.haric = false;
                _this.aramaService.CalismaDon(_this.tip)
                    .subscribe(function (resData) {
                    _this.tipID = resData;
                    _this.kodlar = [_this.tipID];
                    _this.haric = false;
                    _this.aramaService.Calismalar(_this.kodlar, _this.haric)
                        .subscribe(function (data) { return _this.calismalar = data; });
                });
            }
            _this.ikService.AktifKullanici()
                .subscribe(function (data) {
                _this.aktifKullanici = data != null ? data.Guid : "";
                if (data != null) {
                    _this.adayService.KayitliAramalar()
                        .subscribe(function (data) { return _this.kayitliAramalar = data; });
                }
                else {
                    _this.kodlar = [1, 2];
                }
                _this.aramaService.DigerSecenekler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.digersecenekler = data; });
                _this.kodlar = [9999, 34];
                _this.ikService.Sehirler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.sehirler = data; });
                _this.kodlar = [];
                _this.aramaService.Tecrubeler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.tecrubeler = data; });
                _this.aramaService.Guncellikler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.guncellikler = data; });
                _this.ikService.Cinsiyetler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.cinsiyetler = data; });
                _this.ikService.Sektorler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.sektorler = data; });
                _this.aramaService.Bolumler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.departmanlar = data; });
                _this.aramaService.Pozisyonlar(_this.kodlar, true)
                    .subscribe(function (data) { return _this.pozisyonlar = data; });
                _this.aramaService.Egitimler(_this.kodlar, true)
                    .subscribe(function (data) { return _this.egitimler = data; });
                setTimeout(function () {
                    $("#searchoptions").tdSelect(undefined);
                    $("#searchoptions").prev().attr("data-value", $("#searchoptions").children("li[data-selected='true']").attr("value"));
                    $("#cityoptions").tdSelect(true);
                    $("#cityoptions").prev().attr("data-value", $("#cityoptions").children("li[data-selected='true']").attr("value"));
                    $("#jobtimeoptions").tdSelect(undefined);
                    $("#jobtimeoptions").prev().attr("data-value", $("#jobtimeoptions").children("li[data-selected='true']").attr("value"));
                    $("#worktypeoptions").tdSelect(undefined);
                    $("#worktypeoptions").prev().attr("data-value", $("#worktypeoptions").children("li[data-selected='true']").attr("value"));
                    $("#sectoroptions").tdSelect(true);
                    $("#sectoroptions").prev().attr("data-value", $("#sectoroptions").children("li[data-selected='true']").attr("value"));
                    $("#departoptions").tdSelect(true);
                    $("#departoptions").prev().attr("data-value", $("#departoptions").children("li[data-selected='true']").attr("value"));
                    $("#positionoptions").tdSelect(true);
                    $("#positionoptions").prev().attr("data-value", $("#positionoptions").children("li[data-selected='true']").attr("value"));
                    $("#eduoptions").tdSelect(undefined);
                    $("#eduoptions").prev().attr("data-value", $("#eduoptions").children("li[data-selected='true']").attr("value"));
                    $("#experoptions").tdSelect(undefined);
                    $("#experoptions").prev().attr("data-value", $("#experoptions").children("li[data-selected='true']").attr("value"));
                    $("#otheroptions").tdSelect(undefined);
                    $("#otheroptions").prev().attr("data-value", $("#otheroptions").children("li[data-selected='true']").attr("value"));
                    $("#genderoptions").tdSelect(undefined);
                    $("#genderoptions").prev().attr("data-value", $("#genderoptions").children("li[data-selected='true']").attr("value"));
                    $("#searchoptions").prev(".tdSelectText").addClass("bigselect select blue");
                    $("#cityoptions").prev(".tdSelectText").addClass("select blue");
                    $("#jobtimeoptions").prev(".tdSelectText").addClass("bigselect select blue");
                    $("#sectoroptions").prev(".tdSelectText").addClass("select blue");
                    $("#departoptions").prev(".tdSelectText").addClass("select blue");
                    $("#positionoptions").prev(".tdSelectText").addClass("select blue");
                    $("#eduoptions").prev(".tdSelectText").addClass("select blue");
                    $("#experoptions").prev(".tdSelectText").addClass("select blue");
                    $("#otheroptions").prev(".tdSelectText").addClass("select blue");
                    $("#genderoptions").prev(".tdSelectText").addClass("bigselect select blue");
                    var worktype = $("#worktypeoptions");
                    worktype.prev(".tdSelectText").addClass("bigselect select blue");
                    worktype.prev(".tdSelectText").css("background-image", "none");
                    worktype.prev(".tdSelectText").css("cursor", "auto");
                    worktype.prev(".tdSelectText").css("background-color", "#4E9FF4");
                    worktype.prev(".tdSelectText").css("color", "#FFF");
                    worktype.prev(".tdSelectText").css("font-weight", "bold");
                    worktype.prev(".tdSelectText").css("text-align", "center");
                    worktype.remove();
                    $("#addworktype").remove();
                    $("#addedworktypes").remove();
                }, library_1.Sabitler.TimeOut2000);
                _this.ButtonScroll();
            });
        });
    };
    IsIsTuruComponent.prototype.onLiClick = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var selectedLi = target.parentNode.previousSibling;
        selectedLi.setAttribute("data-value", target.value);
    };
    IsIsTuruComponent.prototype.onAdd = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var selectedID = target.previousElementSibling.id;
        var addListID = target.nextElementSibling.id;
        var selectedText = $("#" + selectedID).children("li[data-selected='true']").text();
        var selectedValue = $("#" + selectedID).children("li[data-selected='true']").attr("data-value");
        if (this.selectedValControl($("#" + addListID), selectedValue) == true) {
            $("#" + addListID).append("<li data-value='" + selectedValue + "'>" + selectedText + "</li>");
        }
        $("#" + addListID + " li").click(function () {
            $(this).fadeOut("slow", function () { $(this).remove(); });
        });
    };
    IsIsTuruComponent.prototype.selectedValControl = function (addList, value) {
        var kontrol = true;
        addList.children("li").each(function () {
            if ($(this).attr("data-value") == value) {
                kontrol = false;
            }
        });
        if (value == "0") {
            kontrol = false;
        }
        return kontrol;
    };
    IsIsTuruComponent.prototype.sayac = function (i) {
        return new Array(i);
    };
    IsIsTuruComponent.prototype.ButtonScroll = function () {
        $(window).scroll(function () {
            var top = ($(document).scrollTop() + $(window).height()) - $(".buttonsearch").height();
            var top2 = $("#jobsearch").offset().top + $("#jobsearch").height();
            if ($("#leftclick").is(":visible")) {
                top -= 150;
                top2 -= 150;
            }
            if (top <= top2) {
                if ($("#leftclick").is(":visible")) {
                    $(".buttonsearch").css("top", top.toString() + "px");
                }
                else {
                    $(".buttonsearch").css("top", top.toString() + "px");
                }
            }
            else {
                if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    $(".buttonsearch").css("top", (top2 - $(".buttonsearch").height() - 1).toString() + "px");
                }
                else {
                    $(".buttonsearch").css("top", (top2 - $(".buttonsearch").height() - 3).toString() + "px");
                }
            }
        });
    };
    IsIsTuruComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/is/arama.html',
            styleUrls: [
                'Content/css/sayfalar/Ara.css',
                'Content/css/kontroller/Tablo.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [ik_service_1.IKService, arama_service_1.AramaService, aday_service_1.AdayService]
        }),
        __metadata("design:paramtypes", [ik_service_1.IKService, arama_service_1.AramaService, aday_service_1.AdayService, router_1.ActivatedRoute])
    ], IsIsTuruComponent);
    return IsIsTuruComponent;
}());
exports.IsIsTuruComponent = IsIsTuruComponent;
//# sourceMappingURL=arama.isturu.js.map