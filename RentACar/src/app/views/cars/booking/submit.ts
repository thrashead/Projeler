import { Component, Output } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';

@Component({
    templateUrl: './submit.html'
})

export class CarsBookSubmitComponent {
    errorMsg: string;
    @Output() confirm: string;
    @Output() alert: string;

    bookForm: FormGroup;

    car: any;
    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.SetLangContents();
        this.GetCarDetailByUrl();

        this.bookForm = this.formBuilder.group({
            Name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            IdentityNo: new FormControl(null, [Validators.required, Validators.minLength(11)]),
            City: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
            DistrictPostal: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
            Phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Address: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
            Accept: [false, Validators.pattern('true')]
        });
    }

    onClick($event) {
        var target = $event.target || $event.srcElement || $event.currentTarget;
        var carID = target.hasAttribute("data-id") ? parseInt(target.attributes["data-id"].value) : 0;

        this.data = new Object();
        this.data.Name = this.bookForm.get("Name").value;
        this.data.IdentityNo = this.bookForm.get("IdentityNo").value;
        this.data.City = this.bookForm.get("City").value;
        this.data.DistrictPostal = this.bookForm.get("DistrictPostal").value;
        this.data.Phone = this.bookForm.get("Phone").value;
        this.data.Mail = this.bookForm.get("Mail").value;
        this.data.Address = this.bookForm.get("Address").value;
        this.data.CarID = carID;

        this.service.post("Site", "ApplyBooking", this.data).subscribe((answer: boolean) => {

            if (answer == true) {
                this.service.get("Site", "ClearBookSearchFilters").subscribe((resData: any) => {
                    $("#modalConfirm").addClass("show");
                    this.confirm = this.langs.confirm.submit;
                }, resError => this.errorMsg = resError);
            }
            else {
                $("#modalAlert").addClass("show");
                this.alert = this.langs.error
            }
        }, resError => this.errorMsg = resError);
    }

    GetCarDetailByUrl() {
        this.service.get("Site", "GetCarDetailByUrl").subscribe((resData: any) => {
            this.car = resData;
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
            this.langs.content = new Object();
            this.langs.contact = new Object();
            this.langs.confirm = new Object();

            resData.forEach((item, i) => {
                switch (item.Code) {
                    case "cmn_detail": this.langs.detail = item.ShortDescription; break;
                    case "cmn_error_onemsg": this.langs.error = item.ShortDescription; break;
                    case "cmn_rgstryr": this.langs.registered = item.ShortDescription2; break;
                    case "car_book":
                        switch (item.ShortCode) {
                            case "step1":
                                this.langs.content.step1 = item.ShortDescription;
                                this.langs.content.title1 = item.Description;
                                this.langs.content.desc1 = item.ShortDescription2;
                                this.langs.content.longdesc1 = item.Description2;
                                break;
                            case "step2":
                                this.langs.content.step2 = item.ShortDescription;
                                this.langs.content.title2 = item.Description;
                                this.langs.content.desc2 = item.ShortDescription2;
                                this.langs.content.longdesc2 = item.Description2;
                                break;
                            case "step3":
                                this.langs.content.step3 = item.ShortDescription;
                                this.langs.content.title3 = item.Description;
                                this.langs.content.desc3 = item.ShortDescription2;
                                this.langs.content.longdesc3 = item.Description2;
                                break;
                            case "step4":
                                this.langs.content.step4 = item.ShortDescription;
                                this.langs.content.title4 = item.Description;
                                this.langs.content.desc4 = item.ShortDescription2;
                                this.langs.content.longdesc4 = item.Description2;
                                break;
                            case "confirm":
                                this.langs.confirm.desc = item.Description;
                                break;
                            case "submit":
                                this.langs.confirm.submit = item.ShortDescription;
                                break;
                        }
                        break;
                    case "cntct_form":
                        switch (item.ShortCode) {
                            case "adres": this.langs.contact.address = item.ShortDescription2; break;
                            case "name": this.langs.contact.name = item.ShortDescription2; break;
                            case "id": this.langs.contact.id = item.ShortDescription2; break;
                            case "city": this.langs.contact.city = item.ShortDescription2; break;
                            case "country": this.langs.contact.country = item.ShortDescription2; break;
                            case "district": this.langs.contact.district = item.ShortDescription2; break;
                            case "postal": this.langs.contact.postal = item.ShortDescription2; break;
                            case "phone": this.langs.contact.phone = item.ShortDescription2; break;
                            case "mail": this.langs.contact.mail = item.ShortDescription2; break;
                            case "sbmt": this.langs.contact.submit = item.ShortDescription2; break;
                        }
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "car_book"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_detail"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cmn_error_onemsg"));
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form"));
    }
}