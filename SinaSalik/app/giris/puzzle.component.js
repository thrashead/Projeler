"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PuzzleComponent = /** @class */ (function () {
    function PuzzleComponent() {
        this.resim = "photo1";
    }
    PuzzleComponent.prototype.ngOnInit = function () {
        this.puzzle();
    };
    PuzzleComponent.prototype.Goster = function () {
        $("#puzzle .oResim").show();
    };
    PuzzleComponent.prototype.Gizle = function () {
        $("#puzzle .oResim").hide();
    };
    PuzzleComponent.prototype.puzzle = function () {
        Puzzle.Olustur(this.resim);
    };
    PuzzleComponent.prototype.ileri = function () {
        var resimNo = parseInt(this.resim.replace("photo", ""));
        if (resimNo == 5) {
            resimNo = 1;
        }
        else {
            resimNo++;
        }
        this.resim = "photo" + resimNo;
        this.puzzle();
    };
    PuzzleComponent.prototype.geri = function () {
        var resimNo = parseInt(this.resim.replace("photo", ""));
        if (resimNo == 1) {
            resimNo = 5;
        }
        else {
            resimNo--;
        }
        this.resim = "photo" + resimNo;
        this.puzzle();
    };
    PuzzleComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/giris/puzzle.component.html',
            styleUrls: [
                'Content/css/oyun.css',
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], PuzzleComponent);
    return PuzzleComponent;
}());
exports.PuzzleComponent = PuzzleComponent;
var Puzzle = /** @class */ (function () {
    function Puzzle() {
    }
    Puzzle.Olustur = function (photo) {
        $("#puzzle .img").remove();
        var dizi = Puzzle.DiziDoldur();
        for (var i = 0; i < 25; i++) {
            var say = dizi[i];
            var bgX = -1 * (((say - 1) % 5) * 100);
            var bgY = 0;
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
    };
    Puzzle.KontrolEt = function (photo) {
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
    };
    Puzzle.DiziDoldur = function () {
        var dizi = [];
        for (var i = 0; i < 25; i++) {
            dizi[i] = i + 1;
        }
        return Puzzle.Karistir(dizi);
    };
    Puzzle.Karistir = function (dizi) {
        var currentIndex = dizi.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = dizi[currentIndex];
            dizi[currentIndex] = dizi[randomIndex];
            dizi[randomIndex] = temporaryValue;
        }
        return dizi;
    };
    return Puzzle;
}());
exports.Puzzle = Puzzle;
//# sourceMappingURL=puzzle.component.js.map