import { Component } from '@angular/core';
//import { Router } from '@angular/router';

@Component({
    selector: 'rac-header',
    templateUrl: './header.html'
})

export class HeaderComponent {
    paneladdress: string = "http://localhost/RentACar/Admin";

    constructor() {
    }

    ngOnInit() {
    }
}
