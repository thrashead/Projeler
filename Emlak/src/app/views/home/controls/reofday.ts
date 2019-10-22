import { Component, Input } from "@angular/core";
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: 'emlak-reofday',
    templateUrl: './reofday.html'
})

export class ReOfDayComponent {
    errorMsg: string;

    @Input() gununIlaniText: string;

    emlak: any;

    constructor(private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getGununIlani()
            .subscribe(resData => this.emlak = resData,
                resError => this.errorMsg = resError);
    }
}