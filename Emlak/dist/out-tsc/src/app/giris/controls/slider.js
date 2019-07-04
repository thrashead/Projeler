import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { HomeService } from "../../services/home.service";
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
    SliderComponent = tslib_1.__decorate([
        Component({
            selector: 'emlak-slider',
            templateUrl: './slider.html',
            providers: [HomeService]
        }),
        tslib_1.__metadata("design:paramtypes", [HomeService])
    ], SliderComponent);
    return SliderComponent;
}());
export { SliderComponent };
//# sourceMappingURL=slider.js.map