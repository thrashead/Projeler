import { Component, Input } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'hr-modalalert',
    templateUrl: './modalalert.html'
})

export class ModalAlertComponent {
    errorMsg: string;
    @Input() alert: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }

    onClick() {
        $("#modalAlert").removeClass("show");
    }
}
