import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'hr-homecandidates',
    templateUrl: './candidates.html'
})

export class HomeCandidatesComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
        ScriptsComponent.Slick('#reviews-carousel');
    }
}
