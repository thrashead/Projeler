import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminTranslationUpdateComponent {
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
            this.service.get("Translation", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(25)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
            Flag: new FormControl(null, [Validators.required, Validators.minLength(1)]),
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

        this.service.post("Translation", "UpdateUpload", this.uploadData)
            .subscribe((answer: any) => {
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

                    this.service.post("Translation", "Update", this.data)
                        .subscribe((answer2: any) => {
                            if (answer2.Mesaj == null) {
                                this.router.navigate(['/Admin/Translation']);
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