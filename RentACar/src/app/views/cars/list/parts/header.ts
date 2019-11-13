import { Component, Input } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistheader',
    templateUrl: './header.html'
})

export class CarsListHeaderComponent {
    errorMsg: string;

    banner: string;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        setTimeout(() => {
            $("#carListCount").html($("#carListCount").html().replace("##", "<span id=\"spnCarCount\"></span>"));
        }, 1000);

        this.GetPicture();
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_cars", 1).subscribe((resData: any) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
}
