import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../../services/site';
import { LangItem } from '../../../../models/LangItem';
import { Lib } from '../../../../lib/methods';

@Component({
    selector: 'rac-cardetailtestform',
    templateUrl: './testform.html'
})

export class CarsDetailTestFormComponent {
    errorMsg: string;

    @Output() alert: string;
    @Input() carID;

    testForm: FormGroup;

    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.SetLangContents();

        this.testForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Phone: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
            Message: new FormControl(null, [Validators.required, Validators.minLength(25), Validators.maxLength(255)]),
            CopyMail: new FormControl(null)
        });
    }

    onClick() {
        this.data = new Object();

        this.data.CarID = parseInt(this.carID);
        this.data.Name = this.testForm.get("Name").value;
        this.data.Mail = this.testForm.get("Mail").value;
        this.data.Phone = this.testForm.get("Phone").value;
        this.data.Message = this.testForm.get("Message").value;
        this.data.CopyMail = this.testForm.get("CopyMail").value;

        this.service.post("Site", "SendTestForm", this.data).subscribe((resData: any) => {
            $("#modalAlert").addClass("show");

            if (resData == true) {
                this.alert = this.langs.test.Alert;

                this.testForm.reset();
            }
            else {
                this.alert = this.langs.test.Error;
            }
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
            this.langs.test = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "name": this.langs.test.Sender = item.ShortDescription; break;
                            case "mail": this.langs.test.Mail = item.ShortDescription; break;
                            case "phone":
                                this.langs.test.Phone = item.ShortDescription;
                                this.langs.test.Phone2 = item.Description;
                                break;
                            case "msg": this.langs.test.Message = item.ShortDescription; break;
                            case "sbmt": this.langs.test.Submit = item.ShortDescription; break;
                            case "alert": this.langs.test.Alert = item.ShortDescription; break;
                        }
                        break;
                    case "test_form":
                        switch (item.ShortCode) {
                            case "text": this.langs.test.Text = item.ShortDescription; break;
                            case "copymail": this.langs.test.CopyMail = item.ShortDescription; break;
                        }
                        break;
                    case "home_wlcm_support": this.langs.test.CallUs = item.Description2; break;
                    case "cmn_error_onemsg": this.langs.test.Error = item.ShortDescription; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "test_form"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "home_wlcm_support"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_error_onemsg"));
    }
}
