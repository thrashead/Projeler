import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-sharedbooknow',
    templateUrl: './booknow.html'
})

export class SharedBookNowComponent {
    errorMsg: string;

    booknow: any = {};

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "cmn_booknow", 1).subscribe((resData: any) => {
            this.booknow = resData;
        }, resError => this.errorMsg = resError);
    }
}
