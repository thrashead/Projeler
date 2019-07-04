import { Component } from "@angular/core";
import { DilService } from "../../services/dil";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [DilService]
})

export class AdminDilEkleComponent {
    errorMsg: string;
    newFile: string;

    ekleForm: FormGroup;
    data: any;
    uploadData: any;

    model: any;

    constructor(private service: DilService, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.ekleForm = this.formBuilder.group({
            TransName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(5)]),
            Flag: new FormControl(null, [Validators.required, Validators.minLength(3)]),
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
                    this.data.TransName = this.ekleForm.get("TransName").value;
                    this.data.ShortName = this.ekleForm.get("ShortName").value;
                    this.data.Flag = answer.Flag;
                    this.data.Active = this.ekleForm.get("Active").value;

                    this.service.postEkle(this.data)
                        .subscribe((answer2) => {
                            if (answer2.Mesaj == null) {
                                this.router.navigate(['/Admin/Dil']);
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