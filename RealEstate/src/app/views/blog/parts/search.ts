import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 're-blogsearch',
    templateUrl: './search.html'
})

export class BlogSearchComponent {
    errorMsg: string;

    search: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetLangContent();
    }

    //LangContent
    GetLangContent() {
        this.service.get("Site", "GetLangContentByCode", "src_src", 1).subscribe((resData: any) => {
            this.search = resData.ShortDescription2;
        }, resError => this.errorMsg = resError);
    }
}
