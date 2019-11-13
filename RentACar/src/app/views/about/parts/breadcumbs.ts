import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-aboutbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class AboutBreadCumbsComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}