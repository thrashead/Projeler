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
var forms_1 = require("@angular/forms");
var SiirComponent = /** @class */ (function () {
    function SiirComponent(_cpService, route, _formBuilder) {
        this._cpService = _cpService;
        this.route = route;
        this._formBuilder = _formBuilder;
    }
    SiirComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.link = params['link'];
            _this._cpService.getSiir(_this.link)
                .subscribe(function (resSiirData) { return _this.siir = resSiirData; }, function (resError) { return _this.errorMsg = resError; });
        });
        this.reviewForm = this._formBuilder.group({
            adsoyad: [null, [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(50)]],
            puan: [null, [forms_1.Validators.required, forms_1.Validators.pattern('^[1-5]{1}$')]],
            mesaj: [null, [forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)]]
        });
        setTimeout(function () {
            $("#txtSender").watermark("Adınız Soyadınız");
            $("#txtPoint").watermark("Puan (Maks. 5 Puan)");
            $("#txtMessage").watermark("Mesajınız...");
        }, 500);
    };
    SiirComponent.prototype.onSubmit = function () {
        var _this = this;
        this.yorumData = [{
                "RankID": $("#hdnRankID").val(),
                "NameSurname": this.reviewForm.get("adsoyad").value,
                "Point": this.reviewForm.get("puan").value,
                "Message": this.reviewForm.get("mesaj").value,
            }];
        this._cpService.setYorum(this.yorumData)
            .subscribe(function (answer) {
            if (answer == true) {
                alert("Mesajınız gönderilmiştir. Onaylandığı takdirde yayınlanacaktır.");
                $("#txtSender").val("");
                $("#txtPoint").val("");
                $("#txtMessage").val("");
                $(".sendreview").fadeOut("slow");
            }
            else {
                alert("Mesajınız gönderilirken bir hata meydana geldi.");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    SiirComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/siir/siir.component.html',
            providers: [cp_service_1.CPService]
        }),
        __metadata("design:paramtypes", [cp_service_1.CPService, router_1.ActivatedRoute, forms_1.FormBuilder])
    ], SiirComponent);
    return SiirComponent;
}());
exports.SiirComponent = SiirComponent;
//# sourceMappingURL=siir.component.js.map