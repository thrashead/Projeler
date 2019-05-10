﻿import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    templateUrl: 'app/giris/sudoku.component.html',
    styleUrls: [
        'Content/css/oyun.css',
    ],
    encapsulation: ViewEncapsulation.None
})

export class SudokuComponent {
    constructor() {
    }

    ngOnInit() {
        this.sudoku();

        $(document).on("keypress", "#sudoku input[type='text']", function (e) {
            if (!(e.keyCode >= 49 && e.keyCode <= 57)) {
                event.preventDefault();
            }
        });
    }

    sudoku() {
        $("#sudoku input[type='text']").each(function () {
            $(this).removeAttr("disabled");
            $(this).val("");
        });

        Sudoku.Olustur();
    }

    temizle() {
        $("#sudoku input[type='text'][disabled!='disabled']").val("");
    }

    kontrol(): boolean {
        let kon: boolean = true;

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
    }
}

export class Sudoku {
    static Olustur() {
        let y: number = Sudoku.Random(20, 30);

        for (let i = 0; i < y; i++) {
            let z: number = Sudoku.Random(1, 81);

            $("#sudoku input[type='text']").each(function () {
                let u: number = Sudoku.Random(1, 9);
                var tba = $(this);

                if (z == parseInt(tba.attr("data-sira"))) {
                    tba.val(u.toString());
                    tba.removeAttr("disabled");
                }
            });
        }

        Sudoku.TextKontrol();

        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);

            if (tba.attr("disabled") != "disabled" && tba.val() != "")
                tba.attr("disabled", "disabled");
        });
    }

    static TextKontrol() {
        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);

            let indis: number = parseInt(tba.attr("data-sira"));
            let mod: number = indis % 9;

            let kon: boolean = true;

            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);

                    let indis2 = parseInt(tba2.attr("data-sira"));
                    let mod2 = indis2 % 9;

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

            let indis: number = parseInt(tba.attr("data-sira"));
            let mod: number = indis % 9;
            if (mod == 0)
                mod = 9;
            let bas: number = indis - mod + 1;
            let son: number = bas + 8;

            let kon: boolean = true;

            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);

                    let indis2 = parseInt(tba2.attr("data-sira"));
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
    }

    static AyniHucreKontrol() {
        let i: number[] = [1, 4, 7, 28, 31, 34, 55, 58, 61];
        let j: number[] = [];
        let k: number[] = [];
        let dizi: number[][] = [[]];
        let dizi2: number[][] = [[]];

        for (let l = 0; l < 9; l++) {
            j[l] = i[l] + 9;
            k[l] = i[l] + 18;
        }

        for (let l = 0; l < 9; l++) {
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

        for (let l = 0; l < 9; l++) {
            for (let t = 0; t < 9; t++) {
                dizi2[l] = [];
                dizi2[l][t] = 0;
            }
        }

        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);

            let kon: boolean = true;

            for (let l = 0; l < 9; l++) {
                for (let t = 0; t < 9; t++) {
                    if (kon == true) {
                        if (tba.attr("data-sira") == dizi[l][t].toString() && tba.val() != "") {
                            dizi2[l][t] = parseInt(tba.val().toString());
                            kon = false;
                        }
                    }
                }
            }
        });

        for (let k = 0; k < 9; k++) {
            for (let i = 0; i < 9; i++) {
                for (let j = i; j < 9; j++) {
                    if (j != i) {
                        if (dizi2[k][i] == dizi2[k][j] && (dizi2[k][i] != 0 && dizi2[k][j] != 0)) {
                            $("#sudoku input[type='text']").each(function () {
                                var tba = $(this);

                                if (tba.attr("data-sira") == dizi[k][i].toString()) {
                                    tba.val("");
                                    tba.removeAttr("disabled");
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    static Kontrol(): boolean {
        let kontrol: boolean = false;

        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);

            let indis: number = parseInt(tba.attr("data-sira"));
            let mod: number = indis % 9;

            let kon: boolean = true;

            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);

                    let indis2 = parseInt(tba2.attr("data-sira"));
                    let mod2 = indis2 % 9;

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

            let indis: number = parseInt(tba.attr("data-sira"));
            let mod: number = indis % 9;
            if (mod == 0)
                mod = 9;
            let bas: number = indis - mod + 1;
            let son: number = bas + 8;

            let kon: boolean = true;

            $("#sudoku input[type='text']").each(function () {
                if (kon == true) {
                    var tba2 = $(this);

                    let indis2 = parseInt(tba2.attr("data-sira"));
                    if (indis != indis2 && (indis2 > bas && indis2 <= son)) {
                        if (tba.val() == tba2.val()) {
                            kon = false;
                            kontrol = false;
                        }
                    }
                }
            });
        });

        let i: number[] = [1, 4, 7, 28, 31, 34, 55, 58, 61];
        let j: number[] = [];
        let k: number[] = [];
        let dizi: number[][] = [[]];
        let dizi2: number[][] = [[]];

        for (let l = 0; l < 9; l++) {
            j[l] = i[l] + 9;
            k[l] = i[l] + 18;
        }

        for (let l = 0; l < 9; l++) {
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

        for (let l = 0; l < 9; l++) {
            for (let t = 0; t < 9; t++) {
                dizi2[l] = [];
                dizi2[l][t] = 0;
            }
        }

        $("#sudoku input[type='text']").each(function () {
            var tba = $(this);

            let kon: boolean = true;

            for (let l = 0; l < 9; l++) {
                for (let t = 0; t < 9; t++) {
                    if (kon == true) {
                        if (tba.attr("data-sira") == dizi[l][t].toString() && tba.val() != "") {
                            kon = false;
                            kontrol = false;
                        }
                    }
                }
            }
        });

        for (let k = 0; k < 9; k++) {
            for (let i = 0; i < 9; i++) {
                for (let j = i; j < 9; j++) {
                    if (j != i) {
                        if (dizi2[k][i] == dizi2[k][j] && (dizi2[k][i] != 0 && dizi2[k][j] != 0)) {
                            $("#sudoku input[type='text']").each(function () {
                                var tba = $(this);

                                if (tba.attr("data-sira") == dizi[k][i].toString()) {
                                    kontrol = false;
                                }
                            });
                        }
                    }
                }
            }
        }

        return kontrol;
    }

    static Random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}