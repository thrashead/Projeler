import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { SharedService } from '../../../services/shared';
import { AdminLib } from '../../../lib/methods';
declare var DataTable;

@Component({
	templateUrl: './index.html'
})

export class AdminPropertyTIndexComponent implements OnInit, OnDestroy {
	errorMsg: string;
	PropertyTList: any;

	callTable: boolean;

	insertShow: boolean = false;
	updateShow: boolean = false;
	deleteShow: boolean = false;
	copyShow: boolean = false;

	private subscription: Subscription = new Subscription();

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

		    if (this.callTable == true) {
			    this.subscription = this.service.get("PropertyT", "Index").subscribe((answer: any) => {
				    this.PropertyTList = answer;
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
