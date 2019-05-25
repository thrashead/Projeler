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
var emlak_service_1 = require("../emlak.service");
var IletisimComponent = /** @class */ (function () {
    function IletisimComponent(_emlakService) {
        this._emlakService = _emlakService;
    }
    IletisimComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._emlakService.getIcerikGetir("Iletisim")
            .subscribe(function (resData) { return _this.iletisim = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    IletisimComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/icerik/iletisim.component.html',
            providers: [emlak_service_1.EmlakService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService])
    ], IletisimComponent);
    return IletisimComponent;
}());
exports.IletisimComponent = IletisimComponent;
//# sourceMappingURL=iletisim.component.js.map