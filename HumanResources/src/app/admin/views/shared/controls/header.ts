import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared';

@Component({
	selector: 'admin-header',
	templateUrl: './header.html'
})

export class AdminHeaderComponent {
	errorMsg: string;
	website: string = "http://localhost/HumanResources/";
	user: any;

	constructor(private service: SharedService, private router: Router) {
	}

	ngOnInit() {
		this.service.getCurrentUser().subscribe((answer: any) => {
			if (answer != null) {
				this.user = answer;
			}
		}, resError => this.errorMsg = resError);

		$('#txtMainSearch').typeahead({
			source: [
				'Kategori',
				'Şehir',
				'İçerik',
				'Dosya',
				'Galeri',
				'Log İşlemi',
				'Log',
				'Log Tipi',
				'Meta',
				'Resim',
				'Tip',
				'Kullanıcı Grubu İşlemi',
				'Kullanıcı Grubu Hakkı',
				'Kullanıcı Grubu',
				'Kullanıcı Grubu Tablosu',
				'Kullanıcı',
				'Ziyaretçi'
			],
			items: 4
		});
	}

	onClick() {
		var txtValue = $("#txtMainSearch").val();

		switch (txtValue) {
			case "Kategori":
				this.router.navigate(['/Admin/Category']);
				break;
			case "Şehir":
				this.router.navigate(['/Admin/City']);
				break;
			case "İçerik":
				this.router.navigate(['/Admin/Content']);
				break;
			case "Dosya":
				this.router.navigate(['/Admin/Files']);
				break;
			case "Galeri":
				this.router.navigate(['/Admin/Gallery']);
				break;
			case "Log İşlemi":
				this.router.navigate(['/Admin/LogProcess']);
				break;
			case "Log":
				this.router.navigate(['/Admin/Logs']);
				break;
			case "Log Tipi":
				this.router.navigate(['/Admin/LogTypes']);
				break;
			case "Meta":
				this.router.navigate(['/Admin/Meta']);
				break;
			case "Resim":
				this.router.navigate(['/Admin/Pictures']);
				break;
			case "Tip":
				this.router.navigate(['/Admin/Types']);
				break;
			case "Kullanıcı Grubu İşlemi":
				this.router.navigate(['/Admin/UserGroupProcess']);
				break;
			case "Kullanıcı Grubu Hakkı":
				this.router.navigate(['/Admin/UserGroupRights']);
				break;
			case "Kullanıcı Grubu":
				this.router.navigate(['/Admin/UserGroups']);
				break;
			case "Kullanıcı Grubu Tablosu":
				this.router.navigate(['/Admin/UserGroupTables']);
				break;
			case "Kullanıcı":
				this.router.navigate(['/Admin/Users']);
				break;
			case "Ziyaretçi":
				this.router.navigate(['/Admin/Visitors']);
				break;
			default:
				alert("Aradığınız kelimeye uygun sonuç bulunamadı...");
				break;
		}
	}

	onLogout() {
		this.service.getLogout().subscribe((answer: any) => {
			if (answer == true) {
				this.router.navigate(['/Admin/Login']);
			}
		}, resError => this.errorMsg = resError);
	}

	onKeyPress(event: any) {
		if (event.keyCode == "13") {
			this.onClick();
		}
	}
}
