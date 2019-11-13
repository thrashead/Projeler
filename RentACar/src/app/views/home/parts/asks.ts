import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-homeasks',
    templateUrl: './asks.html'
})

export class HomeAsksComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}
