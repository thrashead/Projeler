import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'rac-homefeatured',
    templateUrl: './featured.html'
})
    
export class HomeFeaturedComponent {
    errorMsg: string;

    carList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetShowroom();
    }

    //GetShowroom
    GetShowroom() {
        this.service.get("Site", "GetShowroom", 8).subscribe((resData: any) => {
            this.carList = resData;

            ScriptsComponent.OwlCarousel(2500);

        }, resError => this.errorMsg = resError);
    }
}
