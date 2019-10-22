import { Component, Input } from "@angular/core";
import { EmlakAjaxService } from "../../../services/emlakajax";

@Component({
    selector: "emlak-header",
    templateUrl: './header.html'
})

export class HeaderComponent {
    errorMsg: string;

    diller: any;

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

    constructor(private emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this.emlakService.getLangs()
            .subscribe(resData => this.diller = resData,
                resError => this.errorMsg = resError);
    }

    onClick(lang: string) {
        if (lang != undefined) {
            this.emlakService.chanegeLang(lang)
                .subscribe((resData: any) => {
                    if (resData == true) {
                        window.location.reload();
                    }
                },
                    resError => this.errorMsg = resError);
        }
    }
}