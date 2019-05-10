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
var cp_service_1 = require("./cp.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var AppComponent = /** @class */ (function () {
    function AppComponent(_cpService, router) {
        this._cpService = _cpService;
        this.router = router;
        this.searchForm = new forms_1.FormGroup({
            firstdate: new forms_1.FormControl(),
            lastdate: new forms_1.FormControl(),
            poetryname: new forms_1.FormControl()
        });
    }
    AppComponent.prototype.onSubmit = function (event) {
        var _this = this;
        var fd = event.target.firstdate.value;
        var ld = event.target.lastdate.value;
        var pn = event.target.poetryname.value;
        if (fd == "" && ld == "" && pn == "") {
            this.router.navigate(['/Biyografi']).then(function () { _this.router.navigate(['/Siirleri']); });
        }
        else {
            this.aramaData = [{
                    "firstdate": fd,
                    "lastdate": ld,
                    "poetryname": pn,
                }];
            this._cpService.getSiirArama(this.aramaData)
                .subscribe(function (resSiirAramaData) {
                _this.siirArama = resSiirAramaData;
                if (_this.siirArama == "Y") {
                    _this.router.navigate(['/Biyografi']).then(function () { _this.router.navigate(['/Siirleri']); });
                }
            }, function (resError) { return _this.errorMsg = resError; });
        }
    };
    AppComponent.prototype.onKeyUp = function (kelime) {
        var _this = this;
        this._cpService.getSiirAramaListe(kelime)
            .subscribe(function (resSiirAramaListeData) {
            _this.siirAramaListe = resSiirAramaListeData;
            if (_this.siirAramaListe.length > 0) {
                $("#siirsearchlist").css("display", "");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AppComponent.prototype.onFocus = function () {
        if ($("#siirsearchlist li").length > 0) {
            setTimeout(function () {
                $("#siirsearchlist").css("display", "");
            }, 100);
        }
    };
    AppComponent.prototype.onBlur = function () {
        if ($("#siirsearchlist li").length > 0) {
            setTimeout(function () {
                $("#siirsearchlist").css("display", "none");
            }, 100);
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._cpService.getMenu()
            .subscribe(function (resMenuData) {
            _this.menu = resMenuData;
        }, function (resError) { return _this.errorMsg = resError; });
        this._cpService.getSlider()
            .subscribe(function (resSliderData) {
            _this.slider = resSliderData;
            setTimeout(function () {
                var d = new Date();
                $("#poetryname").watermark("Şiir İsmi");
                $("#firstdate").watermark("İlk Tarih");
                $("#lastdate").watermark("Son Tarih");
                $("#firstdate").datepicker({ dateFormat: "dd.mm.yy", defaultDate: new Date("03/30/1944") });
                $("#lastdate").datepicker({ dateFormat: "dd.mm.yy", defaultDate: new Date("01/06/1982") });
                $('#slider').flexslider({
                    animation: "slide",
                    slideshowSpeed: 3000,
                    animationSpeed: 1000
                });
            }, 500);
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "cp-app",
            templateUrl: 'app/app.component.html',
            providers: [cp_service_1.CPService]
        }),
        __metadata("design:paramtypes", [cp_service_1.CPService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map