import { Component, Input } from "@angular/core";
import { HomeAjaxService } from '../../../services/homeajax';

@Component({
    selector: 'emlak-showroom',
    templateUrl: './showroom.html'
})

export class ShowroomComponent {
    errorMsg: string;

    @Input() vitrinIlanlarText: string;

    ilanlar: any;

    constructor(private _homeService: HomeAjaxService) {
    }

    ngOnInit() {
        this._homeService.getVitrinIlanlar("4")
            .subscribe(resData => this.ilanlar = resData,
                resError => this.errorMsg = resError);
    }
}