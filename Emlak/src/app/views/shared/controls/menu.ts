import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../../services/emlakajax";
import { SharedService } from '../../../admin/services/shared';
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: "emlak-headermenu",
    templateUrl: './menu.html'
})

export class HeaderMenuComponent {
    errorMsg: string;

    anaSayfaText: string;
    hakkimizdaText: string;
    iletisimText: string;

    ilanlarText: string;
    kategorilerText: string;
    iceriklerText: string;
    tumilanText: string;
    yeniilanText: string;
    satilikilanText: string;
    kiralikilanText: string;
    girisText: string;

    kategoriMenu: any;
    sayfalar: any;

    constructor(private service: SharedService, private emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getKategoriMenu()
            .subscribe(resData => this.kategoriMenu = resData,
                resError => this.errorMsg = resError);

        this._solService.getSayfalar()
            .subscribe(resData => this.sayfalar = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
    }

    //KodlaGetir
    KodlaGetir() {
        this.emlakService.getKodlaGetir("mnpg")
            .subscribe(resData => this.anaSayfaText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("abus")
            .subscribe(resData => this.hakkimizdaText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("cont")
            .subscribe(resData => this.iletisimText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("ilan")
            .subscribe(resData => this.ilanlarText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("alli")
            .subscribe(resData => this.tumilanText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("newi")
            .subscribe(resData => this.yeniilanText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("stlk")
            .subscribe(resData => this.satilikilanText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("krlk")
            .subscribe(resData => this.kiralikilanText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("ctgs")
            .subscribe(resData => this.kategorilerText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("cnts")
            .subscribe(resData => this.iceriklerText = resData,
                resError => this.errorMsg = resError);

        this.emlakService.getKodlaGetir("entr")
            .subscribe(resData => this.girisText = resData,
                resError => this.errorMsg = resError);
    }
}