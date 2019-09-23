import { Component } from "@angular/core";
import { ModelService } from "../../../services/model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AdminLib } from '../../../lib/methods';

@Component({
    templateUrl: './update.html'
})

export class AdminCategoryTUpdateComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.get("CategoryT", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        AdminLib.ConvertToCKEditor("Description", 1500);

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            CatID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            CategoryName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            ShortText1: new FormControl(null),
            ShortText2: new FormControl(null),
            Description: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.CatID = this.duzenleForm.get("CatID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.CategoryName = this.duzenleForm.get("CategoryName").value;
        this.data.ShortText1 = this.duzenleForm.get("ShortText1").value;
        this.data.ShortText2 = this.duzenleForm.get("ShortText2").value;
        this.data.Description = AdminLib.CKValue("Description");

        this.service.post("CategoryT", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/CategoryT']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}