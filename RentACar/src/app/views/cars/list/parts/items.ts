import { Component, Input, Output } from '@angular/core';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-carlistitems',
    templateUrl: './items.html'
})

export class CarsListItemsComponent {
    errorMsg: string;
    @Output() alert: string;

    carCompareList: any;

    @Input() carList: any;

    firstCheck: boolean;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.firstCheck = true;
    }

    onChange($event) {
        var target = $event.target || $event.srcElement || $event.currentTarget;
        var count = parseInt($("#lblCompareCount").text());

        if (target.checked) {
            if (count == 3) {
                target.checked = false;
                $("#modalAlert").addClass("show");
                this.alert = this.langs.threecar;
                return;
            }

            this.CreateCarCompareList(target.attributes["data-url"].value);

            count++;
        }
        else {
            this.CreateCarCompareList(target.attributes["data-url"].value);

            count--;
        }

        $("#lblCompareCount").text(count.toString());
    }

    //CarCompareList
    CreateCarCompareList(url: string) {
        if (this.firstCheck) {
            this.service.get("Site", "ClearCarCompareList").subscribe((resData: any) => {
                this.firstCheck = false;

                this.service.get("Site", "CreateCarCompareList", url).subscribe((resData: any) => {
                    this.carCompareList = resData;
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }
        else {
            this.service.get("Site", "CreateCarCompareList", url).subscribe((resData: any) => {
                this.carCompareList = resData;
            }, resError => this.errorMsg = resError);
        }
    }
}
