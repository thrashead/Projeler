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
var home_service_1 = require("../../home.service");
var SliderComponent = /** @class */ (function () {
    function SliderComponent(_homeService) {
        this._homeService = _homeService;
    }
    SliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._homeService.getSlider()
            .subscribe(function (resData) {
            _this.slider = resData;
            setTimeout(function () {
                $('#slider').flexslider({
                    animation: "slide",
                    slideshowSpeed: 3000,
                    animationSpeed: 1000
                });
            }, 500);
        }, function (resError) { return _this.errorMsg = resError; });
    };
    SliderComponent = __decorate([
        core_1.Component({
            selector: 'emlak-slider',
            templateUrl: 'app/giris/controls/slider.component.html',
            providers: [home_service_1.HomeService]
        }),
        __metadata("design:paramtypes", [home_service_1.HomeService])
    ], SliderComponent);
    return SliderComponent;
}());
exports.SliderComponent = SliderComponent;
//# sourceMappingURL=slider.component.js.map