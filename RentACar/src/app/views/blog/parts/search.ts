import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { LangItem } from '../../../models/LangItem';

@Component({
    selector: 'rac-blogsearch',
    templateUrl: './search.html'
})

export class BlogSearchComponent {
    errorMsg: string;

    searchForm: FormGroup;

    words: string;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.SetLangContents();

        this.searchForm = this.formBuilder.group({
            Words: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        });
    }

    onClick() {
        this.words = this.searchForm.get("Words").value;

        this.service.get("Site", "SetBlogSearchWords", this.words).subscribe((resData: any) => {
            this.router.navigate(['/'], { skipLocationChange: true }).then(() => { this.router.navigate(['/Blog/List/Arama-Sonuclari']) });
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
                    case "src_src": this.langs.search = item.ShortDescription2; break;
                }
            });
        }, resError => this.errorMsg = resError);
    }

    PushLangItems() {
        this.langItems = new Array<LangItem>();

        this.langItems.push(Lib.SetLangItem(this.langItem, "src_src"));
    }
}
