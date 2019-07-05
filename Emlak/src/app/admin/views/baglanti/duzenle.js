"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var baglanti_1 = require("../../services/baglanti");
var BaglantiDuzenleComponent = /** @class */ (function () {
    function BaglantiDuzenleComponent() {
    }
    BaglantiDuzenleComponent.prototype.ngOnInit = function () {
    };
    BaglantiDuzenleComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/admin/views/baglanti/duzenle.html',
            providers: [baglanti_1.BaglantiService]
        })
    ], BaglantiDuzenleComponent);
    return BaglantiDuzenleComponent;
}());
exports.BaglantiDuzenleComponent = BaglantiDuzenleComponent;
//# sourceMappingURL=duzenle.js.map