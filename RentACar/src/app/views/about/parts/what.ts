import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-aboutwhat',
    templateUrl: './what.html'
})

export class AboutWhatComponent {
    errorMsg: string;

    picwhatprice: string;
    picwhatfleet: string;
    picwhatsafety: string;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetPicture();
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "about_what_price", 1).subscribe((resData: any) => {
            this.picwhatprice = resData;
            this.service.get("Site", "GetPicturesByCode", "about_what_fleet", 1).subscribe((resData: any) => {
                this.picwhatfleet = resData;
                this.service.get("Site", "GetPicturesByCode", "about_what_safety", 1).subscribe((resData: any) => {
                    this.picwhatsafety = resData;
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
