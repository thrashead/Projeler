import { Component, Input } from "@angular/core";
import { EmlakAjaxService } from '../../../services/emlakajax';
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: 'emlak-about',
    templateUrl: './about.html'
})

export class AboutComponent {
    errorMsg: string;

    sayac: string;

    @Input() ziyaretciText: string;
    @Input() hakkimizdaText: string;
    @Input() devamText: string;

    about: any;

    constructor(private _emlakService: EmlakAjaxService, private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getSayac()
            .subscribe(resData => this.sayac = resData.toString(),
                resError => this.errorMsg = resError);

        this._emlakService.getIcerikGetir("Hakkimizda")
            .subscribe(resData => this.about = resData,
                resError => this.errorMsg = resError);
    }
}