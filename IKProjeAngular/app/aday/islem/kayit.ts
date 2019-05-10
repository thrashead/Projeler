import { Component, ViewEncapsulation } from "@angular/core";
import { IKService } from "../../services/ik.service";
import { Sabitler } from "../../library";

@Component({
    templateUrl: 'app/aday/islem/kayit.html',
    styleUrls: [
        'Content/css/sayfalar/Kayit.css',
        'Content/js/plugins/tdSelect/tdSelect.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [IKService]
})

export class AdayIslemKayitComponent {
    cinsiyetler: [];
    sehirler: [];
    kodlar: number[];
    errorMsg: string;

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        this.kodlar = [99, 999, 340, 34];

        this.ikService.Sehirler(this.kodlar, true)
            .subscribe(data => this.sehirler = data);

        this.ikService.Cinsiyetler(null)
            .subscribe(data => this.cinsiyetler = data);

        setTimeout(function () {
            $("#cityoptions").tdSelect(undefined);
            $("#cityoptions").prev().attr("data-value", $("#cityoptions").children("li[data-selected='true']").attr("value"));

            $("#genderoptions").tdSelect(undefined);
            $("#genderoptions").prev().attr("data-value", $("#genderoptions").children("li[data-selected='true']").attr("value"));

            $("#genderoptions").prev(".tdSelectText").addClass("select");
            $("#cityoptions").prev(".tdSelectText").addClass("select");
        }, Sabitler.TimeOut500);
    }

    onClick(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;

        var item = target.parentNode.previousSibling;

        item.setAttribute("data-value", target.value);
    }
}