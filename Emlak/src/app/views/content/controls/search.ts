﻿import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SolAjaxService } from '../../../services/solajax';

@Component({
    selector: "emlak-contentsearch",
    templateUrl: './search.html'
})

export class ContentSearchComponent {
    errorMsg: string;

    @Input() aramaText: string;
    @Input() araText: string;

    Kelime: string;
    kod: string;

    searchForm: FormGroup;

    constructor(private solService: SolAjaxService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            Kelime: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        });
    }

    onSubmit() {
        this.Kelime = this.searchForm.get("Kelime").value;

        this.solService.getSolAraSonuc(this.Kelime, "kod")
            .subscribe((answer: any) => {
                if (answer != "") {
                    this.router.navigate(['/Emlak/Detay', answer.RouteUrl]);
                }
                else {
                    this.router.navigate(['/Emlak/Listele', this.Kelime]);
                }
            }, resError => this.errorMsg = resError);
    }
}