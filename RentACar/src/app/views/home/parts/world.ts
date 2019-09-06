import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homeworld',
    templateUrl: './world.html'
})

export class HomeWorldComponent {
    errorMsg: string;

    readmore: string;

    world: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
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
}
