import { Component } from '@angular/core';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'hr-homequestion',
    templateUrl: './question.html'
})

export class HomeQuestionComponent {
    errorMsg: string;

    constructor(private service: SiteService) {
    }

    ngOnInit() {
    }
}
