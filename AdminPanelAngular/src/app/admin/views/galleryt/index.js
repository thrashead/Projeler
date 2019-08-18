"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var galeridil_1 = require("../../services/galeridil");
var GaleriDilIndexComponent = /** @class */ (function () {
    function GaleriDilIndexComponent() {
    }
    GaleriDilIndexComponent.prototype.ngOnInit = function () {
    };
    GaleriDilIndexComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/admin/views/galeridil/index.html',
            providers: [galeridil_1.GaleriDilService]
        })
    ], GaleriDilIndexComponent);
    return GaleriDilIndexComponent;
}());
exports.GaleriDilIndexComponent = GaleriDilIndexComponent;
//# sourceMappingURL=index.js.map