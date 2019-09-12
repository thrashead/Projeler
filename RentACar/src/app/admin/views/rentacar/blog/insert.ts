import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { ModelService } from "../../../services/model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './insert.html'
})

export class AdminBlogInsertComponent {
    errorMsg: string;
    newFile: string;

    insertForm: FormGroup;
    data: any;

    model: any;

    uploadData: any;

    private subscription: Subscription = new Subscription();

    constructor(private service: ModelService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.data = new Object();

        this.subscription = this.service.get("Blog", "Insert").subscribe((answer: any) => {
            this.model = answer;
        }, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });

        this.insertForm = this.formBuilder.group({
            BlogCatID: new FormControl(null, [Validators.required, Validators.min(0)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Sender: new FormControl(null, [Validators.required, Validators.min(0)]),
            PictureUrl: new FormControl(null),
			Tags: new FormControl(null),
        });
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            this.newFile = event.target.files[0];
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        this.uploadData = new FormData();
        this.uploadData.append("file", this.newFile);

        this.subscription = this.service.post("Blog", "InsertUpload", this.uploadData).subscribe((answerUpload: any) => {
            if (answerUpload.Mesaj == null) {
                this.data.BlogCatID = this.insertForm.get("BlogCatID").value;
                this.data.Title = this.insertForm.get("Title").value;
                this.data.PictureUrl = answerUpload.PictureUrl;
                this.data.Code = this.insertForm.get("Code").value;
                this.data.Sender = this.insertForm.get("Sender").value;
                this.data.Tags = this.insertForm.get("Tags").value;

                this.service.post("Blog", "Insert", this.data)
                    .subscribe((answer: any) => {
                        if (answer.Mesaj == null) {
                            this.router.navigate(['/Admin/Blog']);
                        }
                        else {
                            $(".alertMessage").text(answer.Mesaj);
                            $(".alert-error").fadeIn("slow");
                        }
                    },
                        resError => this.errorMsg = resError);
            }
            else {
                $(".alertMessage").text(answerUpload.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, resError => this.errorMsg = resError, () => { this.subscription.unsubscribe(); });
    }
}
