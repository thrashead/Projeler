import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../../services/site';

@Component({
    selector: 'hr-respsearch',
    templateUrl: './search.html'
})

export class RespSearchComponent {
    errorMsg: string;

    searchForm: FormGroup;

    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            Words: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        });
    }

    onClick() {
        this.data = new Object();

        this.data.Words = this.searchForm.get("Words").value;

        this.service.post("Search", "HomeSearch", this.data).subscribe((answer: boolean) => {
        
        }, resError => this.errorMsg = resError);
    }
}
