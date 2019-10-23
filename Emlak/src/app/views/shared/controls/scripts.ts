import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Router, ActivationEnd, RouterEvent } from '@angular/router';
//import '../../../../../Content/js/jquery-1.10.2.min.js';
import '../../../../../Content/js/bootstrap-hover-dropdown.js';
import '../../../../../Content/js/owl-carousel/owl.carousel.min.js';
import '../../../../../Content/js/jquery.ui-slider.js';
import '../../../../../Content/js/tdSlider/tdSlider.js';
import '../../../../../Content/js/main.js';

@Component({
    selector: 'emlak-scripts',
    template: '',
    styleUrls: [
        '../../../../../Content/css/normalize.css',
        '../../../../../Content/css/font-awesome.min.css',
        '../../../../../Content/css/fontello.css',
        '../../../../../Content/fonts/icon-7-stroke/css/pe-icon-7-stroke.css',
        '../../../../../Content/fonts/icon-7-stroke/css/helper.css',
        '../../../../../Content/css/bootstrap.min.css',
        '../../../../../Content/css/style.css',
        '../../../../../Content/css/responsive.css',
        '../../../../../Content/js/tdSlider/tdSlider.css',
        '../../../../../Content/css/stil.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class ScriptsComponent implements AfterViewChecked {
    constructor(private router: Router) {
    }

    ngAfterViewChecked() {
        $('#page-preloader').fadeOut("slow");
    }

    ngOnInit() {
        this.LoadScripts();

        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof ActivationEnd) {
                this.LoadScripts();

                setTimeout(() => {
                    $('#page-preloader').fadeOut("slow");
                }, 300);
            }
        });
    }

    LoadScripts() {
        this.MenuActive();
        this.Carousel();
        this.OwlCarousel();

        // Advanced search toggle
        var $SearchToggle = $('.search-form .search-toggle');
        $SearchToggle.hide();

        $('.search-form .toggle-btn').off("click").on('click', function (e) {
            e.preventDefault();
            $SearchToggle.slideToggle(300);
        });
    }

    //Carousel
    Carousel() {
        setTimeout(() => {
            $("#bg-slider").carousel();
        }, 2500);
    }

    //OwlCarousel
    OwlCarousel() {
        setTimeout(() => {
            $(".enable-owl-carousel").each(function (i) {
                var $owl = $(this);
                var itemsData = $owl.data('items');
                var autoPlayData = $owl.data('auto-play');
                var navigationData = $owl.data('navigation');
                var stopOnHoverData = $owl.data('stop-on-hover');
                var itemsDesktopData = $owl.data('items-desktop');
                var itemsDesktopSmallData = $owl.data('items-desktop-small');
                var itemsTabletData = $owl.data('items-tablet');
                var itemsTabletSmallData = $owl.data('items-tablet-small');
                $owl.owlCarousel({
                    items: itemsData,
                    pagination: false,
                    navigation: navigationData,
                    autoPlay: autoPlayData,
                    stopOnHover: stopOnHoverData,
                    navigationText: ["", ""],
                    itemsCustom: [
                        [0, 1],
                        [500, itemsTabletSmallData],
                        [710, itemsTabletData],
                        [992, itemsDesktopSmallData],
                        [1199, itemsDesktopData]
                    ],
                });
            });
        }, 2500);
    }

    //MenuActive
    MenuActive() {
        $("#hdnUrl").val(location.href);

        var MainPath = "http://localhost/Emlak";
        var Url = location.href;
        var Urling = Object();

        if (Url != undefined) {
            var tempurl = Url.replace(MainPath + "/", "");
            tempurl = tempurl.replace(";detail=true", "");

            var extParams = tempurl.split('?')[1];

            tempurl = tempurl.replace("?" + extParams, "");

            Urling.path = tempurl;
            Urling.controller = tempurl.split('/')[0];
            Urling.action = tempurl.split('/')[1];
            Urling.parameter = tempurl.split('/')[2];

            if (extParams != undefined)
                Urling.parameters = extParams.split('&');
        }

        $("ul.main-nav li a").removeClass("active");

        if (Urling.controller != "") {
            if ($("ul.main-nav li a[data-url='" + Urling.action + "']").length > 0) {
                $("ul.main-nav li a[data-url='" + Urling.action + "']").addClass("active");
            }
            else if ($("ul.main-nav li a[data-url='" + Urling.controller + "']").length > 0) {
                $("ul.main-nav li a[data-url='" + Urling.controller + "']").addClass("active");
            }
            else if ($("ul.main-nav li a[data-url2='" + Urling.action + "']").length > 0) {
                $("ul.main-nav li a[data-url2='" + Urling.action + "']").addClass("active");
            }
            else if ($("ul.main-nav li a[data-url2='" + Urling.controller + "']").length > 0) {
                $("ul.main-nav li a[data-url2='" + Urling.controller + "']").addClass("active");
            }
        }
        else {
            $("ul.main-nav li a[data-url='Index']").addClass("active");
        }
    }
}
