import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistitems',
    templateUrl: './items.html'
})

export class CarsListItemsComponent {
    errorMsg: string;

    detail: string;
    registered: string;

    carCompareList: any;

    @Input() carList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var count = parseInt($("#lblCompareCount").text());

        if (target.checked) {
            if (count == 3) {
                target.checked = false;
                alert("Araç kıyaslama için maksimum 3 adet araç seçebilirsiniz.");
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

    onResize(event) {
        setTimeout(() => {
            var wrapWidth = $(".owl-wrapper").css("width");

            $(".owl-item").css("width", (parseInt(wrapWidth) / 12).toString() + "px");
        }, 500);
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_detail", 1).subscribe((resData: any) => {
            this.detail = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_rgstryr", 1).subscribe((resData: any) => {
            this.registered = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }

    //CreateCarCompareList
    CreateCarCompareList(url: string) {
        this.service.get("Site", "CreateCarCompareList", url).subscribe((resData: any) => {
            this.carCompareList = resData;
        }, resError => this.errorMsg = resError);
    }
}
