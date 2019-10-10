import { Component } from "@angular/core";
import { SiteService } from '../../../services/site';
import { Router } from '@angular/router';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';

@Component({
    templateUrl: './submit.html'
})

export class CarsBookSubmitComponent {
    errorMsg: string;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
        this.SetLangContents();
    }

    onClick() {
        this.router.navigate(['/']);
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
        this.langItems.push(Lib.SetLangItem(this.langItem, "cntct_form"));
    }
}