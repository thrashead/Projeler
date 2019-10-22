import { Component, Input } from "@angular/core";
import { EmlakAjaxService } from "../../../services/emlakajax";
import { SolAjaxService } from '../../../services/solajax';
import { HomeAjaxService } from '../../../services/homeajax';

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

    constructor(private _emlakService: EmlakAjaxService, private _homeService: HomeAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._homeService.getVitrinIlanlar("3")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);

        this._solService.getHaberler()
            .subscribe(resData => this.haberler = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getIcerikGetir("Yasal-Uyari")
            .subscribe(resData => this.yasalUyari = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getIcerikGetir("Iletisim")
            .subscribe(resData => this.iletisim = resData,
                resError => this.errorMsg = resError);
    }
}