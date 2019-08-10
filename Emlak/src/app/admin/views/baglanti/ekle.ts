import { Component } from "@angular/core";
import { ModelService } from "../../services/model";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html'
})

export class AdminBaglantiEkleComponent {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: ModelService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.linkID = params['linkID'];
            this.service.get("Baglanti", "Ekle", this.linkID).subscribe((resData: any) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            LinkTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkID: new FormControl(null, [Validators.required, Validators.min(1)])
        });
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;

        this.service.get("Baglanti", "NesneDoldur", null, null, target.value, null)
            .subscribe((answer: any) => {
                if (answer != null) {
                    $("select.selectLinkID").html("");

                    for (var i = 0; i < answer.length; i++) {
                        $("select.selectLinkID").append("<option value='" + answer[i].Value + "'>" + answer[i].Text + "</option>");
                    }
                }
                else {
                    $(".alertMessage").text("Bağlı Nesne getirilemedi yada ilgili Bağlı Tip'e ait nesne henüz tanımlanmamış.");
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    onSubmit() {
        this.data = new Object();
        this.data.LinkTypeID = this.ekleForm.get("LinkTypeID").value;
        this.data.LinkID = this.ekleForm.get("LinkID").value;

        this.service.post("Baglanti", "Ekle", this.data)
            .subscribe((answer: any) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Baglanti']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}