import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-carlistitems',
    templateUrl: './items.html'
})

export class CarsListItemsComponent {
    errorMsg: string;

    carCompareList: any;

    @Input() carList: any;

    firstCheck: boolean;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.firstCheck = true;
        this.SetLangContents();
    }

    onChange($event) {
        var target = $event.target || $event.srcElement || $event.currentTarget;
        var count = parseInt($("#lblCompareCount").text());

        if (target.checked) {
            if (count == 3) {
                target.checked = false;
                alert("Araç kıyaslama için en fazla 3 adet araç seçebilirsiniz.");
                return;
            }

            this.CreateCarCompareList(target.attributes["data-url"].value);

            count++;
        }
        else {
            this.CreateCarCompareList(target.attributes["data-url"].value);

            count--;
        }

        $("#lblCompareCount").text(count.toString());
    }

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_detail": this.langs.detail = item.ShortDescription; break;
                    case "cmn_rgstryr": this.langs.registered = item.ShortDescription2; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_rgstryr"));
    }

    //CarCompareList
    CreateCarCompareList(url: string) {
        if (this.firstCheck) {
            this.service.get("Site", "ClearCarCompareList").subscribe((resData: any) => {
                this.firstCheck = false;

                this.service.get("Site", "CreateCarCompareList", url).subscribe((resData: any) => {
                    this.carCompareList = resData;
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }
        else {
            this.service.get("Site", "CreateCarCompareList", url).subscribe((resData: any) => {
                this.carCompareList = resData;
            }, resError => this.errorMsg = resError);
        }
    }
}
