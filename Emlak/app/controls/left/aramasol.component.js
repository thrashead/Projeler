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
var emlak_service_1 = require("../../emlak.service");
var sol_service_1 = require("../../sol.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
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
    AramaSolComponent = __decorate([
        core_1.Component({
            selector: "emlak-aramasol",
            templateUrl: 'app/controls/left/aramasol.component.html',
            providers: [emlak_service_1.EmlakService, sol_service_1.SolService]
        }),
        __metadata("design:paramtypes", [emlak_service_1.EmlakService, sol_service_1.SolService, forms_1.FormBuilder, router_1.Router])
    ], AramaSolComponent);
    return AramaSolComponent;
}());
exports.AramaSolComponent = AramaSolComponent;
//# sourceMappingURL=aramasol.component.js.map