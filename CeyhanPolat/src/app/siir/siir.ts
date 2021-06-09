import { Component } from "@angular/core";
import { CPService } from "../cp.service";
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { YorumData } from "../models/YorumData";

@Component({
    templateUrl: './siir.html',
    providers: [CPService]
})

export class SiirComponent {
    siir: any;
    public link: string;
    errorMsg: string;
    reviewForm: FormGroup;
    yorum: YorumData;

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
    }

    onSubmit() {
        this.yorum = {} as YorumData;

        this.yorum.RankID = $("#hdnRankID").val().toString();
        this.yorum.NameSurname = this.reviewForm.get("adsoyad").value;
        this.yorum.Point = this.reviewForm.get("puan").value;
        this.yorum.Message = this.reviewForm.get("mesaj").value;

        this._cpService.setYorum(this.yorum).subscribe((answer: any) => {
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