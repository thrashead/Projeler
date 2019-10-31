import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Router, ActivationEnd, RouterEvent } from '@angular/router';
//import '../../../../../Content/js/email-decode.min.js';
//import '../../../../../Content/js/jquery.min.js';
//import '../../../../../Content/js/modernizr.js';
//import '../../../../../Content/js/pathscript.js';
//import '../../../../../Content/js/script.js';
//import '../../../../../Content/js/bootstrap.min.js';
//import '../../../../../Content/js/wow.min.js';
//import '../../../../../Content/js/slick.min.js';
//import '../../../../../Content/js/parallax.js';
//import '../../../../../Content/js/select-chosen.js';

@Component({
    selector: 'hr-scripts',
    template: '',
    styleUrls: [
        '../../../../../Content/css/style.css',
        '../../../../../Content/css/bootstrap-grid.css',
        '../../../../../Content/css/icons.css',
        '../../../../../Content/css/animate.min.css',
        '../../../../../Content/css/style.css',
        '../../../../../Content/css/responsive.css',
        '../../../../../Content/css/chosen.css',
        '../../../../../Content/css/colors/colors.css',
        '../../../../../Content/css/bootstrap.css',
        '../../../../../Content/css/fonts/font-awesome/font-awesome.min.css',
        '../../../../../Content/css/custom.css',
    ],
    encapsulation: ViewEncapsulation.None
})

export class ScriptsComponent implements AfterViewChecked {
    constructor(private router: Router) {
    }

    ngAfterViewChecked() {
        //$('.page-loading').fadeOut();
    }

    ngOnInit() {
        this.LoadScripts();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                this.LoadScripts();

                //setTimeout(() => {
                //    $('.page-loading').fadeOut();
                //}, 300);
            }
        });
    }

    LoadScripts() {
    }
}