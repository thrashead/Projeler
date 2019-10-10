import { Component, Input } from '@angular/core';
import { Router, RouterEvent, ActivationEnd } from '@angular/router';

@Component({
    selector: 'rac-carbookingleftmenu',
    templateUrl: './leftmenu.html'
})

export class CarsBookingLeftMenuComponent {
    @Input() leftmenu: any;

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

        var arrow = "<div class=\"b-submit__aside-step-inner-info-triangle\"></div>";
        var step = $(".b-submit__aside-step");
        var stepInner = $(".b-submit__aside-step-inner");

        switch (page) {
            case "Features":
                step.eq(1).addClass("m-active");
                stepInner.eq(1).addClass("m-active");
                stepInner.eq(1).append(arrow);
                break;
            case "Cars":
                step.eq(2).addClass("m-active");
                stepInner.eq(2).addClass("m-active");
                stepInner.eq(2).append(arrow);
                break;
            case "Submit":
                step.eq(3).addClass("m-active");
                stepInner.eq(3).addClass("m-active");
                stepInner.eq(3).append(arrow);
                break;
            default:
                step.eq(0).addClass("m-active");
                stepInner.eq(0).addClass("m-active");
                stepInner.eq(0).append(arrow);
                break;
        }
    }

    Clear() {
        var arrow = $(".b-submit__aside-step-inner-info-triangle");
        var step = $(".b-submit__aside-step");
        var stepInner = $(".b-submit__aside-step-inner");

        arrow.remove();
        step.removeClass("m-active");
        stepInner.removeClass("m-active");
    }
}
