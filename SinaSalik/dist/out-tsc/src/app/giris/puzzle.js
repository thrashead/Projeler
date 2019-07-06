import * as tslib_1 from "tslib";
import { Component } from "@angular/core";
let PuzzleComponent = class PuzzleComponent {
    constructor() {
        this.resim = "photo1";
    }
    ngOnInit() {
        this.puzzle();
    }
    Goster() {
        $("#puzzle .oResim").show();
    }
    Gizle() {
        $("#puzzle .oResim").hide();
    }
    puzzle() {
        Puzzle.Olustur(this.resim);
    }
    ileri() {
        var resimNo = parseInt(this.resim.replace("photo", ""));
        if (resimNo == 5) {
            resimNo = 1;
        }
        else {
            resimNo++;
        }
        this.resim = "photo" + resimNo;
        this.puzzle();
    }
    geri() {
        var resimNo = parseInt(this.resim.replace("photo", ""));
        if (resimNo == 1) {
            resimNo = 5;
        }
        else {
            resimNo--;
        }
        this.resim = "photo" + resimNo;
        this.puzzle();
    }
};
PuzzleComponent = tslib_1.__decorate([
    Component({
        templateUrl: './puzzle.html'
    })
], PuzzleComponent);
export { PuzzleComponent };
export class Puzzle {
    static Olustur(photo) {
        $("#puzzle .img").remove();
        let dizi = Puzzle.DiziDoldur();
        for (var i = 0; i < 25; i++) {
            let say = dizi[i];
            let bgX = -1 * (((say - 1) % 5) * 100);
            let bgY = 0;
            if (say < 25) {
                if (say > 0 && say <= 5) {
                    bgY = 0;
                }
                else if (say > 5 && say <= 10) {
                    bgY = -100;
                }
                else if (say > 10 && say <= 15) {
                    bgY = -200;
                }
                else if (say > 15 && say <= 20) {
                    bgY = -300;
                }
                else if (say > 20 && say <= 25) {
                    bgY = -400;
                }
                $("#puzzle").append("<div data-say='" + say.toString() + "' class='img'></div>");
                $("#puzzle .img[data-say='" + say.toString() + "']").css("background-image", "url(Content/files/PuzzlePhotos/" + photo + ".jpg)");
                $("#puzzle .img[data-say='" + say.toString() + "']").css("background-position-x", bgX.toString() + "px");
                $("#puzzle .img[data-say='" + say.toString() + "']").css("background-position-y", bgY.toString() + "px");
            }
            else {
                $("#puzzle").append("<div data-say='0' class='img empty'></div>");
            }
        }
        $(document).on("click", "#puzzle .img", function () {
            var itemRight = $(this).next(".img");
            var itemBottom = $(this).next(".img").next(".img").next(".img").next(".img").next(".img");
            var itemLeft = $(this).prev(".img");
            var itemTop = $(this).prev(".img").prev(".img").prev(".img").prev(".img").prev(".img");
            if (itemRight.length > 0) {
                if (itemRight.hasClass("empty")) {
                    $(this).replaceWith(itemRight.clone());
                    itemRight.replaceWith($(this).clone());
                }
            }
            if (itemBottom.length > 0) {
                if (itemBottom.hasClass("empty")) {
                    $(this).replaceWith(itemBottom.clone());
                    itemBottom.replaceWith($(this).clone());
                }
            }
            if (itemLeft.length > 0) {
                if (itemLeft.hasClass("empty")) {
                    $(this).replaceWith(itemLeft.clone());
                    itemLeft.replaceWith($(this).clone());
                }
            }
            if (itemTop.length > 0) {
                if (itemTop.hasClass("empty")) {
                    $(this).replaceWith(itemTop.clone());
                    itemTop.replaceWith($(this).clone());
                }
            }
            Puzzle.KontrolEt(photo);
        });
        $(".oResim").attr("src", "Content/files/PuzzlePhotos/" + photo + ".jpg");
    }
    static KontrolEt(photo) {
        var kontrol = true;
        $("#puzzle .img[data-say!='0']").each(function (i) {
            if ((i + 1) != parseInt($(this).attr("data-say"))) {
                kontrol = false;
            }
        });
        if (kontrol) {
            var cevap = confirm("Tebrikler. Oyunu Bitirdiniz. Bir daha oynamak ister misiniz?");
            if (cevap == true) {
                Puzzle.Olustur(photo);
            }
        }
    }
    static DiziDoldur() {
        let dizi = [];
        for (var i = 0; i < 25; i++) {
            dizi[i] = i + 1;
        }
        return Puzzle.Karistir(dizi);
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
//# sourceMappingURL=puzzle.js.map