import { Component } from "@angular/core";
import { DosyaService } from "../../services/dosya";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './duzenle.html',
    providers: [DosyaService]
})

export class AdminDosyaDuzenleComponent {
    errorMsg: string;
    newFile: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;
    uploadData: any;

    model: any;

    constructor(private service: DosyaService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.getDuzenle(this.id).subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            FileUrl: new FormControl(null, [Validators.required, Validators.minLength(3)]),
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

        this.service.postDuzenleYukle(this.uploadData)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.data = new Object();
                    this.data.ID = this.duzenleForm.get("ID").value;
                    this.data.Title = this.duzenleForm.get("Title").value;
                    this.data.Description = this.duzenleForm.get("Description").value;
                    this.data.OldFileUrl = this.duzenleForm.get("FileUrl").value;
                    this.data.HasFile = answer.HasFile;

                    if (answer.HasFile) {
                        this.data.FileUrl = answer.FileUrl;
                    }
                    else {
                        this.data.FileUrl = this.duzenleForm.get("FileUrl").value;
                    }

                    this.data.Code = this.duzenleForm.get("Code").value;
                    this.data.Active = this.duzenleForm.get("Active").value;

                    this.service.postDuzenle(this.data)
                        .subscribe((answer2) => {
                            if (answer2.Mesaj == null) {
                                this.router.navigate(['/Admin/Dosya']);
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