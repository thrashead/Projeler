import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-aboutwhat',
    templateUrl: './what.html'
})

export class AboutWhatComponent {
    errorMsg: string;

    picwhatprice: string;
    picwhatfleet: string;
    picwhatloan: string;

    whathead: any;
    whatprice: any;
    whatfleet: any;
    whatloan: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetPicture();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "about_what").subscribe((resData: any) => {
            this.whathead = new Object();

            resData.forEach((item, index) => {
                switch (item.ShortCode) {
                    case "head":
                        this.whathead = item;
                        break;
                    case "price":
                        this.whatprice = item;
                        break;
                    case "fleet":
                        this.whatfleet = item;
                        break;
                    case "loan":
                        this.whatloan = item;
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "about_what_price", 1).subscribe((resData: any) => {
            this.picwhatprice = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetPicturesByCode", "about_what_fleet", 1).subscribe((resData: any) => {
            this.picwhatfleet = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetPicturesByCode", "about_what_loan", 1).subscribe((resData: any) => {
            this.picwhatloan = resData;
        }, resError => this.errorMsg = resError);
    }
}
