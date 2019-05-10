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
var SudokuComponent = /** @class */ (function () {
    function SudokuComponent() {
    }
    SudokuComponent.prototype.ngOnInit = function () {
        this.sudoku();
        $(document).on("keypress", "#sudoku input[type='text']", function (e) {
            if (!(e.keyCode >= 49 && e.keyCode <= 57)) {
                event.preventDefault();
            }
        });
    };
    SudokuComponent.prototype.sudoku = function () {
        $("#sudoku input[type='text']").each(function () {
            $(this).removeAttr("disabled");
            $(this).val("");
        });
        Sudoku.Olustur();
    };
    SudokuComponent.prototype.temizle = function () {
        $("#sudoku input[type='text'][disabled!='disabled']").val("");
    };
    SudokuComponent.prototype.kontrol = function () {
        var kon = true;
        $("#sudoku input[type='text']").each(function () {
            if (kon == true) {
                var tba = $(this);
                if (tba.val() == "") {
                    kon = false;
                }
            }
        });
        if (kon == false) {
            alert("Lütfen tüm boşlukları doldurun.");
            return kon;
        }
        else {
            kon = Sudoku.Kontrol();
            if (kon == false) {
                alert("Lütfen girilen bilgileri kontrol ediniz.");
                return kon;
            }
            var cevap = confirm("Tebrikler. Oyunu Bitirdiniz. Bir daha oynamak ister misiniz?");
            if (cevap == true) {
                Sudoku.Olustur();
                return kon;
            }
        }
    };
    SudokuComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/giris/sudoku.component.html',
            styleUrls: [
                'Content/css/oyun.css',
            ],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [])
    ], SudokuComponent);
    return SudokuComponent;
}());
exports.SudokuComponent = SudokuComponent;
var Sudoku = /** @class */ (function () {
    function Sudoku() {
    }
    Sudoku.Olustur = function () {
        var y = Sudoku.Random(20, 30);
        var _loop_1 = function (i) {
            var z = Sudoku.Random(1, 81);
            $("#sudoku input[type='text']").each(function () {
                var u = Sudoku.Random(1, 9);
                var tba = $(this);
                if (z == parseInt(tba.attr("data-sira"))) {
                    tba.val(u.toString());
                    tba.removeAttr("disabled");
                }
            });
        };
        for (var i = 0; i < y; i++) {
            _loop_1(i);
        }
        Sudoku.TextKontrol();
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);
            if (tba.attr("disabled") != "disabled" && tba.val() != "")
                tba.attr("disabled", "disabled");
        });
    };
    Sudoku.TextKontrol = function () {
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);
            var indis = parseInt(tba.attr("data-sira"));
            var mod = indis % 9;
            var kon = true;
            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);
                    var indis2 = parseInt(tba2.attr("data-sira"));
                    var mod2 = indis2 % 9;
                    if (indis != indis2 && mod == mod2) {
                        if (tba.val() == tba2.val()) {
                            tba2.val("");
                            kon = false;
                        }
                    }
                }
            });
        });
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);
            var indis = parseInt(tba.attr("data-sira"));
            var mod = indis % 9;
            if (mod == 0)
                mod = 9;
            var bas = indis - mod + 1;
            var son = bas + 8;
            var kon = true;
            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);
                    var indis2 = parseInt(tba2.attr("data-sira"));
                    if (indis != indis2 && (indis2 > bas && indis2 <= son)) {
                        if (tba.val() == tba2.val()) {
                            tba2.val("");
                            kon = false;
                        }
                    }
                }
            });
        });
        Sudoku.AyniHucreKontrol();
    };
    Sudoku.AyniHucreKontrol = function () {
        var i = [1, 4, 7, 28, 31, 34, 55, 58, 61];
        var j = [];
        var k = [];
        var dizi = [[]];
        var dizi2 = [[]];
        for (var l = 0; l < 9; l++) {
            j[l] = i[l] + 9;
            k[l] = i[l] + 18;
        }
        for (var l = 0; l < 9; l++) {
            dizi[l] = [];
            dizi[l][0] = i[l];
            dizi[l][1] = i[l] + 1;
            dizi[l][2] = i[l] + 2;
            dizi[l][3] = j[l];
            dizi[l][4] = j[l] + 1;
            dizi[l][5] = j[l] + 2;
            dizi[l][6] = k[l];
            dizi[l][7] = k[l] + 1;
            dizi[l][8] = k[l] + 2;
        }
        for (var l = 0; l < 9; l++) {
            for (var t = 0; t < 9; t++) {
                dizi2[l] = [];
                dizi2[l][t] = 0;
            }
        }
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);
            var kon = true;
            for (var l = 0; l < 9; l++) {
                for (var t = 0; t < 9; t++) {
                    if (kon == true) {
                        if (tba.attr("data-sira") == dizi[l][t].toString() && tba.val() != "") {
                            dizi2[l][t] = parseInt(tba.val().toString());
                            kon = false;
                        }
                    }
                }
            }
        });
        var _loop_2 = function (k_1) {
            var _loop_3 = function (i_1) {
                for (var j_1 = i_1; j_1 < 9; j_1++) {
                    if (j_1 != i_1) {
                        if (dizi2[k_1][i_1] == dizi2[k_1][j_1] && (dizi2[k_1][i_1] != 0 && dizi2[k_1][j_1] != 0)) {
                            $("#sudoku input[type='text']").each(function () {
                                var tba = $(this);
                                if (tba.attr("data-sira") == dizi[k_1][i_1].toString()) {
                                    tba.val("");
                                    tba.removeAttr("disabled");
                                }
                            });
                        }
                    }
                }
            };
            for (var i_1 = 0; i_1 < 9; i_1++) {
                _loop_3(i_1);
            }
        };
        for (var k_1 = 0; k_1 < 9; k_1++) {
            _loop_2(k_1);
        }
    };
    Sudoku.Kontrol = function () {
        var kontrol = false;
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);
            var indis = parseInt(tba.attr("data-sira"));
            var mod = indis % 9;
            var kon = true;
            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);
                    var indis2 = parseInt(tba2.attr("data-sira"));
                    var mod2 = indis2 % 9;
                    if (indis != indis2 && mod == mod2) {
                        if (tba.val() == tba2.val()) {
                            kon = false;
                            kontrol = false;
                        }
                    }
                }
            });
        });
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);
            var indis = parseInt(tba.attr("data-sira"));
            var mod = indis % 9;
            if (mod == 0)
                mod = 9;
            var bas = indis - mod + 1;
            var son = bas + 8;
            var kon = true;
            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);
                    var indis2 = parseInt(tba2.attr("data-sira"));
                    if (indis != indis2 && (indis2 > bas && indis2 <= son)) {
                        if (tba.val() == tba2.val()) {
                            kon = false;
                            kontrol = false;
                        }
                    }
                }
            });
        });
        var i = [1, 4, 7, 28, 31, 34, 55, 58, 61];
        var j = [];
        var k = [];
        var dizi = [[]];
        var dizi2 = [[]];
        for (var l = 0; l < 9; l++) {
            j[l] = i[l] + 9;
            k[l] = i[l] + 18;
        }
        for (var l = 0; l < 9; l++) {
            dizi[l] = [];
            dizi[l][0] = i[l];
            dizi[l][1] = i[l] + 1;
            dizi[l][2] = i[l] + 2;
            dizi[l][3] = j[l];
            dizi[l][4] = j[l] + 1;
            dizi[l][5] = j[l] + 2;
            dizi[l][6] = k[l];
            dizi[l][7] = k[l] + 1;
            dizi[l][8] = k[l] + 2;
        }
        for (var l = 0; l < 9; l++) {
            for (var t = 0; t < 9; t++) {
                dizi2[l] = [];
                dizi2[l][t] = 0;
            }
        }
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);
            var kon = true;
            for (var l = 0; l < 9; l++) {
                for (var t = 0; t < 9; t++) {
                    if (kon == true) {
                        if (tba.attr("data-sira") == dizi[l][t].toString() && tba.val() != "") {
                            kon = false;
                            kontrol = false;
                        }
                    }
                }
            }
        });
        var _loop_4 = function (k_2) {
            var _loop_5 = function (i_2) {
                for (var j_2 = i_2; j_2 < 9; j_2++) {
                    if (j_2 != i_2) {
                        if (dizi2[k_2][i_2] == dizi2[k_2][j_2] && (dizi2[k_2][i_2] != 0 && dizi2[k_2][j_2] != 0)) {
                            $("#sudoku input[type='text']").each(function () {
                                var tba = $(this);
                                if (tba.attr("data-sira") == dizi[k_2][i_2].toString()) {
                                    kontrol = false;
                                }
                            });
                        }
                    }
                }
            };
            for (var i_2 = 0; i_2 < 9; i_2++) {
                _loop_5(i_2);
            }
        };
        for (var k_2 = 0; k_2 < 9; k_2++) {
            _loop_4(k_2);
        }
        return kontrol;
    };
    Sudoku.Random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Sudoku;
}());
exports.Sudoku = Sudoku;
//# sourceMappingURL=sudoku.component.js.map