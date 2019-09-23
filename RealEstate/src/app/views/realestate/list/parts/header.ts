import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 're-carlistheader',
    templateUrl: './header.html'
})

export class REListHeaderComponent {
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
        this.service.get("Site", "GetLangContentByCode", "car_list_head", 1).subscribe((resData: any) => {
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
