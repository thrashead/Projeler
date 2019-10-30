import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Router, ActivationEnd, RouterEvent } from '@angular/router';
import '../../../../../Content/js/pathscript.js';
import '../../../../../Content/js/script.js';

@Component({
    selector: 'hr-scripts',
    template: '',
    styleUrls: [
        '../../../../../Content/css/style.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class ScriptsComponent implements AfterViewChecked {
    constructor(private router: Router) {
    }

    ngAfterViewChecked() {
        //$('#page-preloader').fadeOut("slow");
    }

    ngOnInit() {
        this.LoadScripts();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                this.LoadScripts();

                //setTimeout(() => {
                //    $('#page-preloader').fadeOut("slow");
                //}, 300);
            }
        });
    }

    LoadScripts() {
    }

    //MenuActive
    MenuActive() {
        $("#hdnUrl").val(location.href);

        var MainPath = "http://localhost/HumanResources";
        var Url = location.href;
        var Urling = Object();

        if (Url != undefined) {
            var tempurl = Url.replace(MainPath + "/", "");
            var extParams = tempurl.split('?')[1];

            tempurl = tempurl.replace("?" + extParams, "");

            Urling.path = tempurl;
            Urling.controller = tempurl.split('/')[0];
            Urling.action = tempurl.split('/')[1];
            Urling.parameter = tempurl.split('/')[2];

            if (extParams != undefined)
                Urling.parameters = extParams.split('&');
        }

        $(".b-nav__list ul li a").removeClass("active");
        $(".b-footer__content-nav ul li a").removeClass("active");

        if (Urling.controller != "") {
            if ($(".b-nav__list ul li a[data-url='" + Urling.controller + "']").length > 0) {
                $(".b-nav__list ul li a[data-url='" + Urling.controller + "']").addClass("active");
                $(".b-footer__content-nav ul li a[data-url='" + Urling.controller + "']").addClass("active");
            }
            else if ($(".b-nav__list ul li a[data-url='" + Urling.action + "']").length > 0) {
                $(".b-nav__list ul li a[data-url='" + Urling.action + "']").addClass("active");
                $(".b-footer__content-nav ul li a[data-url='" + Urling.action + "']").addClass("active");
            }
            else if ($(".b-nav__list ul li a[data-url2='" + Urling.action + "']").length > 0) {
                $(".b-nav__list ul li a[data-url2='" + Urling.action + "']").addClass("active");
                $(".b-footer__content-nav ul li a[data-url2='" + Urling.action + "']").addClass("active");
            }
        }
        else {
            $(".b-nav__list ul li a[data-url='Index']").addClass("active");
            $(".b-footer__content-nav ul li a[data-url='Index']").addClass("active");
        }
    }
}