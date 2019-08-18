"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var metadil_1 = require("../../services/metadil");
var MetaDilDuzenleComponent = /** @class */ (function () {
    function MetaDilDuzenleComponent() {
    }
    MetaDilDuzenleComponent.prototype.ngOnInit = function () {
    };
    MetaDilDuzenleComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/admin/views/metadil/duzenle.html',
            providers: [metadil_1.MetaDilService]
        })
    ], MetaDilDuzenleComponent);
    return MetaDilDuzenleComponent;
}());
exports.MetaDilDuzenleComponent = MetaDilDuzenleComponent;
//# sourceMappingURL=duzenle.js.map