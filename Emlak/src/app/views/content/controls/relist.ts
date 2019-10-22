import { Component, Input } from "@angular/core";
import { HomeAjaxService } from '../../../services/homeajax';

@Component({
    selector: "emlak-contentrelist",
    templateUrl: './relist.html'
})

export class ContentReListComponent {
    errorMsg: string;

    @Input() ilanlarText: string;

    ilanlar: any;

    constructor(private homeService: HomeAjaxService) {
    }

    ngOnInit() {
        this.homeService.getVitrinIlanlar("5")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);
    }
}