import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 're-carbookingheader',
    templateUrl: './header.html'
})

export class REBookingHeaderComponent {
    errorMsg: string;

    banner: string;

    header: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetPicture();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "car_book_head", 1).subscribe((resData: any) => {
            this.header = resData;
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_list", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
