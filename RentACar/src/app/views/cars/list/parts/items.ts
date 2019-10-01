import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistitems',
    templateUrl: './items.html'
})

export class CarsListItemsComponent {
    errorMsg: string;

    detail: string;
    registered: string;

    carList: any;
    carCompareList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetCarList();
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

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_detail", 1).subscribe((resData: any) => {
            this.detail = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_rgstryr", 1).subscribe((resData: any) => {
            this.registered = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }

    //CarList
    GetCarList() {
        this.service.get("Site", "GetCarList").subscribe((resData: any) => {
            const length = Math.ceil(resData.length / 6);
            this.carList = Array.from({ length }).map((x, j) => ({
                Cars: resData.filter((y, i) => i >= 6 * j && i < 6 * (j + 1))
            }));

            $("#carListCount").text($("#carListCount").text().replace("##", resData.length.toString()));
        }, resError => this.errorMsg = resError);
    }

    //CreateCarCompareList
    CreateCarCompareList(url: string) {
        this.service.get("Site", "CreateCarCompareList", url).subscribe((resData: any) => {
            this.carCompareList = resData;
        }, resError => this.errorMsg = resError);
    }
}
