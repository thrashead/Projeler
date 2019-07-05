import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { SolService } from "../../services/sol.service";
var GununEmlagiComponent = /** @class */ (function () {
    function GununEmlagiComponent(_emlakService, _solService) {
        this._emlakService = _emlakService;
        this._solService = _solService;
        this.detayLinkText = "resimyok";
    }
    GununEmlagiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._solService.getGununIlani()
            .subscribe(function (resData) { return _this.emlak = resData; }, function (resError) { return _this.errorMsg = resError; });
        this.KodlaGetir();
    };
    GununEmlagiComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("guil")
            .subscribe(function (resData) { return _this.gununIlaniText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dtyr")
            .subscribe(function (resData) { return _this.detayLinkText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    GununEmlagiComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-gununemlagi",
            templateUrl: './gununemlagi.html',
            providers: [EmlakService, SolService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService, SolService])
    ], GununEmlagiComponent);
    return GununEmlagiComponent;
}());
export { GununEmlagiComponent };
//# sourceMappingURL=gununemlagi.js.map