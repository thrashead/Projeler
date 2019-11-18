import { Component } from '@angular/core';

declare global {
    interface JQuery {
        dataTable(obj: any): JQuery;
        typeahead(obj: any): JQuery;
        slick(obj: any): JQuery;
        chosen(obj: any): JQuery;
    }
}

@Component({
    selector: 'hr-app',
    templateUrl: './app.html'
})

export class AppComponent {
    ngOnInit() {
    }
}
