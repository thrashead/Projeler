import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-footer',
    templateUrl: './footer.html'
})

export class FooterComponent {
    errorMsg: string;

    carList: any;
    socialList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLastCars();
    }

    //GetLastCars
    GetLastCars() {
        this.service.get("Site", "GetLastCars", 3).subscribe((resData: any) => {
            this.carList = resData;

            this.GetNoLangContent();
        }, resError => this.errorMsg = resError);
    }

    //GetNoLangContent
    GetNoLangContent() {
        this.service.get("Site", "GetNoLangContentByCode", "social").subscribe((resData: any) => {
            this.socialList = resData;
        }, resError => this.errorMsg = resError);
    }
}
