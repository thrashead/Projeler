"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var meta_1 = require("../../services/meta");
var MetaEkleComponent = /** @class */ (function () {
    function MetaEkleComponent() {
    }
    MetaEkleComponent.prototype.ngOnInit = function () {
    };
    MetaEkleComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/admin/views/meta/ekle.html',
            providers: [meta_1.MetaService]
        })
    ], MetaEkleComponent);
    return MetaEkleComponent;
}());
exports.MetaEkleComponent = MetaEkleComponent;
//# sourceMappingURL=ekle.js.map