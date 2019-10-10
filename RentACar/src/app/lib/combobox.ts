import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ComboBox {
    static FillYear(id: string, minYear: number = 1900, maxYear: number = 2019) {
        for (var i = minYear; i <= maxYear; i++) {
            $("#" + id).append("<option value=\"" + i.toString() + "\">" + i.toString() + "</option>");
        }
    }

    static FillPrice(id: string, increase: boolean = true, start: number = 0, incdecValue: number = 10000) {
        if (increase) {
            for (var i = start; i <= 100000; i = i + incdecValue) {
                $("#" + id).append("<option value=\"" + i.toString() + "\">" + i.toString() + "</option>");
            }
        }
        else {
            for (var i = 100000 - start; i >= 0; i = i - incdecValue) {
                $("#" + id).append("<option value=\"" + i.toString() + "\">" + i.toString() + "</option>");
            }
        }
    }

    static FillNumber(id: string, min: number = 1, max: number = 10, increment: number = 1) {
        for (var i = min; i <= max; i = i + increment) {
            $("#" + id).append("<option value=\"" + i.toString() + "\">" + i.toString() + "</option>");
        }
    }
}
