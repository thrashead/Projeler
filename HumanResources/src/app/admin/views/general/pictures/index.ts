import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModelService } from '../../../services/model';
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/lib';
declare var DataTable;

@Component({
	templateUrl: './index.html'
})

export class AdminPicturesIndexComponent implements OnInit, OnDestroy {
	errorMsg: string;

	callTable: boolean;

	insertShow: boolean = false;
	updateShow: boolean = false;
	deleteShow: boolean = false;
	copyShow: boolean = false;
	removeShow: boolean = false;

	private subscription: Subscription = new Subscription();

	PicturesList: any;

	constructor(private service: ModelService, private sharedService: SharedService) {
	}

	ngOnInit() {
		this.callTable = true;
		this.FillData($("#hdnType").val());
	}

	FillData(Model: any) {
		this.sharedService.getCurrentUserRights(Model).subscribe((userRights: any) => {
			this.insertShow = AdminLib.UserRight(userRights, Model, "i");
			this.updateShow = AdminLib.UserRight(userRights, Model, "u");
			this.copyShow = AdminLib.UserRight(userRights, Model, "c");
			this.deleteShow = AdminLib.UserRight(userRights, Model, "d");
			this.removeShow = AdminLib.UserRight(userRights, Model, "r");

			if (this.callTable == true) {
				this.subscription = this.service.get("Pictures", "Index").subscribe((resData: any) => {
					this.PicturesList = resData;
					this.callTable = false;
	
					setTimeout(() => {
						DataTable();
	
						$(document)
							.off("click", ".fg-button")
							.on("click", ".fg-button", () => {
								setTimeout(() => {
									this.FillData($("#hdnType").val());
								}, 1);
							});
					}, 1);
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			}
	
			setTimeout(() => {
				if ($(".dropdown-menu").first().find("a").length <= 0) {
					$(".btn-group").remove();
				}
			}, 1);
		}, resError => this.errorMsg = resError);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
