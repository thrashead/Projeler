import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'rac-aboutworkers',
    templateUrl: './workers.html'
})

export class AboutWorkersComponent {
    errorMsg: string;

    workerList: any;

    @Input() langs: any;

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
        }, resError => this.errorMsg = resError);
    }
}
