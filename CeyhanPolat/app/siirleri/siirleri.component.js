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
var router_1 = require("@angular/router");
var SiirleriComponent = /** @class */ (function () {
    function SiirleriComponent(_cpService, router) {
        this._cpService = _cpService;
        this.router = router;
    }
    SiirleriComponent.prototype.onClick = function (id) {
        var _this = this;
        $(this).attr("disabled", "disabled");
        $("#processframe").css("display", "block");
        if (id == "" || id == null) {
            this.kelime = [{
                    "firstdate": "",
                    "lastdate": "",
                    "poetryname": "",
                }];
            this._cpService.getSiirAramaTemizle(this.kelime)
                .subscribe(function (result) {
                if (result == "Y") {
                    _this.router.navigate(['/Biyografi']).then(function () { _this.router.navigate(['/Siirleri']); });
                }
                else {
                    $("#processframe").css("display", "none");
                    alert("Arama kriterleri temizlenemedi...");
                }
            }, function (resError) { return _this.errorMsg = resError; });
        }
        else {
            var fd = id != "clearfirstdate" ? $("#clearfirstdate").text().replace(" [x]", "") : "";
            var ld = id != "clearlastdate" ? $("#clearlastdate").text().replace(" [x]", "") : "";
            var pn = id != "clearpoetryname" ? $("#clearpoetryname").text().replace(" [x]", "") : "";
            this.kelime = [{
                    "firstdate": fd,
                    "lastdate": ld,
                    "poetryname": pn,
                }];
            if (fd == "" && ld == "" && pn == "") {
                this._cpService.getSiirAramaTemizle(this.kelime)
                    .subscribe(function (result) {
                    if (result == "Y") {
                        _this.router.navigate(['/Biyografi']).then(function () { _this.router.navigate(['/Siirleri']); });
                    }
                    else {
                        $("#processframe").css("display", "none");
                        alert("Arama kriterleri temizlenemedi...");
                    }
                }, function (resError) { return _this.errorMsg = resError; });
            }
            else {
                this._cpService.getSiirArama(this.kelime)
                    .subscribe(function (result) {
                    if (result == "Y") {
                        _this.router.navigate(['/Biyografi']).then(function () { _this.router.navigate(['/Siirleri']); });
                    }
                }, function (resError) { return _this.errorMsg = resError; });
            }
        }
    };
    SiirleriComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._cpService.getSiirleri()
            .subscribe(function (resSiirleriData) { return _this.siirleri = resSiirleriData; }, function (resError) { return _this.errorMsg = resError; });
    };
    SiirleriComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/siirleri/siirleri.component.html',
            providers: [cp_service_1.CPService]
        }),
        __metadata("design:paramtypes", [cp_service_1.CPService, router_1.Router])
    ], SiirleriComponent);
    return SiirleriComponent;
}());
exports.SiirleriComponent = SiirleriComponent;
//# sourceMappingURL=siirleri.component.js.map