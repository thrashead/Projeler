import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'rac-homeworkers',
    templateUrl: './workers.html'
})

export class HomeWorkersComponent {
    errorMsg: string;

    picture: string;

    workerList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetWorkers();
    }

    //Workers
    GetWorkers() {
        this.service.get("Site", "GetWorkers").subscribe((resData: any) => {
            this.workerList = resData;

            ScriptsComponent.OwlCarousel();

            this.GetPicture();
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_reviews", 1).subscribe((resData: any) => {
            this.picture = resData;
        }, resError => this.errorMsg = resError);
    }
}
