import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-header',
    templateUrl: './header.html'
})

export class HeaderComponent {
    paneladdress: string = "http://localhost/RentACar/Admin";
    errorMsg: string;

    flag: any = {};

    LangList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangs();
    }

    //Translation
    GetLangs() {
        this.service.get("Site", "GetLangs").subscribe((resData: any) => {
            this.LangList = resData;

            this.service.get("Site", "SelectedLang").subscribe((resData: any) => {
                this.flag = resData;
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }

    OnLangSelect(id) {
        this.service.get("Site", "SelectLang", id).subscribe((resData: any) => {
            if (resData == true) {
                window.location.reload();
            }
        }, resError => this.errorMsg = resError);
    }
}
