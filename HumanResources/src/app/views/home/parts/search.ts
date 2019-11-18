import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../../services/site';
import { Lib } from '../../../lib/methods';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'hr-homesearch',
    templateUrl: './search.html'
})

export class HomeSearchComponent {
    errorMsg: string;

    searchForm: FormGroup;

    data: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            Words: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            City: new FormControl(null),
        });

        ScriptsComponent.Select(".chosen-city");

        setTimeout(() => {
            Lib.ComboChange("slcCity");
        }, 2500);
    }

    onClick() {
        this.data = new Object();

        this.data.Words = this.searchForm.get("Words").value;
        this.data.City = $("#slcCity").children("option[selected='selected']").val();

        this.service.post("Search", "HomeSearch", this.data).subscribe((answer: boolean) => {

        }, resError => this.errorMsg = resError);
    }
}
