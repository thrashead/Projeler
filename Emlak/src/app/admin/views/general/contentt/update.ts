﻿import { Component, AfterViewChecked } from "@angular/core";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';

@Component({
    templateUrl: './update.html'
})

export class AdminContentTUpdateComponent implements AfterViewChecked {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.get("ContentT", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        AdminLib.ConvertToCKEditor("Description", 1500);

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            ContID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            ContentName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            ShortText1: new FormControl(null),
            ShortText2: new FormControl(null),
            Description: new FormControl(null),
        });
    }

    ngAfterViewChecked() {
        $("#Description").next("div.ck").find(".ck-content").attr("data-id", "Description");
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.ContID = this.duzenleForm.get("ContID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.ContentName = this.duzenleForm.get("ContentName").value;
        this.data.ShortText1 = this.duzenleForm.get("ShortText1").value;
        this.data.ShortText2 = this.duzenleForm.get("ShortText2").value;
        this.data.Description = AdminLib.CKValue("Description");

        this.service.post("ContentT", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/ContentT']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}