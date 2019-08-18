import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './update.html'
})

export class AdminLinksUpdateComponent {
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
            this.service.get("Links", "Update", this.id).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkID: new FormControl(null, [Validators.required, Validators.min(1)])
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.LinkTypeID = this.duzenleForm.get("LinkTypeID").value;
        this.data.LinkID = this.duzenleForm.get("LinkID").value;

        this.service.post("Links", "Update", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Links']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}