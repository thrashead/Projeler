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
        this.service.get("Site", "VitrinIlanlar", 3).subscribe((resData: any) => {
            this.ilanlar = resData;

            this.service.get("Site", "Haberler").subscribe((resData: any) => {
                this.haberler = resData;

                this.service.get("Site", "IcerikGetir", "Yasal-Uyari").subscribe((resData: any) => {
                    this.yasalUyari = resData;

                    this.service.get("Site", "IcerikGetir", "Iletisim").subscribe((resData: any) => {
                        this.iletisim = resData;
                    }, resError => this.errorMsg = resError);
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}