import { Component } from '@angular/core';

declare global {
    interface JQuery {
        dataTable(obj: any): JQuery;
        typeahead(obj: any): JQuery;
        slider(obj: any): JQuery;
        owlCarousel(obj: any): JQuery;
        bxSlider(obj: any): JQuery;
        carousel(obj?: any): JQuery;
    }
}

@Component({
    selector: 'rac-app',
    templateUrl: './app.html'
})

export class AppComponent {
    ngOnInit() {
    }
}
