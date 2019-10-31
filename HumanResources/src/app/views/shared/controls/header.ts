import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'hr-header',
    templateUrl: './header.html'
})

export class HeaderComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }
}
