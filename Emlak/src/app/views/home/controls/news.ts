import { Component, Input } from "@angular/core";
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: 'emlak-news',
    templateUrl: './news.html'
})

export class NewsComponent {
    errorMsg: string;

    @Input() haberlerText: string;
    @Input() devamText: string;

    haberler: any;

    constructor(private _solService: SolAjaxService) {
    }

    ngOnInit() {
        this._solService.getHaberler()
            .subscribe(resData => this.haberler = resData,
                resError => this.errorMsg = resError);
    }
}