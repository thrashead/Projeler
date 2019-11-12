import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { LangItem } from '../../../models/LangItem';
import { Lib } from '../../../lib/methods';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'rac-aboutworkers',
    templateUrl: './workers.html'
})

export class AboutWorkersComponent {
    errorMsg: string;

    workerList: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    //Workers
    GetWorkers() {
        this.service.get("Site", "GetWorkers").subscribe((resData: any) => {
            this.workerList = resData;

            ScriptsComponent.OwlCarousel();
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
                    case "about_workers": this.langs.workers = item; break;
                }
            });

            this.GetWorkers();
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "about_workers"));
    }
}
