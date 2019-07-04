import { Component } from "@angular/core";
import { DosyaService } from "../../services/dosya";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [DosyaService]
})

export class AdminDosyaEkleComponent {
    errorMsg: string;
    newFile: string;

    ekleForm: FormGroup;
    data: any;
    uploadData: any;

    model: any;

    constructor(private service: DosyaService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
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

        this.service.postEkleYukle(this.uploadData)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.data = new Object();
                    this.data.Title = this.ekleForm.get("Title").value;
                    this.data.Description = this.ekleForm.get("Description").value;
                    this.data.FileUrl = answer.FileUrl;
                    this.data.Code = this.ekleForm.get("Code").value;
                    this.data.Active = this.ekleForm.get("Active").value;

                    this.service.postEkle(this.data)
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