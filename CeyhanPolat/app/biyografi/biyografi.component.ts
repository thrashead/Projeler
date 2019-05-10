import { Component } from "@angular/core";
import { CPService } from "../cp.service";

@Component({
    templateUrl: 'app/biyografi/biyografi.component.html',
    providers: [CPService]
})

export class BiyografiComponent {
    biyografi: [];
    errorMsg: string;

    constructor(private _cpService: CPService) {
    }

    ngOnInit() {
        this._cpService.getBiyografi()
            .subscribe(resBiyografiData => this.biyografi = resBiyografiData,
                resError => this.errorMsg = resError);
    }
}