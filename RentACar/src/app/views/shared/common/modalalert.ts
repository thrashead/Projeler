import { Component, Input } from '@angular/core';

@Component({
    selector: 'rac-sharedmodalalert',
    templateUrl: './modalalert.html'
})

export class SharedModalAlertComponent {
    @Input() alert: string;
    ok: string = "Tamam";

    ngOnInit() {
    }

    onClick() {
        $("#modalAlert").removeClass("show");
    }
}
