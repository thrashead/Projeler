﻿import { Component, AfterViewChecked } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import * as $ from 'jquery';
import ClassicEditor from "../../../../../../Content/admin/js/ckeditor/ckeditor.js";

@Component({
	templateUrl: './update.html'
})

export class AdminLangContentTUpdateComponent implements AfterViewChecked {
	errorMsg: string;
	id: string;

	updateForm: FormGroup;
	data: any;

	model: any;

	callTable: boolean;

	private subscription: Subscription = new Subscription();

	constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.data = new Object();

		this.callTable = true;
		this.FillData();

		setTimeout(function () {
			ClassicEditor
				.create(document.querySelector('#Description'), {
				})
				.then(editor => {
					console.log(editor);
				});

            ClassicEditor
                .create(document.querySelector('#Description2'), {
                })
                .then(editor => {
                    console.log(editor);
                });
        }, 1500);

		this.updateForm = this.formBuilder.group({
			ID: new FormControl(null, [Validators.required, Validators.min(0)]),
			LangContentID: new FormControl(null, [Validators.required, Validators.min(0)]),
			TransID: new FormControl(null, [Validators.required, Validators.min(0)]),
			ShortDescription: new FormControl(null),
            Description: new FormControl(null),
            ShortDescription2: new FormControl(null),
            Description2: new FormControl(null),
		});
    }

    ngAfterViewChecked() {
        $('#Description').next("div.ck").find(".ck-content").attr("data-id", "Description");
        $('#Description2').next("div.ck").find(".ck-content").attr("data-id", "Description2");
    }

	FillData() {
		if (this.callTable == true) {
			this.route.params.subscribe((params: Params) => {
				this.id = params['id'];
				this.subscription = this.service.get("LangContentT", "Update", this.id).subscribe((answer: any) => {
					this.model = answer;
					this.callTable = false;
				}, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
			});
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	onSubmit() {
		this.data.ID = this.updateForm.get("ID").value;
		this.data.LangContentID = this.updateForm.get("LangContentID").value;
		this.data.TransID = this.updateForm.get("TransID").value;
		this.data.ShortDescription = this.updateForm.get("ShortDescription").value;
        this.data.Description = $(".ck-content[data-id='Description']").html().replace("<p>", "").replace("</p>", "");
        this.data.ShortDescription2 = this.updateForm.get("ShortDescription2").value;
        this.data.Description2 = $(".ck-content[data-id='Description2']").html().replace("<p>", "").replace("</p>", "");

		this.service.post("LangContentT", "Update", this.data)
			.subscribe((answer: any) => {
				if (answer.Mesaj == null) {
					this.router.navigate(['/Admin/LangContentT']);
				}
				else {
					$(".alertMessage").text(answer.Mesaj);
					$(".alert-error").fadeIn("slow");
				}
			},
				resError => this.errorMsg = resError);
	}
}
