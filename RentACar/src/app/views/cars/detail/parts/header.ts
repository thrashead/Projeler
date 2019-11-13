import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-cardetailheader',
    templateUrl: './header.html'
})

export class CarsDetailHeaderComponent {
    errorMsg: string;

    banner: string;

    @Input() title;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetPicture();
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_cars", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
