import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Router, ActivationEnd, RouterEvent } from '@angular/router';
import '../../../../../Content/js/owl-carousel/owl.carousel.min.js'
import '../../../../../Content/js/bxslider/jquery.bxslider.min.js'
import '../../../../../Content/js/jquery.ui-slider.js'
import '../../../../../node_modules/wowjs/dist/wow.js'

import '../../../../../Content/js/pathscript.js';
import '../../../../../Content/js/script.js';

import { WOW } from "../../../../../node_modules/wowjs/dist/wow";


@Component({
    selector: 'rac-scripts',
    template: '',
    styleUrls: [
        '../../../../../Content/css/master.css',
        '../../../../../Content/css/switcher.css',
        '../../../../../node_modules/animate.css/animate.css',
        '../../../../../Content/css/style.css'
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
        this.PageLoader();
        this.Wow();
        this.Carousel();
        this.OwlCarousel();
        this.JTab();
        this.JMore();
        this.Slider();
        this.BXSlider();
        this.MenuActive();
        this.ScrollTop();
        this.EqualHeight();
    }

    //Carousel
    Carousel() {
        $(".carousel").carousel();

        $(".carousel-control.left").off("click").on("click", function () {
            $(".carousel").carousel("prev");
        });
        $(".carousel-control.right").off("click").on("click", function () {
            $(".carousel").carousel("next");
        });
    }

    //J-Tab
    JTab() {
        $('.j-tab').off('click').on('click', function (e) {
            var to = $($(this).attr('data-to'));
            if (to.length > 0) {
                if (to.css('display') == 'none') {
                    var tabs = to.parent().find('.j-tab');
                    if (tabs.length > 0) {
                        tabs.each(function (i, e) {
                            if ($(e).hasClass('m-active')) {
                                $(e).removeClass('s-lineDownCenter');
                                $(e).removeClass('m-active');
                            }
                            var to2 = $($(e).attr('data-to'));
                            if (to2.css('display') == 'block')
                                to2.css('display', 'none');
                        });
                    }
                    to.css('display', 'block');
                    if (!(($(this).hasClass('owl-next')) || ($(this).hasClass('owl-prev'))))
                        $(this).addClass('m-active s-lineDownCenter');
                    else {
                        $('.b-auto__main-toggle').each(function (i, e) {
                            if ($(e).attr('data-to').replace('#', '') == to.attr('id')) {
                                $(e).addClass('m-active s-lineDownCenter');
                            }
                        })
                    }
                }
            }
            e.preventDefault();
        });
    }

    //J-More
    JMore() {
        $('.j-more').off('click').on('click', function (e) {
            var inside = $(this).parent().parent().find('.j-inside');
            var span = $(this).find('span.fa');
            if (inside.length > 0) {
                span.toggleClass('fa-angle-left');
                span.toggleClass('fa-angle-down');
                $(this).parent().toggleClass('m-active');
                inside.toggleClass('m-active');
            }
            e.preventDefault();
        });
    }

    //ScrollTop
    ScrollTop() {
        $(window).off('scroll').on('scroll', function () {
            var fromTop = $(this).scrollTop();
            var display = 'none';
            if (fromTop > 650) {
                display = 'block';
            }
            $('#to-top').css({ 'display': display });
        });
        $('#to-top').off('click').on('click', function () {
            $('html, body').animate({ scrollTop: $("body").offset().top }, 300);
        });
    }

    //EqualHeight
    EqualHeight() {
        var equalHeight = $('body').data('equal-height');
        if (equalHeight && equalHeight.length) {
            var columns = $(equalHeight);
            var tallestcolumn = 0;
            columns.each(
                function () {
                    var currentHeight = $(this).height();
                    if (currentHeight > tallestcolumn) {
                        tallestcolumn = currentHeight;
                    }
                }
            );
            columns.height(tallestcolumn);
        }
    }

    //PageLoader
    PageLoader() {
        $('#page-preloader').show();
        window.scrollTo(0, 0);
    }

    //Wow
    Wow() {
        var scrollingAnimations = $('body').data("scrolling-animations");
        if (scrollingAnimations) {
            new WOW().init();
        }
    }

    //OwlCarousel
    OwlCarousel() {
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
    }

    //Slider
    Slider() {
        var slider = $('.slider').length;
        if (slider) {
            jQuery(".slider").slider({
                min: 100,
                max: 1000,
                values: [0, 1000],
                range: true,
                slide: function (event, ui) {
                    $(".ui-slider-handle span.min").text(ui.values[0]);
                    $(".ui-slider-handle span.max").text(ui.values[1]);
                },
                stop: function (event, ui) {
                    $("input.j-min").val(ui.values[0]);
                    $("input.j-max").val(ui.values[1]);
                }
            });
            $(".ui-slider-handle:first-of-type").append("<span class='min'>100</span>");
            $(".ui-slider-handle:last-of-type").append("<span class='max'>1000</span>");
        }
        $('.b-search__main-type h5 label').off('click').on('click', function () {
            $('.b-search__main-type').parent("div").removeAttr("data-selected");
            $(this).parent("h5").parent("div").attr("data-selected", "true");
        });
        $('.b-search__main-type-svg').off('click').on('click', function () {
            $('.b-search__main-type-svg').parent("div").removeAttr("data-selected");
            $(this).parent("div").attr("data-selected", "true");
        });
    }

    //BX-Slider
    BXSlider() {
        $(".enable-bx-slider").each(function (i) {
            var $bx = $(this);
            var pagerCustomData = $bx.data('pager-custom');
            var modeData = $bx.data('mode');
            var pagerSlideData = $bx.data('pager-slide');
            var modePagerData = $bx.data('mode-pager');
            var pagerQtyData = $bx.data('pager-qty');
            var realSlider = $bx.bxSlider({
                pagerCustom: pagerCustomData,
                mode: modeData,
            });
            if (pagerSlideData) {
                var realThumbSlider = $(pagerCustomData).bxSlider({
                    mode: modePagerData,
                    minSlides: pagerQtyData,
                    maxSlides: pagerQtyData,
                    moveSlides: 1,
                    slideMargin: 20,
                    pager: false,
                    infiniteLoop: false,
                    hideControlOnEnd: true,
                    nextText: '<span class="fa fa-angle-down"></span>',
                    prevText: '<span class="fa fa-angle-up"></span>'
                });
                linkRealSliders(realSlider, realThumbSlider, pagerCustomData);
                if ($(pagerCustomData + " a").length <= pagerQtyData) {
                    $(pagerCustomData + " .bx-next").hide();
                }
            }
        });
        function linkRealSliders(bigS, thumbS, sliderId) {
            $(sliderId).on("click", "a", function (event) {
                event.preventDefault();
                var newIndex = $(this).data("slide-index");
                bigS.goToSlide(newIndex);
            });
        }
    }

    //MenuActive
    MenuActive() {
        $("#hdnUrl").val(location.href);

        var MainPath = "http://localhost/RentACar";
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
            $(".b-nav__list ul li a[data-url='" + Urling.controller + "']").addClass("active");
            $(".b-footer__content-nav ul li a[data-url='" + Urling.controller + "']").addClass("active");
        }
        else {
            $(".b-nav__list ul li a[data-url='Index']").addClass("active");
            $(".b-footer__content-nav ul li a[data-url='Index']").addClass("active");
        }
    }
}