import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'hr-homecompanies',
    templateUrl: './companies.html'
})

export class HomeCompaniesComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }
}
