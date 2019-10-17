import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../../services/site';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

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

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.SetLangContents();

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

    //LangContents
    langItems: Array<LangItem>;
    langItem: LangItem;
    langs: any;

    //LangContent
    SetLangContents() {
        this.PushLangItems();

        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData: any) => {
            this.langs = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_price_opt":
                        this.langs.DayPrice = item.ShortDescription;
                        this.langs.WeekPrice = item.Description;
                        this.langs.MonthPrice = item.ShortDescription2;
                        this.langs.YearPrice = item.Description2;
                        break;
                    case "count_form":
                        this.langs.Title = item.ShortDescription;
                        this.langs.Submit = item.ShortDescription2;
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_price_opt"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "count_form"));
    }
}
