import { Component } from "@angular/core";
import { BagliTiplerService } from "../../services/baglitipler";
import { BaglantiService } from '../../services/baglanti';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";

@Component({
    templateUrl: './duzenle.html'
})

export class AdminBagliTiplerDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    linkTypeTitle: string;
    model: any;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;

    callTable: boolean;

    constructor(private service: BagliTiplerService, private serviceLinks: BaglantiService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
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
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.MainTypeID = this.duzenleForm.get("MainTypeID").value;
        this.data.MainID = this.duzenleForm.get("MainID").value;
        this.data.LinkedTypeID = this.duzenleForm.get("LinkedTypeID").value;

        this.service.postDuzenle(this.data)
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

    onLinksDelete(id) {
        this.serviceLinks.getSil(id).subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("Delete");

                $("a.dltLink.active-dlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                this.ShowAlert("DeleteNot");
            }
        }, resError => this.errorMsg = resError);
    }

    ShowAlert(type: string) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");

        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    }

    UserRightsControl(Model: any) {
        this.sharedService.getHasRight(Model, "i").subscribe((iRight) => {
            this.insertShow = iRight;
            this.sharedService.getHasRight(Model, "u").subscribe((uRight) => {
                this.updateShow = uRight;
                this.sharedService.getHasRight(Model, "d").subscribe((dRight) => {
                    this.deleteShow = dRight;

                    if (this.callTable == true) {
                        this.route.params.subscribe((params: Params) => {
                            this.id = params['id'];
                            this.service.getDuzenle(this.id).subscribe((resData) => {
                                for (var i = 0; i < resData.LinkList.length; i++) {
                                    switch (resData.LinkedTypeID) {
                                        case 1: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedCategoryAdi; break;
                                        case 2: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedContentAdi; break;
                                        case 3: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedProductAdi; break;
                                        case 4: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedGalleryAdi; break;
                                        case 5: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedPictureAdi; break;
                                        case 6: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedFileAdi; break;
                                        case 7: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedMetaAdi; break;
                                        case 8: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedPropertyGroupAdi; break;
                                        case 17: resData.LinkList[i].LinkedAdi = resData.LinkList[i].LinkedRealEstatesAdi; break;
                                    }
                                }

                                this.model = resData;
                                this.callTable = false;

                                setTimeout(() => {
                                    $(".data-table").dataTable({
                                        "bJQueryUI": true,
                                        "sPaginationType": "full_numbers",
                                        "sDom": '<""l>t<"F"fp>'
                                    });

                                    if ($(".dropdown-menu").first().find("a").length <= 0) {
                                        $(".btn-group").remove();
                                    }

                                    $(document).on("click", ".fg-button", () => {
                                        setTimeout(() => {
                                            this.UserRightsControl($("#hdnModel").val());
                                        }, 1);
                                    });

                                    $(document).on("click", "a.dltLink", function () {
                                        $(this).addClass("active-dlt");
                                        $("a.dlt-yes").attr("data-id", $(this).attr("data-id"));
                                    });

                                    $(document).on("click", "a.dlt-yes", () => {
                                        let id: string = $("a.dlt-yes").attr("data-id");
                                        this.onLinksDelete(id);
                                    });
                                }, 1);
                            }, resError => this.errorMsg = resError);
                        });
                    }

                    setTimeout(() => {
                        if ($(".dropdown-menu").first().find("a").length <= 0) {
                            $(".btn-group").remove();
                        }
                    }, 1);

                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}