import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: 'emlak-newre',
    templateUrl: './newre.html'
})

export class NewReComponent {
    errorMsg: string;

    @Input() yeniIlanlarText: string;

    ilanlar: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "YeniIlanlar", 4).subscribe((resData: any) => {
            this.ilanlar = resData;
        }, resError => this.errorMsg = resError);
    }
}