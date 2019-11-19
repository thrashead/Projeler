import { Component, Input } from '@angular/core';
import { Link } from '../../../models/Link';

@Component({
    selector: 'hr-breadcrumbs',
    templateUrl: './breadcrumbs.html'
})

export class BreadCrumbsComponent {
    @Input() title: string;
    @Input() message: string;
    @Input() links: Array<Link>;

    ngOnInit() {
    }
}
