import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: 'emlak-about',
    templateUrl: './about.html'
})

export class AboutComponent {
    errorMsg: string;

    sayac: string;

    @Input() ziyaretciText: string;
    @Input() hakkimizdaText: string;
    @Input() devamText: string;

    about: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "IcerikGetir", "Hakkimizda").subscribe((resData: any) => {
            this.about = resData;

            this.service.get("Site", "Sayac").subscribe((resData: any) => {
                this.sayac = resData.toString();
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}