import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../../services/emlakajax";
import { SolAjaxService } from '../../../services/solajax';
import { HomeAjaxService } from '../../../services/homeajax';

@Component({
    selector: "emlak-footer",
    templateUrl: './footer.html'
})

export class FooterComponent {
    errorMsg: string;

    kategoriler: any;
    haberler: any;

    anaSayfaText: string;
    yeniIlanlarText: string;
    tumIlanlarText: string;
    hakkimizdaText: string;
    iletisimText: string;
    haberlerText: string;
    hizlilinkText: string;
    ilanlarText: string;

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

        this.KodlaGetir();
    }

    //KodlaGetir
    KodlaGetir() {
        this._emlakService.getKodlaGetir("news")
            .subscribe(resData => this.haberlerText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("qklk")
            .subscribe(resData => this.hizlilinkText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("mnpg")
            .subscribe(resData => this.anaSayfaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("ilan")
            .subscribe(resData => this.ilanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("newi")
            .subscribe(resData => this.yeniIlanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("alli")
            .subscribe(resData => this.tumIlanlarText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("abus")
            .subscribe(resData => this.hakkimizdaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("cont")
            .subscribe(resData => this.iletisimText = resData,
                resError => this.errorMsg = resError);
    }
}