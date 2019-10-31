import { Component } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'hr-respheader',
    templateUrl: './header.html'
})

export class RespHeaderComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }
}
