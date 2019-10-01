import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-sharedbooknow',
    templateUrl: './booknow.html'
})

export class SharedBookNowComponent {
    errorMsg: string;

    banner: string;

    booknow: any = {};

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetPicture();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_booknow", 1).subscribe((resData: any) => {
            this.booknow = resData;
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "car_book_banner", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
