import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { SolService } from "../../services/sol.service";
var KategoriMenuComponent = /** @class */ (function () {
    function KategoriMenuComponent(_solService) {
        this._solService = _solService;
    }
    KategoriMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getKategoriMenu()
            .subscribe(function (resData) { return _this.kategoriMenu = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    KategoriMenuComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-kategorimenu",
            templateUrl: './kategorimenu.html',
            providers: [SolService]
        }),
        tslib_1.__metadata("design:paramtypes", [SolService])
    ], KategoriMenuComponent);
    return KategoriMenuComponent;
}());
export { KategoriMenuComponent };
//# sourceMappingURL=kategorimenu.js.map