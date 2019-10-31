import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'hr-homeaccount',
    templateUrl: './account.html'
})

export class HomeAccountComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }
}
