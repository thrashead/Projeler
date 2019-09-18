import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-sharedcallus',
    templateUrl: './callus.html'
})

export class SharedCallUsComponent {
    errorMsg: string;

    phone: string;
    callus: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCodeAndShortCode", "cntct_form", "phone", 1).subscribe((resData: any) => {
            this.phone = resData.Description;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_callus", 1).subscribe((resData: any) => {
            this.callus = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }
}
