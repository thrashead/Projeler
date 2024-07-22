(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-about-about-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/views/about/index.html":
/*!******************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/about/index.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<rac-aboutheader [langs]=\"headerLangs\"></rac-aboutheader>\r\n<rac-aboutbreadcumbs [langs]=\"breadcumbsLangs\"></rac-aboutbreadcumbs>\r\n<rac-aboutbest [langs]=\"bestLangs\"></rac-aboutbest>\r\n<rac-aboutwhat [langs]=\"whatLangs\"></rac-aboutwhat>\r\n<rac-aboutmore [langs]=\"moreLangs\"></rac-aboutmore>\r\n<rac-aboutworkers [langs]=\"workersLangs\"></rac-aboutworkers>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/best.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/about/parts/best.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--b-best-->\r\n<section class=\"b-best\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-6 col-xs-12\">\r\n                <div class=\"b-best__info\">\r\n                    <header class=\"s-lineDownLeft b-best__info-head\">\r\n                        <h2 class=\"wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.best.ShortDescription }}</h2>\r\n                    </header>\r\n                    <h6 class=\"wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.best.ShortDescription2 }}</h6>\r\n                    <p class=\"wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.best.Description }}</p>\r\n                    <a routerLink=\"/Cars/List\" class=\"btn m-btn m-readMore wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.gotolist }}<span class=\"fa fa-angle-right\"></span></a>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-6 col-xs-12\">\r\n                <img class=\"img-responsive center-block wow zoomInUp\" data-wow-delay=\"0.5s\" alt=\"best\" src=\"/RentACar/Uploads/{{ picbest }}\" />\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--b-best-->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/breadcumbs.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/about/parts/breadcumbs.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--b-breadCumbs-->\r\n<div class=\"b-breadCumbs s-shadow wow zoomInUp\" data-wow-delay=\"0.5s\">\r\n    <div class=\"container\">\r\n        <a routerLink=\"/\" class=\"b-breadCumbs__page\">{{ langs?.menu.home }}</a><span class=\"fa fa-angle-right\"></span>\r\n        <a routerLink=\"/About\" class=\"b-breadCumbs__page m-active\">{{ langs?.menu.about }}</a>\r\n    </div>\r\n</div>\r\n<!--b-breadCumbs-->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/header.html":
/*!*************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/about/parts/header.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--b-pageHeader-->\r\n<section class=\"b-pageHeader\" [style.backgroundImage]=\"'url(/RentACar/Uploads/' + banner + ')'\">\r\n    <div class=\"container\">\r\n        <h1 class=\" wow zoomInLeft\" data-wow-delay=\"0.5s\">{{ langs?.header.ShortDescription }}</h1>\r\n        <div class=\"b-pageHeader__search wow zoomInRight\" data-wow-delay=\"0.5s\">\r\n            <h3>{{ langs?.header.ShortDescription2 }}</h3>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--b-pageHeader-->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/more.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/about/parts/more.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--b-more-->\r\n<section class=\"b-more\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-6 col-xs-12\">\r\n                <div class=\"b-more__why wow zoomInLeft\" data-wow-delay=\"0.5s\">\r\n                    <h2 class=\"s-title\">{{ langs?.why.ShortDescription }}</h2>\r\n                    <p [innerHTML]=\"langs?.why.Description\"></p>\r\n                    <p [innerHTML]=\"langs?.why.Description2\"></p>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-sm-6 col-xs-12\">\r\n                <div class=\"b-more__info wow zoomInRight\" data-wow-delay=\"0.5s\">\r\n                    <h2 class=\"s-title\">{{ langs?.info }}</h2>\r\n\r\n                    <div class=\"b-more__info-block\" *ngFor=\"let item of langs?.moreList\">\r\n                        <div class=\"b-more__info-block-title\">{{ item?.ShortDescription }}<a class=\"j-more\" href=\"javascript:;\"><span class=\"fa fa-angle-left\"></span></a></div>\r\n                        <div class=\"b-more__info-block-inside j-inside\">\r\n                            <p [innerHTML]=\"item?.Description\"></p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--b-more-->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/what.html":
/*!***********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/about/parts/what.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--b-what-->\r\n<section class=\"b-what s-shadow m-home\">\r\n    <div class=\"container\">\r\n        <h3 class=\"s-titleBg wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.whathead?.ShortDescription }}</h3><br />\r\n        <h2 class=\"s-title wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.whathead?.ShortDescription2 }}</h2>\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-4 col-xs-12\">\r\n                <div class=\"b-world__item wow zoomInLeft\" data-wow-delay=\"0.5s\">\r\n                    <img class=\"img-responsive\" src=\"/RentACar/Uploads/{{ picwhatprice }}\" alt=\"wolks\" />\r\n                    <div class=\"b-world__item-val\">\r\n                        <span class=\"b-world__item-val-title\">{{ langs?.whatprice?.ShortDescription }}</span>\r\n                    </div>\r\n                    <h2>{{ langs?.whatprice?.ShortDescription2 }}</h2>\r\n                    <p>\r\n                        {{ langs?.whatprice?.Description }}\r\n                    </p>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-4 col-xs-12\">\r\n                <div class=\"b-world__item wow zoomInUp\" data-wow-delay=\"0.5s\">\r\n                    <img class=\"img-responsive\" src=\"/RentACar/Uploads/{{ picwhatfleet }}\" alt=\"mazda\" />\r\n                    <div class=\"b-world__item-val\">\r\n                        <span class=\"b-world__item-val-title\">{{ langs?.whatfleet?.ShortDescription }}</span>\r\n                    </div>\r\n                    <h2>{{ langs?.whatfleet?.ShortDescription2 }}</h2>\r\n                    <p>\r\n                        {{ langs?.whatfleet?.Description }}\r\n                    </p>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-sm-4 col-xs-12\">\r\n                <div class=\"b-world__item wow zoomInRight\" data-wow-delay=\"0.5s\">\r\n                    <img class=\"img-responsive\" src=\"/RentACar/Uploads/{{ picwhatsafety }}\" alt=\"chevrolet\" />\r\n                    <div class=\"b-world__item-val\">\r\n                        <span class=\"b-world__item-val-title\">{{ langs?.whatsafety?.ShortDescription }}</span>\r\n                    </div>\r\n                    <h2>{{ langs?.whatsafety?.ShortDescription2 }}</h2>\r\n                    <p>\r\n                        {{ langs?.whatsafety?.Description }}\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--b-what-->"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/workers.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/views/about/parts/workers.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--b-personal-->\r\n<section class=\"b-personal s-shadow\">\r\n    <div class=\"container\">\r\n        <h3 class=\"s-titleBg wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.workers.ShortDescription }}</h3><br />\r\n        <h2 class=\"s-title wow zoomInUp\" data-wow-delay=\"0.5s\">{{ langs?.workers.ShortDescription2 }}</h2>\r\n        <div id=\"carousel-small\" class=\"owl-carousel enable-owl-carousel\" data-items=\"4\" data-navigation=\"true\" data-auto-play=\"true\" \r\n             data-stop-on-hover=\"true\" data-items-desktop=\"4\" data-items-desktop-small=\"3\" data-items-tablet=\"2\" data-items-tablet-small=\"2\">\r\n            \r\n            <div *ngFor=\"let item of workerList\">\r\n                <div class=\"b-personal__worker wow zoomInUp\" data-wow-delay=\"0.5s\">\r\n                    <div class=\"b-personal__worker-img\">\r\n                        <img src=\"/RentACar/Uploads/{{ item?.PictureUrl }}\" class=\"img-responsive\" alt=\"jason\" />\r\n                    </div>\r\n                    <h6>{{ item?.Position }}</h6>\r\n                    <div class=\"b-personal__worker-name s-lineDownLeft\">\r\n                        <h4 class=\"s-titleDet\">{{ item?.NameSurname }}</h4>\r\n                    </div>\r\n                    <p>\r\n                        {{ item?.Description }}\r\n                    </p>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</section>\r\n<!--b-personal-->"

/***/ }),

