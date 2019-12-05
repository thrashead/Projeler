import { Component, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { Router, ActivationEnd, RouterEvent } from '@angular/router';
//import '../../../../../Content/js/email-decode.min.js';
//import '../../../../../Content/js/jquery.min.js';
//import '../../../../../Content/js/modernizr.js';
//import '../../../../../Content/js/pathscript.js';
//import '../../../../../Content/js/script.js';
import '../../../../../Content/js/bootstrap.min.js';
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

	static Slick(classid: string) {
		if (classid == '.main-slider-sec') {
			$(classid).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				autoplay: false,
				slide: 'li',
				fade: false,
				infinite: true,
				dots: false
			});
		}
		else if (classid == '#reviews-carousel') {
			$(classid).slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
				autoplay: true,
				slide: 'div',
				fade: false,
				infinite: true,
				dots: true,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: false,
							centerPadding: '0px',
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: true,
							centerPadding: '0px',
							dots: true
						}
					}
				]
			});
		}
		else if (classid == '#companies-carousel') {
			$(classid).slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: true,
				autoplay: true,
				slide: 'div',
				fade: false,
				infinite: true,
				dots: false,
				responsive: [
					{
						breakpoint: 980,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: false,
							centerPadding: '0px',
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: false,
							centerPadding: '0px',
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 520,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: false,
							centerPadding: '0px',
							dots: true,
							arrows: false
						}
					}
				]
			});
		}
		else if (classid == '#team-carousel') {
			$(classid).slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: false,
				autoplay: false,
				slide: 'div',
				fade: false,
				infinite: true,
				dots: true,
				responsive: [
					{
						breakpoint: 980,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: false,
							centerPadding: '0px',
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: false,
							centerPadding: '0px',
							dots: true,
							arrows: false
						}
					},
					{
						breakpoint: 520,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: false,
							centerPadding: '0px',
							dots: true,
							arrows: false
						}
					}
				]
			});
		}
		else if (classid == '#reviews') {
			$(classid).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				autoplay: false,
				slide: 'div',
				fade: false,
				infinite: true,
				dots: true
			});
		}
		else if (classid == '.sport-wide-posts') {
			$(classid).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				slide: 'li',
				fade: false,
				asNavFor: '.sport-wide-navs'
			});
		}
		else if (classid == '.sport-wide-navs') {
			$(classid).slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: '.sport-wide-posts',
				dots: false,
				arrows: false,
				slide: 'li',
				vertical: true,
				centerMode: true,
				centerPadding: '0px',
				focusOnSelect: true,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							infinite: true,
							vertical: true,
							centerMode: true,
							centerPadding: '0px',
							dots: false
						}
					},
					{
						breakpoint: 980,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: true,
							centerPadding: '0px',
							dots: false
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: true,
							centerPadding: '0px',
							dots: false
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							infinite: true,
							vertical: false,
							centerMode: true,
							centerPadding: '0px',
							dots: false
						}
					}
				]
			});
		}
	}

	static Select(classid: string) {
		$(classid).chosen({ disable_search_threshold: 10 });
	}

	static Select2() {
		$('.action-center > span').off('click').on('click', function () {
			var active = $(this).parent().parent().parent().hasClass('active');

			if (!active) {
				$('.action-center ul').fadeOut();
				$('.emply-resume-list').removeClass('active');
				$(this).next('ul').fadeIn();
				$(this).parent().parent().parent().addClass('active');
			}
			else {
				$('.action-center ul').fadeOut();
				$('.emply-resume-list').removeClass('active');
			}
		});
		$('body').off('click').on('click', function () {
			$('.action-center ul').fadeOut();
			$('.emply-resume-list').removeClass('active');
		});
		$(".action-center").off('click').on("click", function (e) {
			e.stopPropagation();
		});
	}

	static CircleProgress(classid: string) {
		$(classid).circleProgress({
			startAngle: -Math.PI / 8 * 0,
			value: 0.8,
			emptyFill: 'rgba(0, 0, 0, 0)',
			fill: { gradient: ['#fa3979', '#e22d68'] }
		}).on('circle-animation-progress', function (event, progress) {
			$(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
		});
	}

	static ToggleMenu(classid: string) {
		$(classid + '.open').next().slideDown();
		$(classid + '.closed').next().slideUp();
		$(classid).off('click').on('click', function () {
			$(this).next().slideToggle();
			$(this).toggleClass('active');
			$(this).toggleClass('closed');
		});
	}
}