import { Component } from "@angular/core";
import { CPService } from "../cp.service";
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    templateUrl: 'app/siir/siir.component.html',
    providers: [CPService]
})

export class SiirComponent {
    siir: [];
    public link: string;
    errorMsg: string;
    reviewForm: FormGroup;
    yorumData: any;

    constructor(private _cpService: CPService, private route: ActivatedRoute, private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];

            this._cpService.getSiir(this.link)
                .subscribe(resSiirData => this.siir = resSiirData,
                    resError => this.errorMsg = resError);
        });

        this.reviewForm = this._formBuilder.group({
            adsoyad: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            puan: [null, [Validators.required, Validators.pattern('^[1-5]{1}$')]],
            mesaj: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
        });

        setTimeout(function () {
            $("#txtSender").watermark("Adınız Soyadınız");
            $("#txtPoint").watermark("Puan (Maks. 5 Puan)");
            $("#txtMessage").watermark("Mesajınız...");
        }, 500);
    }

    onSubmit() {
        this.yorumData = [{
            "RankID": $("#hdnRankID").val(),
            "NameSurname": this.reviewForm.get("adsoyad").value,
            "Point": this.reviewForm.get("puan").value,
            "Message": this.reviewForm.get("mesaj").value,
        }];

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
            },
                resError => this.errorMsg = resError);
    }
}