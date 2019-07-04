import { Component } from "@angular/core";
import { LogTiplerService } from "../../services/logtipler";
import { LogIslemService } from '../../services/logislem';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";

@Component({
    templateUrl: './duzenle.html',
    providers: [LogTiplerService, LogIslemService, SharedService]
})

export class AdminLogTiplerDuzenleComponent {
    errorMsg: string;
    id: string;

    duzenleForm: FormGroup;
    data: any;

    model: {};

    insertShow: boolean;
    updateShow: boolean;
    deleteShow: boolean;

    callTable: boolean;

    constructor(private service: LogTiplerService, private serviceLogProcess: LogIslemService, private sharedService: SharedService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());

        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            ShortName: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
            Description: new FormControl(null),
        });
    }

    onSubmit() {
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Name = this.duzenleForm.get("Name").value;
        this.data.ShortName = this.duzenleForm.get("ShortName").value;
        this.data.Description = this.duzenleForm.get("Description").value;

        this.service.postDuzenle(this.data)
            .subscribe((answer) => {
                if (answer.Mesaj == null) {
                    this.router.navigate(['/Admin/LogTipler']);
                }
                else {
                    $(".alertMessage").text(answer.Mesaj);
                    $(".alert-error").fadeIn("slow");
                }
            },
                resError => this.errorMsg = resError);
    }

    onLogProcessDelete(id) {
        this.serviceLogProcess.getSil(id).subscribe((resData) => {
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
                                        this.onLogProcessDelete(id);
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