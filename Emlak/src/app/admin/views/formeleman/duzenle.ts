import { Component } from "@angular/core";
import { FormElemanService } from "../../services/formeleman";
import { FormElemanOzellikService } from '../../services/formelemanozellik';
import { FormElemanDegerService } from '../../services/formelemandeger';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";

@Component({
    templateUrl: './duzenle.html',
    providers: [FormElemanService, FormElemanOzellikService, FormElemanDegerService, SharedService]
})

export class AdminFormElemanDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: {};

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;
    copyShow: boolean;

    callTable: boolean;

    constructor(private service: FormElemanService, private servicePropertyAttributes: FormElemanOzellikService, private servicePropertyValues: FormElemanDegerService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
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
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.PropTypeID = this.duzenleForm.get("PropTypeID").value;
        this.data.GroupID = this.duzenleForm.get("GroupID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.Description = this.duzenleForm.get("Description").value;
        this.data.ErrorMessage = this.duzenleForm.get("ErrorMessage").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.OrderNumber = this.duzenleForm.get("OrderNumber").value;

        this.service.postDuzenle(this.data)
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

    onPropertyAttributesDelete(id) {
        this.servicePropertyAttributes.getSil(id).subscribe((resData) => {
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

    onPropertyAttributesCopy(id) {
        this.servicePropertyAttributes.getKopyala(id).subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("Copy");

                let currentUrl = this.router.url;
                this.router.navigate(['/Admin/AnaSayfa'], { skipLocationChange: true }).then(() => { this.router.navigate([currentUrl]) });
            }
            else {
                this.ShowAlert("CopyNot");
            }
        }, resError => this.errorMsg = resError);
    }

    onPropertyValuesDelete(id) {
        this.servicePropertyValues.getSil(id).subscribe((resData) => {
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

    onPropertyValuesCopy(id) {
        this.servicePropertyValues.getKopyala(id).subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("Copy");

                let currentUrl = this.router.url;
                this.router.navigate(['/Admin/AnaSayfa'], { skipLocationChange: true }).then(() => { this.router.navigate([currentUrl]) });
            }
            else {
                this.ShowAlert("CopyNot");
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
                    this.sharedService.getHasRight(Model, "c").subscribe((cRight) => {
                        this.copyShow = cRight;

                        if (this.callTable == true) {
                            this.route.params.subscribe((params: Params) => {
                                this.id = params['id'];
                                this.service.getDuzenle(this.id).subscribe((resData) => {
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
                                            $("a.dlt-yes").attr("data-link", $(this).attr("data-link"));
                                        });

                                        $(document).on("click", "a.dlt-yes[data-link='PropertyAttributes']", () => {
                                            let id: string = $("a.dlt-yes").attr("data-id");
                                            this.onPropertyAttributesDelete(id);
                                            $("a.dlt-yes").removeAttr("data-link");
                                        });

                                        $(document).on("click", "a.dlt-yes[data-link='PropertyValues']", () => {
                                            let id: string = $("a.dlt-yes").attr("data-id");
                                            this.onPropertyValuesDelete(id);
                                            $("a.dlt-yes").removeAttr("data-link");
                                        });

                                        $(document).on("click", "a.cpyLink", function () {
                                            $(this).addClass("active-cpy");
                                            $("a.cpy-yes").attr("data-id", $(this).attr("data-id"));
                                            $("a.cpy-yes").attr("data-link", $(this).attr("data-link"));
                                        });

                                        $(document).on("click", "a.cpy-yes[data-link='PropertyAttributes']", () => {
                                            let id: string = $("a.cpy-yes").attr("data-id");
                                            this.onPropertyAttributesCopy(id);
                                            $("a.cpy-yes").removeAttr("data-link");
                                        });

                                        $(document).on("click", "a.cpy-yes[data-link='PropertyValues']", () => {
                                            let id: string = $("a.cpy-yes").attr("data-id");
                                            this.onPropertyValuesCopy(id);
                                            $("a.cpy-yes").removeAttr("data-link");
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
        }, resError => this.errorMsg = resError);
    }
}