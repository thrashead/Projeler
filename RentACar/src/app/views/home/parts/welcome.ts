import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-homewelcome',
    templateUrl: './welcome.html'
})

export class HomeWelcomeComponent {
    errorMsg: string;

    welcomebanner: string;

    welcome: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetContent();
    }

    //Content
    GetContent() {
        this.service.get("Site", "GetContentByCode", "home_welcome", 1).subscribe((resData: any) => {
            this.welcome = resData;

            this.GetPicture();
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_welcome", 1).subscribe((resData: any) => {
            this.welcomebanner = resData;
        }, resError => this.errorMsg = resError);
    }
}
