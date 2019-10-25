import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: "emlak-contentrelist",
    templateUrl: './relist.html'
})

export class ContentReListComponent {
    errorMsg: string;

    @Input() ilanlarText: string;

    ilanlar: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "VitrinIlanlar", 5)
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);
    }
}