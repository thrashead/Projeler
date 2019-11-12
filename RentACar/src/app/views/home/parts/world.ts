import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';

@Component({
    selector: 'rac-homeworld',
    templateUrl: './world.html'
})

export class HomeWorldComponent {
    errorMsg: string;

    worldbanner: string;

    worldList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
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

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "home_world": this.langs.world = item; break;
                    case "cmn_readmore": this.langs.readmore = item.ShortDescription; break;
                }
            });

            this.GetBlog();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "home_world"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_readmore"));
    }
}
