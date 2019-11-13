import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-blogbreadcumbsdetail',
    templateUrl: './breadcumbsdetail.html'
})

export class BlogBreadCumbsDetailComponent {
    errorMsg: string;

    @Input() title;
    @Input() url;

    @Input() langs: any;

    ngOnInit() {
    }
}