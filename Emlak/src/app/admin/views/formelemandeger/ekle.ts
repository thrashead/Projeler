import { Component } from "@angular/core";
import { FormElemanDegerService } from "../../services/formelemandeger";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [FormElemanDegerService]
})

export class AdminFormElemanDegerEkleComponent {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: FormElemanDegerService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.linkID = params['linkID'];
            this.service.getEkle(this.linkID).subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            PropID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Text: new FormControl(null),
            Value: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Code: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.PropID = this.ekleForm.get("PropID").value;
        this.data.Text = this.ekleForm.get("Text").value;
        this.data.Value = this.ekleForm.get("Value").value;
        this.data.Code = this.ekleForm.get("Code").value;

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/FormElemanDeger']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}