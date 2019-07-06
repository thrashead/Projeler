import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
let VarYokComponent = class VarYokComponent {
    constructor() {
    }
    ngOnInit() {
        this.varyok();
        $("#varyok button").click(function () {
            var secilenKutu = $(this).attr("data-num");
            if (VarYok.secilenKutu == 0) {
                var cevap = confirm(secilenKutu + " numaralı kutuyu seçmek istediğinize emin misiniz?");
                if (cevap == true) {
                    alert(secilenKutu + " numaralı kutuyu seçtiniz.");
                    VarYok.secilenKutu = parseInt(secilenKutu);
                    $("#varyok .kutu").append($(this).clone());
                    VarYok.sayac++;
                    $(this).css("visibility", "hidden");
                    $(this).attr("disabled", "disabled");
                }
            }
            else {
                $(this).css("visibility", "hidden");
                $(this).attr("disabled", "disabled");
                VarYok.KutuSec(secilenKutu);
                VarYok.sayac++;
            }
        });
    }
    varyok() {
        VarYok.Olustur();
    }
};
VarYokComponent = tslib_1.__decorate([
    Component({
        templateUrl: './varyok.html'
    })
], VarYokComponent);
export { VarYokComponent };
export class VarYok {
    static Olustur() {
        this.secilenKutu = 0;
        this.sayac = 1;
        this.dizi = [];
        let geciciDizi = [];
        geciciDizi[0] = 1;
        geciciDizi[1] = 2;
        geciciDizi[2] = 5;
        geciciDizi[3] = 10;
        geciciDizi[4] = 20;
        geciciDizi[5] = 50;
        geciciDizi[6] = 100;
        geciciDizi[7] = 200;
        geciciDizi[8] = 500;
        geciciDizi[9] = 1000;
        geciciDizi[10] = 2000;
        geciciDizi[11] = 5000;
        geciciDizi[12] = 10000;
        geciciDizi[13] = 15000;
        geciciDizi[14] = 20000;
        geciciDizi[15] = 25000;
        geciciDizi[16] = 50000;
        geciciDizi[17] = 100000;
        geciciDizi[18] = 125000;
        geciciDizi[19] = 150000;
        geciciDizi[20] = 250000;
        geciciDizi[21] = 500000;
        this.dizi = VarYok.Karistir(geciciDizi);
        $("#varyok .liste ul li").each(function () {
            $(this).html($(this).attr("data-odul"));
        });
        $("#varyok .kutu button").remove();
        $("#varyok button").each(function () {
            $(this).css("visibility", "visible");
            $(this).removeAttr("disabled");
        });
    }
    static KutuSec(kutu) {
        alert(kutu + " numaralı kutuda " + this.dizi[parseInt(kutu) - 1].toString() + " TL değerinde ödül vardı.");
        $("#varyok .liste ul li[data-odul='" + this.dizi[parseInt(kutu) - 1].toString() + "']").html("");
        if (this.sayac == 5 || this.sayac == 9 || this.sayac == 13 || this.sayac == 17 || this.sayac == 21) {
            if (this.TeklifVer(this.sayac) == true) {
                alert("Bankanın teklif ettiği " + this.teklif.toString() + " TL'lik ödülü kazandınız.");
                this.Olustur();
            }
            else {
                if (this.sayac == 21) {
                    this.KutuDegistir(kutu);
                }
            }
        }
    }
    static TeklifVer(sayac) {
        var adet = 1;
        var toplam = 0;
        $("#varyok .liste ul li").each(function () {
            var fiyat = $(this).text() == "" ? 0 : parseInt($(this).attr("data-odul"));
            toplam += fiyat;
            adet = fiyat == 0 ? adet + 0 : adet + 1;
        });
        this.teklif = toplam;
        switch (sayac) {
            case 5:
                this.teklif = this.teklif / 5;
                break;
            case 9:
                this.teklif = this.teklif / 4;
                break;
            case 13:
                this.teklif = this.teklif / 3;
                break;
            case 17:
                this.teklif = this.teklif / 2;
                break;
            case 21:
                this.teklif = this.teklif / 1;
                break;
        }
        if (this.teklif < 100) {
            this.teklif = Math.round((this.teklif / adet) / 1) * 1;
        }
        else if (this.teklif < 1000) {
            this.teklif = Math.round((this.teklif / adet) / 10) * 10;
        }
        else if (this.teklif < 10000) {
            this.teklif = Math.round((this.teklif / adet) / 100) * 100;
        }
        else if (this.teklif < 1000000) {
            this.teklif = Math.round((this.teklif / adet) / 1000) * 1000;
        }
        return confirm("Bankanın " + this.teklif.toString() + " TL'lik teklifine Var Mısın? Yok Musun?");
    }
    static KutuDegistir(kutu) {
        var kalanKutu = $("#varyok button[disabled!='disabled']").first().attr("data-num");
        var cevap = confirm("Kalan" + kalanKutu + " numaralı kutuyu seçtiğiniz " + this.secilenKutu.toString() + " numaralı kutu ile değiştirmek ister misiniz?");
        if (cevap == false) {
            alert("Kutunuzdaki " + this.dizi[parseInt(kutu) - 1].toString() + " TL'lik ödülü kazandınız.");
            this.Olustur();
        }
        else if (cevap == true) {
            alert("Değiştirdiğiniz kutudaki " + this.dizi[parseInt(kalanKutu) - 1].toString() + " TL'lik ödülü kazandınız.");
            this.Olustur();
        }
    }
    static Random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static Karistir(dizi) {
        var currentIndex = dizi.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = dizi[currentIndex];
            dizi[currentIndex] = dizi[randomIndex];
            dizi[randomIndex] = temporaryValue;
        }
        return dizi;
    }
}
VarYok.dizi = [];
VarYok.secilenKutu = 0;
VarYok.sayac = 0;
VarYok.teklif = 0;
//# sourceMappingURL=varyok.js.map