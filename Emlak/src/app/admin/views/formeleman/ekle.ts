import { Component } from "@angular/core";
import { FormElemanService } from "../../services/formeleman";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [FormElemanService]
})

export class AdminFormElemanEkleComponent {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: FormElemanService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.linkID = params['linkID'];
            this.service.getEkle(this.linkID).subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            PropTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GroupID: new FormControl(null),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Description: new FormControl(null),
            ErrorMessage: new FormControl(null),
            Code: new FormControl(null),
            OrderNumber: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.PropTypeID = this.ekleForm.get("PropTypeID").value;
        this.data.GroupID = this.ekleForm.get("GroupID").value;
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.Description = this.ekleForm.get("Description").value;
        this.data.ErrorMessage = this.ekleForm.get("ErrorMessage").value;
        this.data.Code = this.ekleForm.get("Code").value;
        this.data.OrderNumber = this.ekleForm.get("OrderNumber").value;

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/FormEleman']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}