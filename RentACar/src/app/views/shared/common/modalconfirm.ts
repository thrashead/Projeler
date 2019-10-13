import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'rac-sharedmodalconfirm',
    templateUrl: './modalconfirm.html'
})

export class SharedModalConfirmComponent {
    @Input() confirm: string;
    ok: string = "Tamam";

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onClick() {
        $("#modalAlert").removeClass("show");
        this.router.navigate(['/']);
    }
}
