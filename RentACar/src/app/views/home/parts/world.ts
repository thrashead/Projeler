import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homeworld',
    templateUrl: './world.html'
})

export class HomeWorldComponent {
    errorMsg: string;

    worldbanner: string;

    worldList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetBlog();
    }

    //GetBlog
    GetBlog() {
        this.service.get("Site", "GetBlogPostsByCode", "home_world", 3).subscribe((resData: any) => {
            this.worldList = resData;

            this.GetPicture();
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_world", 1).subscribe((resData: any) => {
            this.worldbanner = resData;
        }, resError => this.errorMsg = resError);
    }
}
