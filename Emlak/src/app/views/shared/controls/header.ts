import { Component, Input } from "@angular/core";
import { SiteService } from '../../../services/site';

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

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.service.get("Site","GetLangs")
            .subscribe(resData => this.diller = resData,
                resError => this.errorMsg = resError);
    }

    onClick(lang: string) {
        if (lang != undefined) {
            this.service.get("Site", "ChangeLang", lang)
                .subscribe((resData: any) => {
                    if (resData == true) {
                        window.location.reload();
                    }
                },
                    resError => this.errorMsg = resError);
        }
    }
}