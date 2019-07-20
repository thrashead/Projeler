import { Component } from "@angular/core";
import { GaleriDilService } from "../../services/galeridil";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../Content/admin/js/ckeditor/ckeditor.js';

@Component({
    templateUrl: './duzenle.html'
})

export class AdminGaleriDilDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    constructor(private service: GaleriDilService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.service.getDuzenle(this.id).subscribe((resData) => {
                this.model = resData;
            }, resError => this.errorMsg = resError);
        });

        setTimeout(function () {
            ClassicEditor
                .create(document.querySelector('#Description'), {
                    //toolbar: ['bold', 'italic']
                })
                .then(editor => {
                    console.log(editor);
                })
                .catch(err => {
                    console.error(err.stack);
                });
        }, 100);

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GalID: new FormControl(null, [Validators.required, Validators.min(1)]),
            TransID: new FormControl(null, [Validators.required, Validators.min(1)]),
            GalleryName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            ShortText1: new FormControl(null),
            ShortText2: new FormControl(null),
            Description: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.GalID = this.duzenleForm.get("GalID").value;
        this.data.TransID = this.duzenleForm.get("TransID").value;
        this.data.GalleryName = this.duzenleForm.get("GalleryName").value;
        this.data.ShortText1 = this.duzenleForm.get("ShortText1").value;
        this.data.ShortText2 = this.duzenleForm.get("ShortText2").value;
        this.data.Description = $(".ck-content").html().replace("<p>", "").replace("</p>", "");

        this.service.postDuzenle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/GaleriDil']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }
}