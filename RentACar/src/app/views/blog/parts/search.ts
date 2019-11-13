import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiteService } from '../../../services/site';

@Component({
    selector: 'rac-blogsearch',
    templateUrl: './search.html'
})

export class BlogSearchComponent {
    errorMsg: string;

    searchForm: FormGroup;

    words: string;

    @Input() langs: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.searchForm = this.formBuilder.group({
            Words: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        });
    }

    onClick() {
        this.words = this.searchForm.get("Words").value;

        this.service.get("Site", "SetBlogSearchWords", this.words).subscribe((resData: any) => {
            this.router.navigate(['/'], { skipLocationChange: true }).then(() => { this.router.navigate(['/Blog/List/Arama-Sonuclari']) });
        }, resError => this.errorMsg = resError);
    }
}
