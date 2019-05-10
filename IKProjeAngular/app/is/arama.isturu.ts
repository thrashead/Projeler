import { Component, ViewEncapsulation, AfterContentInit } from "@angular/core";
import { AramaService } from "../services/arama.service";
import { IKService } from "../services/ik.service";
import { ActivatedRoute, Params } from "@angular/router";
import { AdayService } from "../services/aday.service";
import { Sabitler } from "../library";

@Component({
    templateUrl: 'app/is/arama.html',
    styleUrls: [
        'Content/css/sayfalar/Ara.css',
        'Content/css/kontroller/Tablo.css'
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [IKService, AramaService, AdayService]
})

export class IsIsTuruComponent implements AfterContentInit {
    public tip: string;
    public tipID: number;

    aktifKullanici: string;
    kayitliAramalar: [];
    sehirler: [];
    cinsiyetler: [];
    sektorler: [];
    tecrubeler: [];
    guncellikler: [];
    digersecenekler: [];
    calismalar: [];
    departmanlar: [];
    pozisyonlar: [];
    egitimler: [];
    kodlar: number[];
    errorMsg: string;
    haric: boolean;

    constructor(private ikService: IKService, private aramaService: AramaService, private adayService: AdayService, private route: ActivatedRoute) {
    }

    ngAfterContentInit() {
        this.route.params.subscribe((params: Params) => {
            this.tip = params['tip'];

            if (this.tip == undefined) {
                this.kodlar = [];
                this.haric = true;

                this.aramaService.Calismalar(this.kodlar, this.haric)
                    .subscribe(data => this.calismalar = data);
            }
            else {
                this.kodlar = [parseInt(this.tip)];
                this.haric = false;

                this.aramaService.CalismaDon(this.tip)
                    .subscribe(resData => {
                        this.tipID = resData;

                        this.kodlar = [this.tipID];
                        this.haric = false;

                        this.aramaService.Calismalar(this.kodlar, this.haric)
                            .subscribe(data => this.calismalar = data);

                    });
            }

            this.ikService.AktifKullanici()
                .subscribe(data => {
                    this.aktifKullanici = data != null ? data.Guid : "";

                    if (data != null) {
                        this.adayService.KayitliAramalar()
                            .subscribe(data => this.kayitliAramalar = data);
                    }
                    else {
                        this.kodlar = [1, 2];
                    }

                    this.aramaService.DigerSecenekler(this.kodlar, true)
                        .subscribe(data => this.digersecenekler = data);

                    this.kodlar = [9999, 34];

                    this.ikService.Sehirler(this.kodlar, true)
                        .subscribe(data => this.sehirler = data);

                    this.kodlar = [];

                    this.aramaService.Tecrubeler(this.kodlar, true)
                        .subscribe(data => this.tecrubeler = data);

                    this.aramaService.Guncellikler(this.kodlar, true)
                        .subscribe(data => this.guncellikler = data);

                    this.ikService.Cinsiyetler(this.kodlar, true)
                        .subscribe(data => this.cinsiyetler = data);

                    this.ikService.Sektorler(this.kodlar, true)
                        .subscribe(data => this.sektorler = data);

                    this.aramaService.Bolumler(this.kodlar, true)
                        .subscribe(data => this.departmanlar = data);

                    this.aramaService.Pozisyonlar(this.kodlar, true)
                        .subscribe(data => this.pozisyonlar = data);

                    this.aramaService.Egitimler(this.kodlar, true)
                        .subscribe(data => this.egitimler = data);


                    setTimeout(function () {
                        $("#searchoptions").tdSelect(undefined);
                        $("#searchoptions").prev().attr("data-value", $("#searchoptions").children("li[data-selected='true']").attr("value"));

                        $("#cityoptions").tdSelect(true);
                        $("#cityoptions").prev().attr("data-value", $("#cityoptions").children("li[data-selected='true']").attr("value"));

                        $("#jobtimeoptions").tdSelect(undefined);
                        $("#jobtimeoptions").prev().attr("data-value", $("#jobtimeoptions").children("li[data-selected='true']").attr("value"));

                        $("#worktypeoptions").tdSelect(undefined);
                        $("#worktypeoptions").prev().attr("data-value", $("#worktypeoptions").children("li[data-selected='true']").attr("value"));

                        $("#sectoroptions").tdSelect(true);
                        $("#sectoroptions").prev().attr("data-value", $("#sectoroptions").children("li[data-selected='true']").attr("value"));

                        $("#departoptions").tdSelect(true);
                        $("#departoptions").prev().attr("data-value", $("#departoptions").children("li[data-selected='true']").attr("value"));

                        $("#positionoptions").tdSelect(true);
                        $("#positionoptions").prev().attr("data-value", $("#positionoptions").children("li[data-selected='true']").attr("value"));

                        $("#eduoptions").tdSelect(undefined);
                        $("#eduoptions").prev().attr("data-value", $("#eduoptions").children("li[data-selected='true']").attr("value"));

                        $("#experoptions").tdSelect(undefined);
                        $("#experoptions").prev().attr("data-value", $("#experoptions").children("li[data-selected='true']").attr("value"));

                        $("#otheroptions").tdSelect(undefined);
                        $("#otheroptions").prev().attr("data-value", $("#otheroptions").children("li[data-selected='true']").attr("value"));

                        $("#genderoptions").tdSelect(undefined);
                        $("#genderoptions").prev().attr("data-value", $("#genderoptions").children("li[data-selected='true']").attr("value"));

                        $("#searchoptions").prev(".tdSelectText").addClass("bigselect select blue");
                        $("#cityoptions").prev(".tdSelectText").addClass("select blue");
                        $("#jobtimeoptions").prev(".tdSelectText").addClass("bigselect select blue");
                        $("#sectoroptions").prev(".tdSelectText").addClass("select blue");
                        $("#departoptions").prev(".tdSelectText").addClass("select blue");
                        $("#positionoptions").prev(".tdSelectText").addClass("select blue");
                        $("#eduoptions").prev(".tdSelectText").addClass("select blue");
                        $("#experoptions").prev(".tdSelectText").addClass("select blue");
                        $("#otheroptions").prev(".tdSelectText").addClass("select blue");
                        $("#genderoptions").prev(".tdSelectText").addClass("bigselect select blue");

                        var worktype = $("#worktypeoptions");
                        worktype.prev(".tdSelectText").addClass("bigselect select blue");
                        worktype.prev(".tdSelectText").css("background-image", "none");
                        worktype.prev(".tdSelectText").css("cursor", "auto");
                        worktype.prev(".tdSelectText").css("background-color", "#4E9FF4");
                        worktype.prev(".tdSelectText").css("color", "#FFF");
                        worktype.prev(".tdSelectText").css("font-weight", "bold");
                        worktype.prev(".tdSelectText").css("text-align", "center");
                        worktype.remove();
                        $("#addworktype").remove();
                        $("#addedworktypes").remove();
                    }, Sabitler.TimeOut2000);

                    this.ButtonScroll();
                });
        });
    }

    onLiClick(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;

        var selectedLi = target.parentNode.previousSibling;

        selectedLi.setAttribute("data-value", target.value);
    }

    onAdd(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;

        var selectedID = target.previousElementSibling.id;
        var addListID = target.nextElementSibling.id;

        var selectedText = $("#" + selectedID).children("li[data-selected='true']").text();
        var selectedValue = $("#" + selectedID).children("li[data-selected='true']").attr("data-value");

        if (this.selectedValControl($("#" + addListID), selectedValue) == true) {
            $("#" + addListID).append("<li data-value='" + selectedValue + "'>" + selectedText + "</li>");
        }

        $("#" + addListID + " li").click(function () {
            $(this).fadeOut("slow", function () { $(this).remove(); });
        })
    }

    selectedValControl(addList: any, value: string) {
        var kontrol = true;

        addList.children("li").each(function () {
            if ($(this).attr("data-value") == value) {
                kontrol = false;
            }
        });

        if (value == "0") {
            kontrol = false;
        }

        return kontrol;
    }

    sayac(i: number) {
        return new Array(i);
    }

    ButtonScroll() {
        $(window).scroll(function () {
            var top = ($(document).scrollTop() + $(window).height()) - $(".buttonsearch").height();
            var top2 = $("#jobsearch").offset().top + $("#jobsearch").height();

            if ($("#leftclick").is(":visible")) {
                top -= 150;
                top2 -= 150;
            }

            if (top <= top2) {
                if ($("#leftclick").is(":visible")) {
                    $(".buttonsearch").css("top", top.toString() + "px");
                }
                else {
                    $(".buttonsearch").css("top", top.toString() + "px");
                }
            }
            else {
                if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                    $(".buttonsearch").css("top", (top2 - $(".buttonsearch").height() - 1).toString() + "px");
                }
                else {
                    $(".buttonsearch").css("top", (top2 - $(".buttonsearch").height() - 3).toString() + "px");
                }
            }
        });
    }
}