/***/ "./src/app/views/about/about-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/about/about-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: AboutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutRoutingModule", function() { return AboutRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! . */ "./src/app/views/about/index.ts");




const routes = [
    { path: 'About', component: ___WEBPACK_IMPORTED_MODULE_3__["AboutComponent"] },
];
let AboutRoutingModule = class AboutRoutingModule {
};
AboutRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AboutRoutingModule);



/***/ }),

/***/ "./src/app/views/about/about.module.ts":
/*!*********************************************!*\
  !*** ./src/app/views/about/about.module.ts ***!
  \*********************************************/
/*! exports provided: AboutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutModule", function() { return AboutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _views_about__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../views/about */ "./src/app/views/about/index.ts");
/* harmony import */ var _views_about_parts_header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../views/about/parts/header */ "./src/app/views/about/parts/header.ts");
/* harmony import */ var _views_about_parts_breadcumbs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../views/about/parts/breadcumbs */ "./src/app/views/about/parts/breadcumbs.ts");
/* harmony import */ var _views_about_parts_best__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../views/about/parts/best */ "./src/app/views/about/parts/best.ts");
/* harmony import */ var _views_about_parts_what__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../views/about/parts/what */ "./src/app/views/about/parts/what.ts");
/* harmony import */ var _views_about_parts_more__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../views/about/parts/more */ "./src/app/views/about/parts/more.ts");
/* harmony import */ var _views_about_parts_workers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../views/about/parts/workers */ "./src/app/views/about/parts/workers.ts");
/* harmony import */ var _about_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./about-routing.module */ "./src/app/views/about/about-routing.module.ts");
/* harmony import */ var _services_site__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/site */ "./src/app/services/site.ts");
/* harmony import */ var _lib_methods__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib/methods */ "./src/app/lib/methods.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");













