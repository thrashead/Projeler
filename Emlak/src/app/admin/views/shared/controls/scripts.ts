import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import { ModelService } from '../../../services/model';
import { Router } from '@angular/router';
import '../../../../../../Content/admin/js/jquery.dataTables.min.js';
import '../../../../../../Content/admin/js/bootstrap.min.js';
import '../../../../../../Content/admin/js/matrix.js';
import '../../../../../../Content/admin/js/matrix.popover.js';
import '../../../../../../Content/admin/js/ckeditor/ckeditor.js';
import '../../../../../../Content/admin/js/pathscript.js';
import '../../../../../../Content/admin/js/script.js';
import * as $ from "jquery";

@Component({
    selector: 'admin-scripts',
    template: '',
    styleUrls: [
        '../../../../../../Content/admin/css/bootstrap.min.css',
        '../../../../../../Content/admin/css/bootstrap-responsive.min.css',

        '../../../../../../Content/admin/css/matrix-style.css',
        '../../../../../../Content/admin/css/matrix-media.css',
        '../../../../../../Content/admin/css/font-awesome/css/font-awesome.css',
        '../../../../../../Content/admin/css/style.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class AdminScriptsComponent {
    errorMsg: string;

    private zone = new NgZone({});

    constructor(private service: ModelService, private router: Router) {
    }

    ngOnInit() {
        $(document).off("keyup", ".dataTables_filter label input[type='text']")
            .on("keyup", ".dataTables_filter label input[type='text']", function () {
                if ($(".dropdown-menu").first().find("a").length <= 0) {
                    $(".btn-group").remove();
                }
            });

        $(document).off("click", "a.dltLink").on("click", "a.dltLink", function () {
            $(this).addClass("active-dlt");
            $("a.dlt-yes").attr("data-id", $(this).attr("data-id"));
            $("a.dlt-yes").attr("data-controller", $(this).attr("data-controller"));
        });

        $(document).off("click", "a.rmvLink").on("click", "a.rmvLink", function () {
            $(this).addClass("active-rmv");
            $("a.rmv-yes").attr("data-id", $(this).attr("data-id"));
            $("a.rmv-yes").attr("data-controller", $(this).attr("data-controller"));
        });

        $(document).off("click", "a.cpyLink").on("click", "a.cpyLink", function () {
            $(this).addClass("active-cpy");
            $("a.cpy-yes").attr("data-id", $(this).attr("data-id"));
            $("a.cpy-yes").attr("data-controller", $(this).attr("data-controller"));
        });

        $(document).off("click", "a.clrLink").on("click", "a.clrLink", function () {
            $(this).addClass("active-clr");
            $("a.clr-yes").attr("data-id", $(this).attr("data-id"));
            $("a.clr-yes").attr("data-controller", $(this).attr("data-controller"));
        });

        $(document).off("click", "a.dlt-yes").on("click", "a.dlt-yes", () => {
            let id: string = $("a.dlt-yes").attr("data-id");
            let controller: string = $("a.dlt-yes").attr("data-controller");
            this.onAction(controller, "Delete", id);
        });

        $(document).off("click", "a.rmv-yes").on("click", "a.rmv-yes", () => {
            let id: string = $("a.rmv-yes").attr("data-id");
            let controller: string = $("a.rmv-yes").attr("data-controller");
            this.onAction(controller, "Remove", id);
        });

        $(document).off("click", "a.cpy-yes").on("click", "a.cpy-yes", () => {
            let id: string = $("a.cpy-yes").attr("data-id");
            let controller: string = $("a.cpy-yes").attr("data-controller");
            this.onAction(controller, "Copy", id);
        });

        $(document).off("click", "a.clr-yes").on("click", "a.clr-yes", () => {
            let id: string = $("a.clr-yes").attr("data-id");
            let controller: string = $("a.clr-yes").attr("data-controller");
            this.onAction(controller, "Clear", id);
        });
    }

    onAction(controller: any, action: string, id: string) {
        this.service.get(controller, action, id).subscribe((answer: boolean) => {
            if (answer == true) {
                ShowAlert(action);

                if (action == "Copy" || action == "Clear") {
                    let currentUrl = this.router.url;
                    this.zone.run(() => this.router.navigate(['/Admin'], { skipLocationChange: true }).then(() => { this.router.navigate([currentUrl]) }));
                }
            }
            else {
                ShowAlert(action + "Not");
            }
        }, resError => this.errorMsg = resError);
    }
}

(window as any).ShowAlert = ShowAlert;
(window as any).DataTable = DataTable;

function ShowAlert(type: string) {
    $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow", function () {
        switch (type) {
            case "Delete":
                $("a.dltLink.active-dlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
                break;
            case "Remove":
                $("a.rmvLink.active-rmv").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
                break;
        }
    });

    setInterval(function () {
        $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
    }, 2000);
};

function DataTable() {
    setTimeout(() => {
        $(".data-table").dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "sDom": '<""l>t<"F"fp>'
        });

        if ($(".dropdown-menu").first().find("a").length <= 0) {
            $(".btn-group").remove();
        }
    }, 1);
};