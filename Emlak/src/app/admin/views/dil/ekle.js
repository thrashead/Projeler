"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dil_1 = require("../../services/dil");
var DilEkleComponent = /** @class */ (function () {
    function DilEkleComponent() {
    }
    DilEkleComponent.prototype.ngOnInit = function () {
    };
    DilEkleComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/admin/views/dil/ekle.html',
            providers: [dil_1.DilService]
        })
    ], DilEkleComponent);
    return DilEkleComponent;
}());
exports.DilEkleComponent = DilEkleComponent;
//# sourceMappingURL=ekle.js.map