let AboutModule = class AboutModule {
};
AboutModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _views_about__WEBPACK_IMPORTED_MODULE_2__["AboutComponent"],
            _views_about_parts_header__WEBPACK_IMPORTED_MODULE_3__["AboutHeaderComponent"],
            _views_about_parts_breadcumbs__WEBPACK_IMPORTED_MODULE_4__["AboutBreadCumbsComponent"],
            _views_about_parts_best__WEBPACK_IMPORTED_MODULE_5__["AboutBestComponent"],
            _views_about_parts_what__WEBPACK_IMPORTED_MODULE_6__["AboutWhatComponent"],
            _views_about_parts_more__WEBPACK_IMPORTED_MODULE_7__["AboutMoreComponent"],
            _views_about_parts_workers__WEBPACK_IMPORTED_MODULE_8__["AboutWorkersComponent"],
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_12__["CommonModule"],
            _about_routing_module__WEBPACK_IMPORTED_MODULE_9__["AboutRoutingModule"]
        ],
        providers: [
            _services_site__WEBPACK_IMPORTED_MODULE_10__["SiteService"],
            _lib_methods__WEBPACK_IMPORTED_MODULE_11__["Lib"],
        ],
    })
], AboutModule);



/***/ }),

/***/ "./src/app/views/about/index.ts":
/*!**************************************!*\
  !*** ./src/app/views/about/index.ts ***!
  \**************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/site */ "./src/app/services/site.ts");
/* harmony import */ var _lib_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/methods */ "./src/app/lib/methods.ts");




