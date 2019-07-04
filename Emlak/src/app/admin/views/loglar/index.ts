import { Component } from "@angular/core";
import { LoglarService } from "../../services/loglar";
import * as $ from "jquery";

@Component({
    templateUrl: './index.html',
    providers: [LoglarService]
})

export class AdminLoglarIndexComponent {
    errorMsg: string;
    LoglarList: {};

    constructor(private service: LoglarService) {
    }

    ngOnInit() {
        this.service.getIndex().subscribe((resData) => {
            this.LoglarList = resData;

            setTimeout(function () {
                $(".data-table").dataTable({
                    "bJQueryUI": true,
                    "sPaginationType": "full_numbers",
                    "sDom": '<""l>t<"F"fp>'
                });
            }, 1);
        }, resError => this.errorMsg = resError);
    }
}