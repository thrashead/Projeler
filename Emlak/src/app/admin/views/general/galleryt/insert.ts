﻿import { Component, AfterViewChecked } from "@angular/core";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';

@Component({
    templateUrl: './insert.html'
})

export class AdminGalleryTInsertComponent implements AfterViewChecked {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe(() => {
            this.route.params.subscribe((params: Params) => {
                this.linkID = params['linkID'];
                this.service.get("GalleryT", "Insert", this.linkID).subscribe((resData: any) => {
                    this.model = resData;
                }, resError => this.errorMsg = resError);
            });
        });

        AdminLib.ConvertToCKEditor("Description", 1500);

        this.ekleForm = this.formBuilder.group({
            GalID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GalleryName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
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
        this.data.GalID = this.ekleForm.get("GalID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.GalleryName = this.ekleForm.get("GalleryName").value;
        this.data.ShortText1 = this.ekleForm.get("ShortText1").value;
        this.data.ShortText2 = this.ekleForm.get("ShortText2").value;
        this.data.Description = AdminLib.CKValue("Description");

        this.service.post("GalleryT", "Insert", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/GalleryT']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}