let AboutComponent = class AboutComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.SetLangContents();
    }
    //LangContent
    SetLangContents() {
        this.PushLangItems();
        this.service.post("Site", "SetLangContents", this.langItems).subscribe((resData) => {
            this.moreLangs = new Object();
            this.moreLangs.why = new Object();
            this.moreLangs.moreList = new Array();
            this.breadcumbsLangs = new Object();
            this.breadcumbsLangs.menu = new Object();
            this.headerLangs = new Object();
            this.workersLangs = new Object();
            this.bestLangs = new Object();
            this.whatLangs = new Object();
            this.whatLangs.whathead = new Object();
            this.whatLangs.whatprice = new Object();
            this.whatLangs.whatfleet = new Object();
            this.whatLangs.whatsafety = new Object();
            resData.forEach((item, i) => {
                switch (item.Code) {
                    //More
                    case "about_more_info":
                        this.moreLangs.moreList.push(item);
                        break;
                    case "about_more":
                        switch (item.ShortCode) {
                            case "why":
                                this.moreLangs.why = item;
                                break;
                            case "info":
                                this.moreLangs.info = item.ShortDescription;
                                break;
                        }
                        break;
                    //BreadCumbs
                    case "menu":
                        switch (item.ShortCode) {
                            case "home":
                                this.breadcumbsLangs.menu.home = item.ShortDescription2;
                                break;
                            case "about":
                                this.breadcumbsLangs.menu.about = item.ShortDescription2;
                                break;
                        }
                        break;
                    //Header
                    case "about_head":
                        this.headerLangs.header = item;
                        break;
                    //Workers
                    case "about_workers":
                        this.workersLangs.workers = item;
                        break;
                    //Best
                    case "cmn_go_list":
                        this.bestLangs.gotolist = item.ShortDescription2;
                        break;
                    case "about_best":
                        this.bestLangs.best = item;
                        break;
                    //What
                    case "about_what":
                        switch (item.ShortCode) {
                            case "head":
                                this.whatLangs.whathead = item;
                                break;
                            case "price":
                                this.whatLangs.whatprice = item;
                                break;
                            case "fleet":
                                this.whatLangs.whatfleet = item;
                                break;
                            case "safety":
                                this.whatLangs.whatsafety = item;
                                break;
                        }
                        break;
                }
            });
        }, resError => this.errorMsg = resError);
    }
    PushLangItems() {
        this.langItems = new Array();
        //More
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "about_more_info"));
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "about_more", "why"));
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "about_more", "info"));
        //BreadCumbs
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "menu", "home"));
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "menu", "about"));
        //Header
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "about_head"));
        //Workers
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "about_workers"));
        //Best
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "cmn_go_list"));
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "about_best"));
        //What
        this.langItems.push(_lib_methods__WEBPACK_IMPORTED_MODULE_3__["Lib"].SetLangItem(this.langItem, "about_what"));
    }
};
AboutComponent.ctorParameters = () => [
    { type: _services_site__WEBPACK_IMPORTED_MODULE_2__["SiteService"] }
];
AboutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        template: __webpack_require__(/*! raw-loader!./index.html */ "./node_modules/raw-loader/index.js!./src/app/views/about/index.html")
    })
], AboutComponent);



/***/ }),

/***/ "./src/app/views/about/parts/best.ts":
/*!*******************************************!*\
  !*** ./src/app/views/about/parts/best.ts ***!
  \*******************************************/
/*! exports provided: AboutBestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutBestComponent", function() { return AboutBestComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/site */ "./src/app/services/site.ts");



let AboutBestComponent = class AboutBestComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.GetPicture();
    }
    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "about_best", 1).subscribe((resData) => {
            this.picbest = resData;
        }, resError => this.errorMsg = resError);
    }
};
AboutBestComponent.ctorParameters = () => [
    { type: _services_site__WEBPACK_IMPORTED_MODULE_2__["SiteService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AboutBestComponent.prototype, "langs", void 0);
AboutBestComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'rac-aboutbest',
        template: __webpack_require__(/*! raw-loader!./best.html */ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/best.html")
    })
], AboutBestComponent);



/***/ }),

/***/ "./src/app/views/about/parts/breadcumbs.ts":
/*!*************************************************!*\
  !*** ./src/app/views/about/parts/breadcumbs.ts ***!
  \*************************************************/
/*! exports provided: AboutBreadCumbsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutBreadCumbsComponent", function() { return AboutBreadCumbsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AboutBreadCumbsComponent = class AboutBreadCumbsComponent {
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AboutBreadCumbsComponent.prototype, "langs", void 0);
AboutBreadCumbsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'rac-aboutbreadcumbs',
        template: __webpack_require__(/*! raw-loader!./breadcumbs.html */ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/breadcumbs.html")
    })
], AboutBreadCumbsComponent);



/***/ }),

/***/ "./src/app/views/about/parts/header.ts":
/*!*********************************************!*\
  !*** ./src/app/views/about/parts/header.ts ***!
  \*********************************************/
