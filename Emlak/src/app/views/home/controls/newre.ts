import { Component, Input } from "@angular/core";
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: 'emlak-newre',
    templateUrl: './newre.html'
})

export class NewReComponent {
    errorMsg: string;

    @Input() yeniIlanlarText: string;

    ilanlar: any;

    constructor(private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getYeniIlanlar("4")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);
    }
}