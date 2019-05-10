import { Component, ViewEncapsulation } from "@angular/core";
import { IKService } from "../services/ik.service";
import '../../Content/js/plugins/tdSelect/tdSelect.js';
import { Sabitler } from "../library";

@Component({
    selector: 'app-ara',
    templateUrl: 'app/kontroller/ara.html',
    styleUrls: [
        'Content/js/plugins/tdSelect/tdSelect.css'
    ],
    styles: [`.tdSelectText { border-color:#FF6600!important; }`],
    encapsulation: ViewEncapsulation.None,
    providers: [IKService]
})

export class AraComponent {
    sehirler: [];
    kodlar: number[];
    errorMsg: string;

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        this.kodlar = [999, 34];

        this.ikService.Sehirler(this.kodlar, true)
            .subscribe(data => {
                this.sehirler = data

                setTimeout(function () {
                    $("#msrcoptions").tdSelect(undefined);
                    $("#msrcoptions").prev().attr("data-value", $("#msrcoptions").children("li[data-selected='true']").attr("value"));
                    $("#msrctext").watermark("Meslek, Şirket, Pozisyon Ara...");
                }, Sabitler.TimeOut1500);
            });
    }

    onClick(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;

        var item = target.parentNode.previousSibling;
        
        item.setAttribute("data-value", target.value);
    }
}