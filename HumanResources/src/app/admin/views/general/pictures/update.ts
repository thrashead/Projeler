import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminPicturesUpdateComponent {
    errorMsg: string;
    newFile: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;
    uploadData: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.get("Pictures", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
            Description: new FormControl(null),
            PictureUrl: new FormControl(null, [Validators.required, Validators.minLength(1)]),
            ThumbUrl: new FormControl(null, [Validators.required, Validators.minLength(1)]),
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

        this.service.post("Pictures", "UpdateUpload", this.uploadData)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.data = new Object();
                    this.data.ID = this.duzenleForm.get("ID").value;
                    this.data.Title = this.duzenleForm.get("Title").value;
                    this.data.Description = this.duzenleForm.get("Description").value;
                    this.data.OldPictureUrl = this.duzenleForm.get("PictureUrl").value;
                    this.data.OldThumbUrl = this.duzenleForm.get("ThumbUrl").value;
                    this.data.HasFile = answer.HasFile;

                    if (answer.HasFile) {
                        this.data.PictureUrl = answer.PictureUrl;
                        this.data.ThumbUrl = answer.ThumbUrl;
                    }
                    else {
                        this.data.PictureUrl = this.duzenleForm.get("PictureUrl").value;
                        this.data.ThumbUrl = this.duzenleForm.get("ThumbUrl").value;
                    }

                    this.data.Code = this.duzenleForm.get("Code").value;
                    this.data.Active = this.duzenleForm.get("Active").value;

                    this.service.post("Pictures", "Update", this.data)
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