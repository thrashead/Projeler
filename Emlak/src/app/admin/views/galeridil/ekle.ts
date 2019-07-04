import { Component } from "@angular/core";
import { GaleriDilService } from "../../services/galeridil";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import ClassicEditor from '../../../../../Content/admin/js/ckeditor/ckeditor.js';

@Component({
    templateUrl: './ekle.html',
    providers: [GaleriDilService]
})

export class AdminGaleriDilEkleComponent {
    errorMsg: string;
    linkID: string;

    ekleForm: FormGroup;
    data: any;

    model: {};

    constructor(private service: GaleriDilService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.route.params.subscribe(() => {
            this.route.params.subscribe((params: Params) => {
                this.linkID = params['linkID'];
                this.service.getEkle(this.linkID).subscribe((resData) => {
                    this.model = resData;
                }, resError => this.errorMsg = resError);
            });
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

        this.ekleForm = this.formBuilder.group({
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
        this.data.GalID = this.ekleForm.get("GalID").value;
        this.data.TransID = this.ekleForm.get("TransID").value;
        this.data.GalleryName = this.ekleForm.get("GalleryName").value;
        this.data.ShortText1 = this.ekleForm.get("ShortText1").value;
        this.data.ShortText2 = this.ekleForm.get("ShortText2").value;
        this.data.Description = $(".ck-content").html().replace("<p>", "").replace("</p>", "");

        this.service.postEkle(this.data)
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