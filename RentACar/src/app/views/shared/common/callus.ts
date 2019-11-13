import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-sharedcallus',
    templateUrl: './callus.html'
})

export class SharedCallUsComponent {
    @Input() langs: any;

    ngOnInit() {
    }
}
