import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';
import { Router } from '@angular/router';

@Component({
    selector: 'rac-cardetailrelated',
    templateUrl: './related.html'
})

export class CarsDetailRelatedComponent {
    errorMsg: string;

    carList: any;

    @Input() langs: any;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
        this.GetSimilarCarsByUrl();
    }

    //GetSimilarCarsByUrl
    GetSimilarCarsByUrl() {
        let carUrl = this.router.url.split('/')[this.router.url.split('/').length - 1];

        this.service.get("Site", "GetSimilarCarsByUrl", carUrl, 4, true).subscribe((resData: any) => {
            this.carList = resData;
        }, resError => this.errorMsg = resError);
    }
}
