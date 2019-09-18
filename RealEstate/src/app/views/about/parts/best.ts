import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-aboutbest',
    templateUrl: './best.html'
})

export class AboutBestComponent {
    errorMsg: string;

    gotolist: string;
    picbest: string;

    best: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetPicture();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_go_list", 1).subscribe((resData: any) => {
            this.gotolist = resData.ShortDescription;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "about_best", 1).subscribe((resData: any) => {
            this.best = resData;
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "about_best", 1).subscribe((resData: any) => {
            this.picbest = resData;
        }, resError => this.errorMsg = resError);
    }
}
