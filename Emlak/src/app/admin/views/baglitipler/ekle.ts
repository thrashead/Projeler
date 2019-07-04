import { Component } from "@angular/core";
import { BagliTiplerService } from "../../services/baglitipler";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
    templateUrl: './ekle.html',
    providers: [BagliTiplerService]
})

export class AdminBagliTiplerEkleComponent {
    errorMsg: string;

    ekleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: BagliTiplerService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe(() => {
            this.service.getEkle().subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        this.ekleForm = this.formBuilder.group({
            Title: new FormControl(null, [Validators.maxLength(50)]),
            MainTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
            MainID: new FormControl(null, [Validators.required, Validators.min(1)]),
            LinkedTypeID: new FormControl(null, [Validators.required, Validators.min(1)]),
        });
    }

    onChange(event) {
        var target = event.target || event.srcElement || event.currentTarget;

        this.service.getTipDoldur(target.value)
            .subscribe((answer) => {
                if (answer != null) {
                    $("select.selectMain").html("");

                    for (var i = 0; i < answer.length; i++) {
                        $("select.selectMain").append("<option value='" + answer[i].Value + "'>" + answer[i].Text + "</option>");
                    }
                }
                else {
                    $(".alertMessage").text("Ana Nesne getirilemedi yada ilgili Ana Tip'e ait nesne henüz tanımlanmamış.");
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    onSubmit() {
        this.data = new Object();
        this.data.Title = this.ekleForm.get("Title").value;
        this.data.MainTypeID = this.ekleForm.get("MainTypeID").value;
        this.data.MainID = this.ekleForm.get("MainID").value;
        this.data.LinkedTypeID = this.ekleForm.get("LinkedTypeID").value;

        this.service.postEkle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/BagliTipler']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}