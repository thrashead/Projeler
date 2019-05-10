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
var ik_service_1 = require("../services/ik.service");
require("../../Content/js/plugins/tdSelect/tdSelect.js");
var library_1 = require("../library");
var AraComponent = /** @class */ (function () {
    function AraComponent(ikService) {
        this.ikService = ikService;
    }
    AraComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.kodlar = [999, 34];
        this.ikService.Sehirler(this.kodlar, true)
            .subscribe(function (data) {
            _this.sehirler = data;
            setTimeout(function () {
                $("#msrcoptions").tdSelect(undefined);
                $("#msrcoptions").prev().attr("data-value", $("#msrcoptions").children("li[data-selected='true']").attr("value"));
                $("#msrctext").watermark("Meslek, Şirket, Pozisyon Ara...");
            }, library_1.Sabitler.TimeOut1500);
        });
    };
    AraComponent.prototype.onClick = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var item = target.parentNode.previousSibling;
        item.setAttribute("data-value", target.value);
    };
    AraComponent = __decorate([
        core_1.Component({
            selector: 'app-ara',
            templateUrl: 'app/kontroller/ara.html',
            styleUrls: [
                'Content/js/plugins/tdSelect/tdSelect.css'
            ],
            styles: [".tdSelectText { border-color:#FF6600!important; }"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [ik_service_1.IKService]
        }),
        __metadata("design:paramtypes", [ik_service_1.IKService])
    ], AraComponent);
    return AraComponent;
}());
exports.AraComponent = AraComponent;
//# sourceMappingURL=ara.js.map