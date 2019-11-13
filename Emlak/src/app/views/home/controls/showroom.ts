import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: 'emlak-showroom',
    templateUrl: './showroom.html'
})

export class ShowroomComponent {
    errorMsg: string;

    @Input() vitrinIlanlarText: string;

    ilanlar: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "VitrinIlanlar", 4).subscribe((resData: any) => {
            this.ilanlar = resData;
        }, resError => this.errorMsg = resError);
    }
}