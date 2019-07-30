import { Component } from "@angular/core";
import { UrunService } from "../../services/urun";
import { UrunDilService } from '../../services/urundil';
import { SharedService } from '../../services/shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";

@Component({
    templateUrl: './duzenle.html'
})

export class AdminUrunDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: any;

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;
    realDeleteShow: boolean;

    callTable: boolean;

    constructor(private service: UrunService, private serviceProductT: UrunDilService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Title: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Active: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Title = this.duzenleForm.get("Title").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.Active = this.duzenleForm.get("Active").value;

        this.service.postDuzenle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/Urun']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    onProductTDelete(id) {
        this.serviceProductT.getSil(id).subscribe((resData) => {
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

    onProductTRealDelete(id) {
        this.serviceProductT.getKaldir(id).subscribe((resData) => {
            if (resData == true) {
                this.ShowAlert("RealDeleteNot");

                $("a.rdltLink.active-rdlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                this.ShowAlert("RealDeleteNot");
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
                    this.sharedService.getHasRight(Model, "rd").subscribe((rdRight) => {
                        this.realDeleteShow = rdRight;

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

                                        $(document).off("click", ".fg-button").on("click", ".fg-button", () => {
                                            setTimeout(() => {
                                                this.UserRightsControl($("#hdnModel").val());
                                            }, 1);
                                        });

                                        $(document).off("click", "a.dltLink").on("click", "a.dltLink", function () {
                                            $(this).addClass("active-dlt");
                                            $("a.dlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });

                                        $(document).off("click", "a.dlt-yes").on("click", "a.dlt-yes", () => {
                                            let id: string = $("a.dlt-yes").attr("data-id");
                                            this.onProductTDelete(id);
                                        });

                                        $(document).off("click", "a.rdltLink").on("click", "a.rdltLink", function () {
                                            $(this).addClass("active-rdlt");
                                            $("a.rdlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });

                                        $(document).off("click", "a.rdlt-yes").on("click", "a.rdlt-yes", () => {
                                            let id: string = $("a.rdlt-yes").attr("data-id");
                                            this.onProductTRealDelete(id);
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