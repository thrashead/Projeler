import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-aboutbest',
    templateUrl: './best.html'
})

export class AboutBestComponent {
    errorMsg: string;

    gotolist: string;
    picbest: string;

    best: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetPicture();
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "about_best", 1).subscribe((resData: any) => {
            this.picbest = resData;
        }, resError => this.errorMsg = resError);
    }
}
