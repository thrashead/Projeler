import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homecount',
    templateUrl: './count.html'
})

export class HomeCountComponent {
    errorMsg: string;

    count: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetContent();
    }

    //Content
    GetContent() {
        this.service.get("Site", "GetContentByCode", "home_count", 1).subscribe((resData: any) => {
            this.count = resData;
        }, resError => this.errorMsg = resError);
    }
}
