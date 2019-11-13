import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-blogpopular',
    templateUrl: './popular.html'
})

export class BlogPopularComponent {
    errorMsg: string;

    popularList: any;

    @Input() langs: any;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        this.GetBlogContent();
    }

    //BlogContent
    GetBlogContent() {
        this.service.get("Site", "GetPopularBlogPosts", 2).subscribe((resData: any) => {
            this.popularList = resData;
        }, resError => this.errorMsg = resError);
    }
}
