import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
import { EmlakService } from "../../services/emlak";
import { EmlakDilService } from '../../services/emlakdil';
import { SharedService } from '../../services/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import * as $ from "jquery";
var AdminEmlakDuzenleComponent = /** @class */ (function () {
    function AdminEmlakDuzenleComponent(service, serviceRealEstateAdsT, sharedService, route, router, formBuilder) {
        this.service = service;
        this.serviceRealEstateAdsT = serviceRealEstateAdsT;
        this.sharedService = sharedService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
    }
    AdminEmlakDuzenleComponent.prototype.ngOnInit = function () {
        this.callTable = true;
        this.UserRightsControl($("#hdnModel").val());
        this.duzenleForm = this.formBuilder.group({
            ID: new FormControl(null, [Validators.required, Validators.min(1)]),
            Baslik: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
            Code: new FormControl(null),
            Fiyat: new FormControl(null),
            Yeni: new FormControl(null),
            GununEmlagi: new FormControl(null),
            Sehir: new FormControl(null),
            Ilce: new FormControl(null),
            Semt: new FormControl(null),
            Sahibi: new FormControl(null),
            OdaSayisi: new FormControl(null),
            KatSayisi: new FormControl(null),
            IsinmaTipi: new FormControl(null),
            SalonSayisi: new FormControl(null),
            BulunduguKat: new FormControl(null),
            YakitTipi: new FormControl(null),
            Alan: new FormControl(null),
            Durum: new FormControl(null),
            BinaYasi: new FormControl(null),
            ArkaCephe: new FormControl(null),
            OnCephe: new FormControl(null),
            CaddeyeYakin: new FormControl(null),
            DenizeSifir: new FormControl(null),
            DenizeYakin: new FormControl(null),
            Manzara: new FormControl(null),
            Merkezde: new FormControl(null),
            Metro: new FormControl(null),
            Otoban: new FormControl(null),
            TopluUlasim: new FormControl(null),
            Asansor: new FormControl(null),
            Bahce: new FormControl(null),
            Guvenlik: new FormControl(null),
            Hidrofor: new FormControl(null),
            Mantolama: new FormControl(null),
            Jenerator: new FormControl(null),
            Kapici: new FormControl(null),
            Satilik: new FormControl(null),
            Otopark: new FormControl(null),
            OyunParki: new FormControl(null),
            PVCDograma: new FormControl(null),
            SiteIci: new FormControl(null),
            YanginMerdiveni: new FormControl(null),
            YuzmeHavuzu: new FormControl(null),
            Alarm: new FormControl(null),
            Balkon: new FormControl(null),
            CelikKapi: new FormControl(null),
            GoruntuluDiafon: new FormControl(null),
            Jakuzi: new FormControl(null),
            KabloTVUydu: new FormControl(null),
            Klima: new FormControl(null),
            Active: new FormControl(null),
            Url: new FormControl(null),
            Enlem: new FormControl(null),
            Boylam: new FormControl(null),
        });
    };
    AdminEmlakDuzenleComponent.prototype.onSubmit = function () {
        var _this = this;
        this.data = new Object();
        this.data.ID = this.duzenleForm.get("ID").value;
        this.data.Baslik = this.duzenleForm.get("Baslik").value;
        this.data.Code = this.duzenleForm.get("Code").value;
        this.data.Fiyat = this.duzenleForm.get("Fiyat").value;
        this.data.Yeni = this.duzenleForm.get("Yeni").value;
        this.data.GununEmlagi = this.duzenleForm.get("GununEmlagi").value;
        this.data.Sehir = this.duzenleForm.get("Sehir").value;
        this.data.Ilce = this.duzenleForm.get("Ilce").value;
        this.data.Semt = this.duzenleForm.get("Semt").value;
        this.data.Sahibi = this.duzenleForm.get("Sahibi").value;
        this.data.OdaSayisi = this.duzenleForm.get("OdaSayisi").value;
        this.data.KatSayisi = this.duzenleForm.get("KatSayisi").value;
        this.data.IsinmaTipi = this.duzenleForm.get("IsinmaTipi").value;
        this.data.SalonSayisi = this.duzenleForm.get("SalonSayisi").value;
        this.data.BulunduguKat = this.duzenleForm.get("BulunduguKat").value;
        this.data.YakitTipi = this.duzenleForm.get("YakitTipi").value;
        this.data.Alan = this.duzenleForm.get("Alan").value;
        this.data.Durum = this.duzenleForm.get("Durum").value;
        this.data.BinaYasi = this.duzenleForm.get("BinaYasi").value;
        this.data.ArkaCephe = this.duzenleForm.get("ArkaCephe").value;
        this.data.OnCephe = this.duzenleForm.get("OnCephe").value;
        this.data.CaddeyeYakin = this.duzenleForm.get("CaddeyeYakin").value;
        this.data.DenizeSifir = this.duzenleForm.get("DenizeSifir").value;
        this.data.DenizeYakin = this.duzenleForm.get("DenizeYakin").value;
        this.data.Manzara = this.duzenleForm.get("Manzara").value;
        this.data.Merkezde = this.duzenleForm.get("Merkezde").value;
        this.data.Metro = this.duzenleForm.get("Metro").value;
        this.data.Otoban = this.duzenleForm.get("Otoban").value;
        this.data.TopluUlasim = this.duzenleForm.get("TopluUlasim").value;
        this.data.Asansor = this.duzenleForm.get("Asansor").value;
        this.data.Bahce = this.duzenleForm.get("Bahce").value;
        this.data.Guvenlik = this.duzenleForm.get("Guvenlik").value;
        this.data.Hidrofor = this.duzenleForm.get("Hidrofor").value;
        this.data.Mantolama = this.duzenleForm.get("Mantolama").value;
        this.data.Jenerator = this.duzenleForm.get("Jenerator").value;
        this.data.Kapici = this.duzenleForm.get("Kapici").value;
        this.data.Satilik = this.duzenleForm.get("Satilik").value;
        this.data.Otopark = this.duzenleForm.get("Otopark").value;
        this.data.OyunParki = this.duzenleForm.get("OyunParki").value;
        this.data.PVCDograma = this.duzenleForm.get("PVCDograma").value;
        this.data.SiteIci = this.duzenleForm.get("SiteIci").value;
        this.data.YanginMerdiveni = this.duzenleForm.get("YanginMerdiveni").value;
        this.data.YuzmeHavuzu = this.duzenleForm.get("YuzmeHavuzu").value;
        this.data.Alarm = this.duzenleForm.get("Alarm").value;
        this.data.Balkon = this.duzenleForm.get("Balkon").value;
        this.data.CelikKapi = this.duzenleForm.get("CelikKapi").value;
        this.data.GoruntuluDiafon = this.duzenleForm.get("GoruntuluDiafon").value;
        this.data.Jakuzi = this.duzenleForm.get("Jakuzi").value;
        this.data.KabloTVUydu = this.duzenleForm.get("KabloTVUydu").value;
        this.data.Klima = this.duzenleForm.get("Klima").value;
        this.data.Active = this.duzenleForm.get("Active").value;
        this.data.Url = this.duzenleForm.get("Url").value;
        this.data.Enlem = this.duzenleForm.get("Enlem").value;
        this.data.Boylam = this.duzenleForm.get("Boylam").value;
        this.service.postDuzenle(this.data)
            .subscribe(function (answer) {
            if (answer.Mesaj == null) {
                _this.router.navigate(['/Admin/Emlak']);
            }
            else {
                $(".alertMessage").text(answer.Mesaj);
                $(".alert-error").fadeIn("slow");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminEmlakDuzenleComponent.prototype.onRealEstatesAdsTDelete = function (id) {
        var _this = this;
        this.serviceRealEstateAdsT.getSil(id).subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("Delete");
                $("a.dltLink.active-dlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                _this.ShowAlert("DeleteNot");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminEmlakDuzenleComponent.prototype.onRealEstatesAdsTRealDelete = function (id) {
        var _this = this;
        this.serviceRealEstateAdsT.getKaldir(id).subscribe(function (resData) {
            if (resData == true) {
                _this.ShowAlert("RealDelete");
                $("a.rdltLink.active-rdlt").parent("li").parent("ul").parent("div").parent("td").parent("tr").fadeOut("slow", function () {
                    $(this).remove();
                });
            }
            else {
                _this.ShowAlert("RealDeleteNot");
            }
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminEmlakDuzenleComponent.prototype.ShowAlert = function (type) {
        $("#tdAlertMessage li.tdAlert" + type).fadeIn("slow");
        setInterval(function () {
            $("#tdAlertMessage li.tdAlert" + type).fadeOut("slow");
        }, 2000);
    };
    AdminEmlakDuzenleComponent.prototype.UserRightsControl = function (Model) {
        var _this = this;
        this.sharedService.getHasRight(Model, "i").subscribe(function (iRight) {
            _this.insertShow = iRight;
            _this.sharedService.getHasRight(Model, "u").subscribe(function (uRight) {
                _this.updateShow = uRight;
                _this.sharedService.getHasRight(Model, "d").subscribe(function (dRight) {
                    _this.deleteShow = dRight;
                    _this.sharedService.getHasRight(Model, "rd").subscribe(function (rdRight) {
                        _this.realDeleteShow = rdRight;
                        if (_this.callTable == true) {
                            _this.route.params.subscribe(function (params) {
                                _this.id = params['id'];
                                _this.service.getDuzenle(_this.id).subscribe(function (resData) {
                                    _this.model = resData;
                                    _this.callTable = false;
                                    setTimeout(function () {
                                        $(".data-table").dataTable({
                                            "bJQueryUI": true,
                                            "sPaginationType": "full_numbers",
                                            "sDom": '<""l>t<"F"fp>'
                                        });
                                        if ($(".dropdown-menu").first().find("a").length <= 0) {
                                            $(".btn-group").remove();
                                        }
                                        $(document).off("click", ".fg-button").on("click", ".fg-button", function () {
                                            setTimeout(function () {
                                                _this.UserRightsControl($("#hdnModel").val());
                                            }, 1);
                                        });
                                        $(document).off("click", "a.dltLink").on("click", "a.dltLink", function () {
                                            $(this).addClass("active-dlt");
                                            $("a.dlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });
                                        $(document).off("click", "a.dlt-yes").on("click", "a.dlt-yes", function () {
                                            var id = $("a.dlt-yes").attr("data-id");
                                            _this.onRealEstatesAdsTDelete(id);
                                        });
                                        $(document).off("click", "a.rdltLink").on("click", "a.rdltLink", function () {
                                            $(this).addClass("active-rdlt");
                                            $("a.rdlt-yes").attr("data-id", $(this).attr("data-id"));
                                        });
                                        $(document).off("click", "a.rdlt-yes").on("click", "a.rdlt-yes", function () {
                                            var id = $("a.rdlt-yes").attr("data-id");
                                            _this.onRealEstatesAdsTRealDelete(id);
                                        });
                                    }, 1);
                                }, function (resError) { return _this.errorMsg = resError; });
                            });
                        }
                        setTimeout(function () {
                            if ($(".dropdown-menu").first().find("a").length <= 0) {
                                $(".btn-group").remove();
                            }
                        }, 1);
                    }, function (resError) { return _this.errorMsg = resError; });
                }, function (resError) { return _this.errorMsg = resError; });
            }, function (resError) { return _this.errorMsg = resError; });
        }, function (resError) { return _this.errorMsg = resError; });
    };
    AdminEmlakDuzenleComponent = tslib_1.__decorate([
        Component({
            templateUrl: './duzenle.html'
        }),
        tslib_1.__metadata("design:paramtypes", [EmlakService, EmlakDilService, SharedService, ActivatedRoute, Router, FormBuilder])
    ], AdminEmlakDuzenleComponent);
    return AdminEmlakDuzenleComponent;
}());
export { AdminEmlakDuzenleComponent };
//# sourceMappingURL=duzenle.js.map