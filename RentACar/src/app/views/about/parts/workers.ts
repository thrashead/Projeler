import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-aboutworkers',
    templateUrl: './workers.html'
})

export class AboutWorkersComponent {
    errorMsg: string;

    workers: any = {};
    workerList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
        this.GetWorkers();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "about_workers", 1).subscribe((resData: any) => {
            this.workers = resData;
        }, resError => this.errorMsg = resError);
    }

    //Workers
    GetWorkers() {
        this.service.get("Site", "GetWorkers").subscribe((resData: any) => {
            this.workerList = resData;
        }, resError => this.errorMsg = resError);
    }
}
