import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak.service";
import { SolService } from "../../services/sol.service";
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
var AramaSolComponent = /** @class */ (function () {
    function AramaSolComponent(_emlakService, _solService, _formBuilder, _router) {
        this._emlakService = _emlakService;
        this._solService = _solService;
        this._formBuilder = _formBuilder;
        this._router = _router;
    }
    AramaSolComponent.prototype.ngOnInit = function () {
        this.solAraForm = this._formBuilder.group({
            kelime: [null],
            kod: [null]
        });
        this.KodlaGetir();
    };
    AramaSolComponent.prototype.onSubmit = function () {
        var _this = this;
        this.HataTemizle();
        this.kelime = this.solAraForm.get("kelime").value;
        this.kod = this.solAraForm.get("kod").value;
        if (this.kelime == null || this.kelime == "") {
            if (this.kod != null && this.kod != "") {
                if (this.kod.length == 20) {
                    this.araKelime = this.kod;
                    this.araTip = "kod";
                }
                else {
                    $("#solAraSonuc2").fadeIn("slow");
                    return false;
                }
            }
            else {
                $("#solAraSonuc1").fadeIn("slow");
                return false;
            }
        }
        else {
            if (this.kelime.length >= 3) {
                this.araKelime = this.kelime;
                this.araTip = "kelime";
            }
            else {
                $("#solAraSonuc1").fadeIn("slow");
                return false;
            }
        }
        if (this.araTip == "kelime") {
            this._router.navigate(['/Emlak/Listele', this.araKelime]);
        }
        if (this.araTip == "kod") {
            this._solService.getSolAraSonuc(this.araKelime, this.araTip)
                .subscribe(function (answer) {
                if (answer != "") {
                    _this._router.navigate(['/Emlak/Detay', answer.RouteUrl]);
                }
                else {
                    if (_this.araTip == "kod") {
                        $("#solAraSonuc3").fadeIn("slow");
                        return false;
                    }
                    else {
                        $("#solAraSonuc4").fadeIn("slow");
                        return false;
                    }
                }
            }, function (resError) { return _this.errorMsg = resError; });
        }
    };
    AramaSolComponent.prototype.closeArama = function () {
        $("#solarasonuclist").hide();
        $("#solarasonuckapat").hide();
    };
    AramaSolComponent.prototype.HataTemizle = function () {
        $("#solAraSonuc1").hide();
        $("#solAraSonuc2").hide();
        $("#solAraSonuc3").hide();
        $("#solAraSonuc4").hide();
    };
    AramaSolComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("srch")
            .subscribe(function (resData) { return _this.aramaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sbyw")
            .subscribe(function (resData) { return _this.kelimeAraText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sbyc")
            .subscribe(function (resData) { return _this.kodAraText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("serc")
            .subscribe(function (resData) { return _this.btnAraText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("sdet")
            .subscribe(function (resData) { return _this.linkAraText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("akgi")
            .subscribe(function (resData) { return _this.kelimeGirText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("iktg")
            .subscribe(function (resData) { _this.kodGirText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ikbu")
            .subscribe(function (resData) { _this.kodYokText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("akbu")
            .subscribe(function (resData) { _this.ilanYokText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    AramaSolComponent = tslib_1.__decorate([
        Component({
            selector: "emlak-aramasol",
            templateUrl: './aramasol.html',
            providers: [EmlakService, SolService]
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService, SolService, FormBuilder, Router])
    ], AramaSolComponent);
    return AramaSolComponent;
}());
export { AramaSolComponent };
//# sourceMappingURL=aramasol.js.map