import { Component } from "@angular/core";
import { EmlakAjaxService } from "../../../services/emlakajax";
import { SharedService } from '../../../admin/services/shared';

@Component({
    selector: "emlak-header",
    templateUrl: './header.html'
})

export class HeaderComponent {
    errorMsg: string;

    diller: any;

    constructor(private service: SharedService, private emlakService: EmlakAjaxService) {
    }

    ngOnInit() {
        this.emlakService.getLangs()
            .subscribe(resData => this.diller = resData,
                resError => this.errorMsg = resError);

        this.KodlaGetir();
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

    //KodlaGetir
    KodlaGetir() {
    }
}