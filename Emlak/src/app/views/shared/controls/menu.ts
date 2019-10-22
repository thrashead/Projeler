import { Component, Input } from "@angular/core";
import { SolAjaxService } from '../../../services/solajax';

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

    constructor(private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getKategoriMenu()
            .subscribe(resData => this.kategoriMenu = resData,
                resError => this.errorMsg = resError);

        this._solService.getSayfalar()
            .subscribe(resData => this.sayfalar = resData,
                resError => this.errorMsg = resError);
    }
}