import { Component } from "@angular/core";
import { MetaDilService } from "../../services/metadil";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [MetaDilService]
})

export class AdminMetaDilEkleComponent {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: MetaDilService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.linkID = params['linkID'];
            this.service.getEkle(this.linkID).subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            MetaID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Content: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.MetaID = this.ekleForm.get("MetaID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.Name = this.ekleForm.get("Name").value;
        this.data.Content = this.ekleForm.get("Content").value;

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/MetaDil']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}