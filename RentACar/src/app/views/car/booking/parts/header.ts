import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carbookingheader',
    templateUrl: './header.html'
})

export class CarBookingHeaderComponent {
    errorMsg: string;

    header: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "car_book_head", 1).subscribe((resData: any) => {
            this.header = resData;
        }, resError => this.errorMsg = resError);
    }
}
