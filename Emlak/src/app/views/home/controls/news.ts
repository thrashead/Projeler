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
            .subscribe((resData: any) => {
                const length = Math.ceil(resData.length / 3);

                this.haberler = Array.from({ length }).map((x, j) => ({
                    Items: resData.filter((y, i) => i >= 3 * j && i < 3 * (j + 1))
                }));
            }, resError => this.errorMsg = resError);
    }
}