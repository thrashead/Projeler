import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

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
        this.GetPicture();
    }

    //Workers
    GetWorkers() {
        this.service.get("Site", "GetWorkers").subscribe((resData: any) => {
            this.workerList = resData;
        }, resError => this.errorMsg = resError);
    }

    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "home_reviews", 1).subscribe((resData: any) => {
            this.picture = resData;
        }, resError => this.errorMsg = resError);
    }
}
