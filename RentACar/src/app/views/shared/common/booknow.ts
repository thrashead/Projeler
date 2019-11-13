import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-sharedbooknow',
    templateUrl: './booknow.html'
})

export class SharedBookNowComponent {
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
        this.service.get("Site", "GetPicturesByCode", "car_book_banner", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
