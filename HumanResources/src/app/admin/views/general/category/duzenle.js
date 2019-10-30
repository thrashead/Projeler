"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var kategori_1 = require("../../services/kategori");
var KategoriDuzenleComponent = /** @class */ (function () {
    function KategoriDuzenleComponent() {
    }
    KategoriDuzenleComponent.prototype.ngOnInit = function () {
    };
    KategoriDuzenleComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/admin/views/kategori/duzenle.html',
            providers: [kategori_1.KategoriService]
        })
    ], KategoriDuzenleComponent);
    return KategoriDuzenleComponent;
}());
exports.KategoriDuzenleComponent = KategoriDuzenleComponent;
//# sourceMappingURL=duzenle.js.map