import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'hr-respmenu',
    templateUrl: './menu.html'
})

export class RespMenuComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }
}
