import { Component } from '@angular/core';
import { SharedService } from '../../services/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-layout',
    templateUrl: './layoutAdmin.html'
})

export class AdminLayoutComponent {
    errorMsg: string;

    constructor(private service: SharedService, private router: Router) {
    }

    ngOnInit() {
        this.service.getLoginControl().subscribe((resData: any) => {
            if (resData == false) {
                this.router.navigate(['/Admin/Login']);
            }
        }, resError => this.errorMsg = resError);
    }
}