/*! exports provided: AboutHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutHeaderComponent", function() { return AboutHeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/site */ "./src/app/services/site.ts");



let AboutHeaderComponent = class AboutHeaderComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.GetPicture();
    }
    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "banner_about", 1).subscribe((resData) => {
            this.banner = resData;
        }, resError => this.errorMsg = resError);
    }
};
AboutHeaderComponent.ctorParameters = () => [
    { type: _services_site__WEBPACK_IMPORTED_MODULE_2__["SiteService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AboutHeaderComponent.prototype, "langs", void 0);
AboutHeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'rac-aboutheader',
        template: __webpack_require__(/*! raw-loader!./header.html */ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/header.html")
    })
], AboutHeaderComponent);



/***/ }),

/***/ "./src/app/views/about/parts/more.ts":
/*!*******************************************!*\
  !*** ./src/app/views/about/parts/more.ts ***!
  \*******************************************/
/*! exports provided: AboutMoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutMoreComponent", function() { return AboutMoreComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AboutMoreComponent = class AboutMoreComponent {
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AboutMoreComponent.prototype, "langs", void 0);
AboutMoreComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'rac-aboutmore',
        template: __webpack_require__(/*! raw-loader!./more.html */ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/more.html")
    })
], AboutMoreComponent);



/***/ }),

/***/ "./src/app/views/about/parts/what.ts":
/*!*******************************************!*\
  !*** ./src/app/views/about/parts/what.ts ***!
  \*******************************************/
/*! exports provided: AboutWhatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutWhatComponent", function() { return AboutWhatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/site */ "./src/app/services/site.ts");



let AboutWhatComponent = class AboutWhatComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.GetPicture();
    }
    //Picture
    GetPicture() {
        this.service.get("Site", "GetPicturesByCode", "about_what_price", 1).subscribe((resData) => {
            this.picwhatprice = resData;
            this.service.get("Site", "GetPicturesByCode", "about_what_fleet", 1).subscribe((resData) => {
                this.picwhatfleet = resData;
                this.service.get("Site", "GetPicturesByCode", "about_what_safety", 1).subscribe((resData) => {
                    this.picwhatsafety = resData;
                }, resError => this.errorMsg = resError);
            }, resError => this.errorMsg = resError);
        }, resError => this.errorMsg = resError);
    }
};
AboutWhatComponent.ctorParameters = () => [
    { type: _services_site__WEBPACK_IMPORTED_MODULE_2__["SiteService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AboutWhatComponent.prototype, "langs", void 0);
AboutWhatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'rac-aboutwhat',
        template: __webpack_require__(/*! raw-loader!./what.html */ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/what.html")
    })
], AboutWhatComponent);



/***/ }),

/***/ "./src/app/views/about/parts/workers.ts":
/*!**********************************************!*\
  !*** ./src/app/views/about/parts/workers.ts ***!
  \**********************************************/
/*! exports provided: AboutWorkersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutWorkersComponent", function() { return AboutWorkersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/site */ "./src/app/services/site.ts");
/* harmony import */ var _shared_controls_scripts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/controls/scripts */ "./src/app/views/shared/controls/scripts.ts");




let AboutWorkersComponent = class AboutWorkersComponent {
    constructor(service) {
        this.service = service;
    }
    ngOnInit() {
        this.GetWorkers();
    }
    //Workers
    GetWorkers() {
        this.service.get("Site", "GetWorkers").subscribe((resData) => {
            this.workerList = resData;
            _shared_controls_scripts__WEBPACK_IMPORTED_MODULE_3__["ScriptsComponent"].OwlCarousel();
        }, resError => this.errorMsg = resError);
    }
};
AboutWorkersComponent.ctorParameters = () => [
    { type: _services_site__WEBPACK_IMPORTED_MODULE_2__["SiteService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], AboutWorkersComponent.prototype, "langs", void 0);
AboutWorkersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'rac-aboutworkers',
        template: __webpack_require__(/*! raw-loader!./workers.html */ "./node_modules/raw-loader/index.js!./src/app/views/about/parts/workers.html")
    })
], AboutWorkersComponent);



/***/ })

}]);
//# sourceMappingURL=views-about-about-module.js.map