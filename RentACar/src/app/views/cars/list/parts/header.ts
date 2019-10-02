import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistheader',
    templateUrl: './header.html'
})

export class CarsListHeaderComponent {
    errorMsg: string;

    banner: string;
    @Input() carCount: string;


    header: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetPicture();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "car_list_head", 1).subscribe((resData: any) => {
            this.header = resData;

            setTimeout(() => {
                $("#carListCount").text($("#carListCount").text().replace("##", this.carCount));
            }, 500);
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_cars", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
