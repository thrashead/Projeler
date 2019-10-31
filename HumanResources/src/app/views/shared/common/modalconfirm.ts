import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'hr-modalconfirm',
    templateUrl: './modalconfirm.html'
})

export class ModalConfirmComponent {
    errorMsg: string;
    @Input() confirm: string;

    constructor(private service: SiteService, private router: Router) {
    }

    ngOnInit() {
    }

    onClick(result) {
        $("#modalConfirm").removeClass("show");

        if (result == true)
            this.router.navigate(['/']);
    }
}
