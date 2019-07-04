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
var sol_service_1 = require("../../sol.service");
var KategoriMenuComponent = /** @class */ (function () {
    function KategoriMenuComponent(_solService) {
        this._solService = _solService;
    }
    KategoriMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getKategoriMenu()
            .subscribe(function (resData) { return _this.kategoriMenu = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    KategoriMenuComponent = __decorate([
        core_1.Component({
            selector: "emlak-kategorimenu",
            templateUrl: 'app/controls/left/kategorimenu.component.html',
            providers: [sol_service_1.SolService]
        }),
        __metadata("design:paramtypes", [sol_service_1.SolService])
    ], KategoriMenuComponent);
    return KategoriMenuComponent;
}());
exports.KategoriMenuComponent = KategoriMenuComponent;
//# sourceMappingURL=kategorimenu.component.js.map