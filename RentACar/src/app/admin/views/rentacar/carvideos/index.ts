import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
declare var DataTable;

@Component({
	templateUrl: './index.html'
})

export class AdminCarVideosIndexComponent implements OnInit, OnDestroy {
	errorMsg: string;
	CarVideosList: any;

	callTable: boolean;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService) {
	}

	ngOnInit() {
		this.callTable = true;
		this.FillData();
	}

	FillData() {
		if (this.callTable == true) {
			this.subscription = this.service.get("CarVideos", "Index").subscribe((answer: any) => {
				this.CarVideosList = answer;
				this.callTable = false;

				setTimeout(() => {
					DataTable();

					$(document)
						.off("click", ".fg-button")
						.on("click", ".fg-button", () => {
							setTimeout(() => {
								this.FillData();
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
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
