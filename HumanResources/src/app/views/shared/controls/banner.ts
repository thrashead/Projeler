import { Component, Input } from '@angular/core';

@Component({
    selector: 'hr-banner',
    templateUrl: './banner.html'
})

export class BannerComponent {
    @Input() title: string;

    ngOnInit() {
    }
}
