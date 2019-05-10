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
var sina_service_1 = require("../sina.service");
var GaleriComponent = /** @class */ (function () {
    function GaleriComponent(_sinaService) {
        this._sinaService = _sinaService;
    }
    GaleriComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sinaService.getResimler()
            .subscribe(function (resData) {
            _this.galeri = resData;
            setTimeout(function () {
                $("#slider").tdSlider({
                    autostart: false,
                    slideonclick: true,
                    imagestretch: false,
                    width: 600,
                    height: 500,
                    direction: "LTR",
                    duration: 1000,
                    effect: "fade",
                    showbuttons: true,
                    buttonstyle: "thumb",
                    thumbheight: 70,
                    thumbwidth: 100,
                    tabeffect: "fade",
                    tabbed: true,
                    border: 0
                });
            }, 500);
        }, function (resError) { return _this.errorMsg = resError; });
    };
    GaleriComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/giris/galeri.component.html',
            providers: [sina_service_1.SinaService]
        }),
        __metadata("design:paramtypes", [sina_service_1.SinaService])
    ], GaleriComponent);
    return GaleriComponent;
}());
exports.GaleriComponent = GaleriComponent;
//# sourceMappingURL=galeri.component.js.map