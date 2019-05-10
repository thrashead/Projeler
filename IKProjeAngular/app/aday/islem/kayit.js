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
var ik_service_1 = require("../../services/ik.service");
var library_1 = require("../../library");
var AdayIslemKayitComponent = /** @class */ (function () {
    function AdayIslemKayitComponent(ikService) {
        this.ikService = ikService;
    }
    AdayIslemKayitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.kodlar = [99, 999, 340, 34];
        this.ikService.Sehirler(this.kodlar, true)
            .subscribe(function (data) { return _this.sehirler = data; });
        this.ikService.Cinsiyetler(null)
            .subscribe(function (data) { return _this.cinsiyetler = data; });
        setTimeout(function () {
            $("#cityoptions").tdSelect(undefined);
            $("#cityoptions").prev().attr("data-value", $("#cityoptions").children("li[data-selected='true']").attr("value"));
            $("#genderoptions").tdSelect(undefined);
            $("#genderoptions").prev().attr("data-value", $("#genderoptions").children("li[data-selected='true']").attr("value"));
            $("#genderoptions").prev(".tdSelectText").addClass("select");
            $("#cityoptions").prev(".tdSelectText").addClass("select");
        }, library_1.Sabitler.TimeOut500);
    };
    AdayIslemKayitComponent.prototype.onClick = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var item = target.parentNode.previousSibling;
        item.setAttribute("data-value", target.value);
    };
    AdayIslemKayitComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/aday/islem/kayit.html',
            styleUrls: [
                'Content/css/sayfalar/Kayit.css',
                'Content/js/plugins/tdSelect/tdSelect.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [ik_service_1.IKService]
        }),
        __metadata("design:paramtypes", [ik_service_1.IKService])
    ], AdayIslemKayitComponent);
    return AdayIslemKayitComponent;
}());
exports.AdayIslemKayitComponent = AdayIslemKayitComponent;
//# sourceMappingURL=kayit.js.map