import { Component } from "@angular/core";
import { DilService } from "../../services/dil";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './duzenle.html',
    providers: [DilService]
})

export class AdminDilDuzenleComponent {
    errorMsg: string;
    newFile: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;
    uploadData: any;

    model: {};

    constructor(private service: DilService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
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

        this.service.postDuzenleYukle(this.uploadData)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.data = new Object();
                    this.data.ID = this.duzenleForm.get("ID").value;
                    this.data.TransName = this.duzenleForm.get("TransName").value;
                    this.data.ShortName = this.duzenleForm.get("ShortName").value;
                    this.data.OldFlag = this.duzenleForm.get("Flag").value;
                    this.data.HasFile = answer.HasFile;

                    if (answer.HasFile) {
                        this.data.Flag = answer.Flag;
                    }
                    else {
                        this.data.Flag = this.duzenleForm.get("Flag").value;
                    }

                    this.data.Active = this.duzenleForm.get("Active").value;

                    this.service.postDuzenle(this.data)
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