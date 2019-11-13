import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-contactbreadcumbs',
    templateUrl: './breadcumbs.html'
})

export class ContactBreadCumbsComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}
