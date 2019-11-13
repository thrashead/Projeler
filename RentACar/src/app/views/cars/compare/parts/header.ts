import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carcompareheader',
    templateUrl: './header.html'
})

export class CarsCompareHeaderComponent {
    errorMsg: string;

    banner: string;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetPicture();
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_compare", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
