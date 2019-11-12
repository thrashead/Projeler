import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homecount',
    templateUrl: './count.html'
})

export class HomeCountComponent {
    errorMsg: string;

    countbanner: string;

    count: any;
    counter: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetContent();
    }

    //Content
    GetContent() {
        this.service.get("Site", "GetContentByCode", "home_count", 1).subscribe((resData: any) => {
            this.count = resData;

            this.GetCounter();
        }, resError => this.errorMsg = resError);
    }

    //Counter
    GetCounter() {
        this.service.get("Site", "GetCounter").subscribe((resData: any) => {
            this.counter = resData;

            this.GetPicture();
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_count", 1).subscribe((resData: any) => {
            this.countbanner = resData;
        }, resError => this.errorMsg = resError);
    }
}
