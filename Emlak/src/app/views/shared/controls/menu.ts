import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: "emlak-headermenu",
    templateUrl: './menu.html'
})

export class HeaderMenuComponent {
    errorMsg: string;

    kategoriMenu: any;
    sayfalar: any;

    @Input() anaSayfaText: string;
    @Input() hakkimizdaText: string;
    @Input() iletisimText: string;
    @Input() yeniilanText: string;
    @Input() tumilanText: string;
    @Input() haberlerText: string;
    @Input() ilanlarText: string;
    @Input() kategorilerText: string;
    @Input() iceriklerText: string;
    @Input() satilikilanText: string;
    @Input() kiralikilanText: string;
    @Input() girisText: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "KategoriMenu").subscribe((resData: any) => {
            this.kategoriMenu = resData;

            this.service.get("Site", "Sayfalar").subscribe((resData: any) => {
                this.sayfalar = resData;
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}