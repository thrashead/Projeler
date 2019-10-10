import { Component } from '@angular/core';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';

@Component({
    selector: 'rac-carbookingprogress',
    templateUrl: './progress.html'
})

export class CarsBookingProgressComponent {
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.ApplyProgress();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                this.ApplyProgress();
            }
        });
    }

    ApplyProgress() {
        let page = this.router.url.split('/')[this.router.url.split('/').length - 1];
        this.Clear();

        var step = $(".b-infoBar__progress-line-step");
        var stepInner = $(".b-infoBar__progress-line-step-circle-inner");

        switch (page) {
            case "Features":
                step.eq(0).addClass("m-active");

                stepInner.eq(0).addClass("m-active");
                stepInner.eq(1).addClass("m-active");
                break;
            case "Cars":
                step.eq(0).addClass("m-active");
                step.eq(1).addClass("m-active");

                stepInner.eq(0).addClass("m-active");
                stepInner.eq(1).addClass("m-active");
                stepInner.eq(2).addClass("m-active");
                break;
            case "Submit":
                step.eq(0).addClass("m-active");
                step.eq(1).addClass("m-active");
                step.eq(2).addClass("m-active");

                stepInner.eq(0).addClass("m-active");
                stepInner.eq(1).addClass("m-active");
                stepInner.eq(2).addClass("m-active");
                stepInner.eq(3).addClass("m-active");
                break;
            default:
                stepInner.eq(0).addClass("m-active");
                break;
        }
    }

    Clear() {
        var step = $(".b-infoBar__progress-line-step");
        var stepInner = $(".b-infoBar__progress-line-step-circle-inner");

        step.removeClass("m-active");
        stepInner.removeClass("m-active");
    }
}
