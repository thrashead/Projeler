import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared';

@Component({
	selector: 'admin-layout',
	templateUrl: './layoutAdmin.html'
})

export class AdminLayoutComponent {
	errorMsg: string;

	constructor(private service: SharedService, private router: Router) {
	}

	ngOnInit() {
		this.service.getLoginControl().subscribe((answer) => {
			if (answer == false) {
				this.router.navigate(['/Admin/Login']);
			}
		}, resError => this.errorMsg = resError);
	}
}
