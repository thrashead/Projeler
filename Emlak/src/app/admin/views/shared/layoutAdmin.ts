import { Component } from '@angular/core';
import { SharedService } from '../../services/shared';

@Component({
    selector: 'admin-layout',
    templateUrl: './layoutAdmin.html'
})

export class AdminLayoutComponent {
    errorMsg: string;

    constructor(private service: SharedService) {
    }

    ngOnInit() {
        this.service.getLoginControl().subscribe((resData) => {
            if (resData == false) {
                window.location.href = '/Emlak/';
            }
        }, resError => this.errorMsg = resError);
    }
}
