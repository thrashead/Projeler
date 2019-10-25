import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: 'emlak-reofday',
    templateUrl: './reofday.html'
})

export class ReOfDayComponent {
    errorMsg: string;

    @Input() gununIlaniText: string;

    emlak: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "GununIlani")
            .subscribe(resData => this.emlak = resData,
                resError => this.errorMsg = resError);
    }
}