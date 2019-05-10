import { Component } from "@angular/core";
import { EmlakService } from "../emlak.service";
import { REService } from "../re.service";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: 'app/emlak/emlaklistele.component.html',
    providers: [EmlakService, REService]
})

export class EmlakListeleComponent {
    liste: any;
    public reData: any;
    public link: string;
    baslik: string;
    sayfa: number;
    sayfalar: number[] = new Array();

    constructor(private _emlakService: EmlakService, private _reService: REService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.link = params['link'];
            this.reData = new Object();
            this.reData.OrderBy = "";
            this.reData.Word = params['link'];
            this.reData.Page = 1;
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);

            this.KodlaGetir();
        });
    }

    Listele(data: any) {
        $("#lblSonuc").css("display", "none");

        this._reService.getEmlakListele(data)
            .subscribe((resData) => {
                this.liste = resData;

                if (this.liste.Adet > 12) {
                    $(".IcerikMetin.Paging").css("display", "block");
                }
                else if (this.liste.Adet <= 0) {
                    $("#lblSonuc").css("display", "block");
                }

                this.sayfalar = this.sayiList(this.liste.SayfaSayisi);
            },
                resError => this.errorMsg = resError);
    }

    sayiList(adet: number) {
        let sayilar: number[] = new Array();

        for (var i = 0; i < adet; i++) {
            sayilar[i] = i + 1;
        }

        return sayilar;
    }

    onClick(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;
        var orderBy = $("#selectOrder").val();

        this.route.params.subscribe((params: Params) => {
            this.reData = new Object();
            this.reData.OrderBy = orderBy;
            this.reData.Word = this.link;
            this.reData.Page = parseInt(target.text);
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);

            this.KodlaGetir();
        });
    }

    onChange(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;
        var orderBy = $("#selectOrder").val();

        this.route.params.subscribe((params: Params) => {
            this.reData = new Object();
            this.reData.OrderBy = orderBy;
            this.reData.Word = this.link;
            this.reData.Page = parseInt(target.value);
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);

            this.KodlaGetir();
        });
    }

    onOrder(event: any) {
        var target = event.target || event.srcElement || event.currentTarget;

        this.route.params.subscribe((params: Params) => {
            this.reData = new Object();
            this.reData.OrderBy = target.value;
            this.reData.Word = this.link;
            this.reData.Page = 1;
            this.reData.Detail = params['detail'];

            this.Listele(this.reData);

            this.KodlaGetir();
        });
    }

    //KodlaGetir
    errorMsg: string;

    atozText: string;
    ztoaText: string;
    to19Text: string;
    to91Text: string;
    dto9Text: string;
    dto1Text: string;
    pageText: string;
    noprText: string;

    KodlaGetir() {
        this._emlakService.getKodlaGetir("atoz")
            .subscribe(resData => this.atozText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("ztoa")
            .subscribe(resData => this.ztoaText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("1to9")
            .subscribe(resData => this.to19Text = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("9to1")
            .subscribe(resData => this.to91Text = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dto9")
            .subscribe(resData => this.dto9Text = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("dto1")
            .subscribe(resData => this.dto1Text = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("page")
            .subscribe(resData => this.pageText = resData,
                resError => this.errorMsg = resError);

        this._emlakService.getKodlaGetir("nopr")
            .subscribe(resData => this.noprText = resData,
                resError => this.errorMsg = resError);
    }
}