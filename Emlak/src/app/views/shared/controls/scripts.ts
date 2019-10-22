import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Router, ActivationEnd, RouterEvent } from '@angular/router';
//import '../../../../../Content/js/modernizr-2.6.2.min.js';
import '../../../../../Content/js/jquery-1.10.2.min.js';
//import '../../../../../Content/new/bootstrap/js/bootstrap.min.js';
import '../../../../../Content/js/bootstrap-hover-dropdown.js';
import '../../../../../Content/js/owl.carousel.min.js';
import '../../../../../Content/js/icheck.min.js';
import '../../../../../Content/js/price-range.js';
import '../../../../../Content/js/lightslider.min.js';
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
        //'../../../../../Content/css/animate.css',
        '../../../../../Content/css/bootstrap.min.css',
        '../../../../../Content/css/icheck.min_all.css',
        '../../../../../Content/css/price-range.css',
        '../../../../../Content/css/owl.carousel.css',
        '../../../../../Content/css/owl.theme.css',
        '../../../../../Content/css/owl.transitions.css',
        '../../../../../Content/css/style.css',
        '../../../../../Content/css/responsive.css',
        '../../../../../Content/css/lightslider.min.css',
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

        $('input').iCheck({
            checkboxClass: 'icheckbox_square-yellow',
            radioClass: 'iradio_square-yellow',
            increaseArea: '20%' // optional
        });


        $('.layout-grid').off('click').on('click', function () {
            $('.layout-grid').addClass('active');
            $('.layout-list').removeClass('active');

            $('#list-type').removeClass('proerty-th-list');
            $('#list-type').addClass('proerty-th');

        });

        $('.layout-list').off('click').on('click', function () {
            $('.layout-grid').removeClass('active');
            $('.layout-list').addClass('active');

            $('#list-type').addClass('proerty-th-list');
            $('#list-type').removeClass('proerty-th');
        });


        setTimeout(() => {
            $("#bg-slider").owlCarousel({
                navigation: false, // Show next and prev buttons
                slideSpeed: 100,
                autoPlay: 5000,
                paginationSpeed: 100,
                singleItem: true,
                mouseDrag: false,
                transitionStyle: "fade",
                //"singleItem:true" is a shortcut for:
                items : 1, 
                itemsDesktop : false,
                itemsDesktopSmall : false,
                itemsTablet: false,
                itemsMobile : false 
            });
            $("#prop-smlr-slide_0").owlCarousel({
                navigation: false, // Show next and prev buttons
                slideSpeed: 100,
                pagination: true,
                paginationSpeed: 100,
                items: 3

            });
            $("#testimonial-slider").owlCarousel({
                navigation: false, // Show next and prev buttons
                slideSpeed: 100,
                pagination: true,
                paginationSpeed: 100,
                items: 3
            });
            $("#news-slider").owlCarousel({
                navigation: false, // Show next and prev buttons
                slideSpeed: 100,
                pagination: true,
                //singleItem: true,
                transitionStyle: "fade",
                paginationSpeed: 100,
                items: 1,
                itemsDesktop: false,
                itemsDesktopSmall: false,
                itemsTablet: false,
                itemsMobile: false 
            });
        }, 1500);

        $('#fiyat1').slider();
        $('#roomCount1').slider();
        $('#salon1').slider();
        $('#katSayi1').slider();
        $('#bulunduguKat1').slider();
        $('#binaYas1').slider();
        $('#alan1').slider();

        var RGBChange = function () {
            $('#RGB').css('background', '#FDC600')
        };

        // Advanced search toggle
        var $SearchToggle = $('.search-form .search-toggle');
        $SearchToggle.hide();

        $('.search-form .toggle-btn').off("click").on('click', function (e) {
            e.preventDefault();
            $SearchToggle.slideToggle(300);
        });

        setTimeout(function () {
            $('#counter').text('0');
            $('#counter1').text('0');
            $('#counter2').text('0');
            $('#counter3').text('0');
            setInterval(function () {
                var curval = parseInt($('#counter').text());
                var curval1 = parseInt($('#counter1').text().replace(' ', ''));
                var curval2 = parseInt($('#counter2').text());
                var curval3 = parseInt($('#counter3').text());
                if (curval <= 1007) {
                    $('#counter').text(curval + 1);
                }
                if (curval1 <= 1280) {
                    $('#counter1').text(sdf_FTS((curval1 + 20), 0, ' '));
                }
                if (curval2 <= 145) {
                    $('#counter2').text(curval2 + 1);
                }
                if (curval3 <= 1022) {
                    $('#counter3').text(curval3 + 1);
                }
            }, 2);
        }, 500);

        function sdf_FTS(_number, _decimal, _separator) {
            var decimal = (typeof (_decimal) != 'undefined') ? _decimal : 2;
            var separator = (typeof (_separator) != 'undefined') ? _separator : '';
            var r = parseFloat(_number);
            var exp10 = Math.pow(10, decimal);
            r = Math.round(r * exp10) / exp10;
            var rr = Number(r).toFixed(decimal).toString().split('.');
            var b = rr[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1" + separator);
            var result = (rr[1] ? b + '.' + rr[1] : b);

            return result;
        }
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
