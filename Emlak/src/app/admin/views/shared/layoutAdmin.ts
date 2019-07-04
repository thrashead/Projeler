import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared';

@Component({
    selector: 'admin-layout',
    templateUrl: './layoutAdmin.html',
    providers: [SharedService]
})

export class AdminLayoutComponent {
    errorMsg: string;

    constructor(private router: Router, private service: SharedService) {
    }

    ngOnInit() {
        this.service.getLoginControl().subscribe((resData) => {
            if (resData == false) {
                window.location.href = '/Emlak/';
            }
        }, resError => this.errorMsg = resError);
    }
}
