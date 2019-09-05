import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homereview',
    templateUrl: './review.html'
})

export class HomeReviewComponent {
    errorMsg: string;

    picture: string;

    ReviewList: {};

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetContent();
        this.GetPicture();
    }

    //Content
    GetContent() {
        this.service.get("Site", "GetContentByCode", "home_reviews", 3).subscribe((resData: any) => {
            this.ReviewList = resData;
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_reviews", 1).subscribe((resData: any) => {
            this.picture = resData;
        }, resError => this.errorMsg = resError);
    }
}
