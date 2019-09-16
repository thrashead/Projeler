import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homeworld',
    templateUrl: './world.html'
})

export class HomeWorldComponent {
    errorMsg: string;

    readmore: string;
    worldbanner: string;

    world: any;
    worldList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetPicture();
        this.GetBlog();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "home_world", 1).subscribe((resData: any) => {
            this.world = resData;
        }, resError => this.errorMsg = resError);

        this.service.get("Site", "GetLangContentByCode", "cmn_readmore", 1).subscribe((resData: any) => {
            this.readmore = resData.ShortDescription;
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_world", 1).subscribe((resData: any) => {
            this.worldbanner = resData;
        }, resError => this.errorMsg = resError);
    }

    //GetBlog
    GetBlog() {
        this.service.get("Site", "GetBlogPostsByCode", "home_world", 3).subscribe((resData: any) => {
            this.worldList = resData;
        }, resError => this.errorMsg = resError);
    }
}
