import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-blogbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class BlogBreadCumbsComponent {
    errorMsg: string;

    @Input() title;
    @Input() url;

    @Input() langs: any;

    ngOnInit() {
    }
}