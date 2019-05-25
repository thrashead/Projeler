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
var cp_service_1 = require("../cp.service");
var GaleriComponent = /** @class */ (function () {
    function GaleriComponent(_cpService) {
        this._cpService = _cpService;
    }
    GaleriComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._cpService.getGaleri()
            .subscribe(function (resGaleriData) {
            _this.galeri = resGaleriData;
            setTimeout(function () {
                $('#cpGallery').tdGallery({
                    imagefolder: "Gallery",
                    thumbfolder: "Thumb"
                });
            }, 500);
        }, function (resError) { return _this.errorMsg = resError; });
    };
    GaleriComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/galeri/galeri.component.html',
            providers: [cp_service_1.CPService]
        }),
        __metadata("design:paramtypes", [cp_service_1.CPService])
    ], GaleriComponent);
    return GaleriComponent;
}());
exports.GaleriComponent = GaleriComponent;
//# sourceMappingURL=galeri.component.js.map