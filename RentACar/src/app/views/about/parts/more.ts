import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-aboutmore',
    templateUrl: './more.html'
})

export class AboutMoreComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}
