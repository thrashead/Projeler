import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakAjaxService } from "../services/emlakajax";
import { REAjaxService } from "../services/reajax";
import { ActivatedRoute } from '@angular/router';
var EmlakListeleComponent = /** @class */ (function () {
    function EmlakListeleComponent(_emlakService, _reService, route) {
        this._emlakService = _emlakService;
        this._reService = _reService;
        this.route = route;
        this.sayfalar = new Array();
    }
    EmlakListeleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.link = params['link'];
            _this.reData = new Object();
            _this.reData.OrderBy = "";
            _this.reData.Word = params['link'];
            _this.reData.Page = 1;
            _this.reData.Detail = params['detail'];
            _this.Listele(_this.reData);
            _this.KodlaGetir();
        });
    };
    EmlakListeleComponent.prototype.Listele = function (data) {
        var _this = this;
        $("#lblSonuc").css("display", "none");
        this._reService.getEmlakListele(data)
            .subscribe(function (resData) {
            _this.liste = resData;
            if (_this.liste.Adet > 12) {
                $(".IcerikMetin.Paging").css("display", "block");
            }
            else if (_this.liste.Adet <= 0) {
                $("#lblSonuc").css("display", "block");
            }
            _this.sayfalar = _this.sayiList(_this.liste.SayfaSayisi);
        }, function (resError) { return _this.errorMsg = resError; });
    };
    EmlakListeleComponent.prototype.sayiList = function (adet) {
        var sayilar = new Array();
        for (var i = 0; i < adet; i++) {
            sayilar[i] = i + 1;
        }
        return sayilar;
    };
    EmlakListeleComponent.prototype.onClick = function (event) {
        var _this = this;
        var target = event.target || event.srcElement || event.currentTarget;
        var orderBy = $("#selectOrder").val();
        this.route.params.subscribe(function (params) {
            _this.reData = new Object();
            _this.reData.OrderBy = orderBy;
            _this.reData.Word = _this.link;
            _this.reData.Page = parseInt(target.text);
            _this.reData.Detail = params['detail'];
            _this.Listele(_this.reData);
            _this.KodlaGetir();
        });
    };
    EmlakListeleComponent.prototype.onChange = function (event) {
        var _this = this;
        var target = event.target || event.srcElement || event.currentTarget;
        var orderBy = $("#selectOrder").val();
        this.route.params.subscribe(function (params) {
            _this.reData = new Object();
            _this.reData.OrderBy = orderBy;
            _this.reData.Word = _this.link;
            _this.reData.Page = parseInt(target.value);
            _this.reData.Detail = params['detail'];
            _this.Listele(_this.reData);
            _this.KodlaGetir();
        });
    };
    EmlakListeleComponent.prototype.onOrder = function (event) {
        var _this = this;
        var target = event.target || event.srcElement || event.currentTarget;
        this.route.params.subscribe(function (params) {
            _this.reData = new Object();
            _this.reData.OrderBy = target.value;
            _this.reData.Word = _this.link;
            _this.reData.Page = 1;
            _this.reData.Detail = params['detail'];
            _this.Listele(_this.reData);
            _this.KodlaGetir();
        });
    };
    EmlakListeleComponent.prototype.KodlaGetir = function () {
        var _this = this;
        this._emlakService.getKodlaGetir("atoz")
            .subscribe(function (resData) { return _this.atozText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("ztoa")
            .subscribe(function (resData) { return _this.ztoaText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("1to9")
            .subscribe(function (resData) { return _this.to19Text = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("9to1")
            .subscribe(function (resData) { return _this.to91Text = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dto9")
            .subscribe(function (resData) { return _this.dto9Text = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("dto1")
            .subscribe(function (resData) { return _this.dto1Text = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("page")
            .subscribe(function (resData) { return _this.pageText = resData; }, function (resError) { return _this.errorMsg = resError; });
        this._emlakService.getKodlaGetir("nopr")
            .subscribe(function (resData) { return _this.noprText = resData; }, function (resError) { return _this.errorMsg = resError; });
    };
    EmlakListeleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './emlaklistele.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakAjaxService, REAjaxService, ActivatedRoute])
    ], EmlakListeleComponent);
    return EmlakListeleComponent;
}());
export { EmlakListeleComponent };
//# sourceMappingURL=emlaklistele.js.map