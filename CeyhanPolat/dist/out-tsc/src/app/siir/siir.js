import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { CPService } from "../cp.service";
import { Validators } from "@angular/forms";
let SiirComponent = class SiirComponent {
    constructor(_cpService, route, _formBuilder) {
        this._cpService = _cpService;
        this.route = route;
        this._formBuilder = _formBuilder;
    }
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.link = params['link'];
            this._cpService.getSiir(this.link)
                .subscribe(resSiirData => this.siir = resSiirData, resError => this.errorMsg = resError);
        });
        this.reviewForm = this._formBuilder.group({
            adsoyad: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            puan: [null, [Validators.required, Validators.pattern('^[1-5]{1}$')]],
            mesaj: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
        });
    }
    onSubmit() {
        this.yorumData = {
            "RankID": $("#hdnRankID").val(),
            "NameSurname": this.reviewForm.get("adsoyad").value,
            "Point": this.reviewForm.get("puan").value,
            "Message": this.reviewForm.get("mesaj").value,
        };
        this._cpService.setYorum(this.yorumData)
            .subscribe((answer) => {
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
        }, resError => this.errorMsg = resError);
    }
};
SiirComponent = tslib_1.__decorate([
    Component({
        templateUrl: './siir.html',
        providers: [CPService]
    })
], SiirComponent);
export { SiirComponent };
//# sourceMappingURL=siir.js.map