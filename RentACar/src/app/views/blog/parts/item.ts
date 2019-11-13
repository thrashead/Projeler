import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../../../services/site';
import { ScriptsComponent } from '../../shared/controls/scripts';

@Component({
    selector: 'rac-blogitem',
    templateUrl: './item.html'
})

export class BlogItemComponent {
    url: string;
    errorMsg: string;

    @Output() alert: string;
    @Output() titleEvnt = new EventEmitter<string>();
    @Output() urlEvnt = new EventEmitter<string>();

    reviewForm: FormGroup;

    blog: any = {};
    data: any;
    simPostList: any;
    commentList: any;
    pictureList: any;

    @Input() langs: any;
    @Input() popularLangs: any;
    @Input() categoriesLangs: any;
    @Input() searchLangs: any;
    @Input() callusLangs: any;
    @Input() booknowLangs: any;

    constructor(private service: SiteService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        this.reviewForm = this.formBuilder.group({
            Sender: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            Mail: new FormControl(null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
            Message: new FormControl(null, [Validators.required, Validators.minLength(25), Validators.maxLength(255)])
        });

        this.route.params.subscribe(params => {
            this.url = params['url'];

            this.GetBlogPost(this.url);
        });
    }

    onClick() {
        this.data = new Object();

        this.data.BlogID = this.blog.ID;
        this.data.Sender = this.reviewForm.get("Sender").value;
        this.data.Mail = this.reviewForm.get("Mail").value;
        this.data.Message = this.reviewForm.get("Message").value;

        this.service.post("Site", "SendReview", this.data).subscribe((resData: any) => {
            $("#modalAlert").addClass("show");

            if (resData == true) {
                this.alert = this.langs.review.alert;

                this.reviewForm.reset();
            }
            else {
                this.alert = this.langs.review.Error;
            }
        }, resError => this.errorMsg = resError);
    }

    //BlogPost
    GetBlogPost(url: string) {
        this.service.get("Site", "GetBlogPostByUrl", url).subscribe((resData: any) => {
            this.blog = resData;

            this.titleEvnt.emit(this.blog.Title);
            this.urlEvnt.emit(this.blog.Url);

            if (resData.Tags != null) {
                this.service.get("Site", "GetBlogSimilarPosts", url, resData.Tags, 2).subscribe((resData: any) => {
                    this.simPostList = resData;
                }, resError => this.errorMsg = resError);
            }

            this.service.get("Site", "GetBlogPictures", resData.ID).subscribe((resData: any) => {
                this.pictureList = resData;

                ScriptsComponent.BXSlider();
            }, resError => this.errorMsg = resError);

            this.service.get("Site", "GetBlogComments", resData.ID).subscribe((resData: any) => {
                this.commentList = resData;
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
}
