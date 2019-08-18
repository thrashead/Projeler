import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminPicturesInsertComponent {
    errorMsg: string;
    newFile: string;

    ekleForm: FormGroup;
    data: any;
    uploadData: any;

    model: any;

    constructor(private service: ModelService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Description: new FormControl(null),
            PictureUrl: new FormControl(null, [Validators.required, Validators.minLength(1)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    }

    onSubmit() {
        this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);

        this.service.post("Pictures", "InsertUpload", this.uploadData)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.data = new Object();
                    this.data.Title = this.ekleForm.get("Title").value;
                    this.data.Description = this.ekleForm.get("Description").value;
                    this.data.PictureUrl = answer.PictureUrl;
                    this.data.ThumbUrl = answer.ThumbUrl;
                    this.data.Code = this.ekleForm.get("Code").value;
                    this.data.Active = this.ekleForm.get("Active").value;

                    this.service.post("Pictures", "Insert", this.data)
                        .subscribe((answer2: any) => {
                            if (answer2.Mesaj == null) {
                                this.router.navigate(['/Admin/Pictures']);
                            }
                            else {
                                $(".alertMessage").text(answer2.Mesaj);
                                $(".alert-error").fadeIn("slow");
                            }
                        },
                            resError => this.errorMsg = resError);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}