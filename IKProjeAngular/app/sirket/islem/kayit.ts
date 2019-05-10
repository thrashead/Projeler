import { Component, ViewEncapsulation } from "@angular/core";
import { IKService } from "../../services/ik.service";
import { Sabitler } from "../../library";

@Component({
    templateUrl: 'app/sirket/islem/kayit.html',
    styleUrls: [
        'Content/css/sayfalar/Kayit.css',
        'Content/js/plugins/tdSelect/tdSelect.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [IKService]
})

export class SirketIslemKayitComponent {
    sektorler: [];
    sehirler: [];
    kodlar: number[];
    errorMsg: string;

    constructor(private ikService: IKService) {
    }

    ngOnInit() {
        this.kodlar = [999, 340, 34];

        this.ikService.Sehirler(this.kodlar, true)
            .subscribe(data => this.sehirler = data);

        this.ikService.Sektorler(null)
            .subscribe(data => this.sektorler = data);

        setTimeout(function () {
            $("#sectoroptions").tdSelect(undefined);
            $("#sectoroptions").prev().attr("data-value", $("#sectoroptions").children("li[data-selected='true']").attr("value"));

            $("#cityoptions").tdSelect(undefined);
            $("#cityoptions").prev().attr("data-value", $("#cityoptions").children("li[data-selected='true']").attr("value"));

            $("#sectoroptions").prev(".tdSelectText").addClass("select blue");
            $("#cityoptions").prev(".tdSelectText").addClass("select blue");
        }, Sabitler.TimeOut500);
    }

    onClick(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;

        var item = target.parentNode.previousSibling;

        item.setAttribute("data-value", target.value);
    }
}