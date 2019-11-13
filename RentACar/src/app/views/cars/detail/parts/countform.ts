import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'rac-cardetailcountform',
    templateUrl: './countform.html'
})

export class CarsDetailCountFormComponent {
    errorMsg: string;

    @Input() carPrice;
    result: string = "&nbsp;";

    calcForm: FormGroup;

    data: any;
    discount: any;

    @Input() langs: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.GetDiscounts();

        this.calcForm = this.formBuilder.group({
            Time: new FormControl(null, [Validators.required, Validators.min(0)]),
            TimeType: new FormControl(null, Validators.required),
        });
    }

    onClick() {
        this.data = new Object();
        this.data.Time = parseInt(this.calcForm.get("Time").value);
        this.data.TimeType = parseInt(this.calcForm.get("TimeType").value);
        this.data.Price = parseInt(this.carPrice);

        this.service.post("Site", "CalculatePrice", this.data).subscribe((resData: any) => {
            this.result = resData;
        }, resError => this.errorMsg = resError);
    }

    //GetDiscount
    GetDiscounts() {
        this.service.get("Site", "GetNoLangContentByCode", "discount").subscribe((resData: any) => {
            this.discount = new Object();

            resData.forEach((item, i) => {
                switch (item.ShortCode) {
                    case "week": this.discount.Week = item.ShortDescription; break;
                    case "month": this.discount.Month = item.ShortDescription; break;
                    case "year": this.discount.Year = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }
}
