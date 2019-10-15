﻿import { Component, AfterViewChecked } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';
import { ModelService } from "../../../services/model";

@Component({
    templateUrl: './insert.html'
})

export class AdminContentTInsertComponent implements AfterViewChecked {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.linkID = params['linkID'];
            this.service.get("ContentT", "Insert", this.linkID).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        AdminLib.ConvertToCKEditor("Description", 1500);

        this.ekleForm = this.formBuilder.group({
            ContID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            ContentName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            ShortText1: new FormControl(null),
            ShortText2: new FormControl(null),
            Description: new FormControl(null),
        });
    }

    ngAfterViewChecked() {
        $('#Description').next("div.ck").find(".ck-content").attr("data-id", "Description");
    }

    onSubmit() {
        this.data = new Object();
        this.data.ContID = this.ekleForm.get("ContID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.ContentName = this.ekleForm.get("ContentName").value;
        this.data.ShortText1 = this.ekleForm.get("ShortText1").value;
        this.data.ShortText2 = this.ekleForm.get("ShortText2").value;
        this.data.Description = AdminLib.CKValue("Description");

        this.service.post("ContentT", "Insert", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/ContentT']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            }, resError => this.errorMsg = resError);
    }
}