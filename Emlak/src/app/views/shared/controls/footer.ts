import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

@Component({
    selector: "emlak-footer",
    templateUrl: './footer.html'
})

export class FooterComponent {
    errorMsg: string;

    @Input() anaSayfaText: string;
    @Input() hakkimizdaText: string;
    @Input() iletisimText: string;
    @Input() yeniilanText: string;
    @Input() tumilanText: string;
    @Input() haberlerText: string;
    @Input() ilanlarText: string;
    @Input() hizlilinkText: string;

    kategoriler: any;
    haberler: any;

    yasalUyari: any;
    ilanlar: any;
    iletisim: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site", "VitrinIlanlar", 3)
        .subscribe(resData => this.ilanlar = resData,
            resError => this.errorMsg = resError);

        this.service.get("Site", "Haberler")
            .subscribe(resData => this.haberler = resData,
                resError => this.errorMsg = resError);

        this.service.get("Site", "IcerikGetir", "Yasal-Uyari")
            .subscribe(resData => this.yasalUyari = resData,
                resError => this.errorMsg = resError);

        this.service.get("Site", "IcerikGetir", "Iletisim")
            .subscribe(resData => this.iletisim = resData,
                resError => this.errorMsg = resError);
    }
}