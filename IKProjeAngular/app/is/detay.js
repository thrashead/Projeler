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
var ik_service_1 = require("../services/ik.service");
var IsDetayComponent = /** @class */ (function () {
    //rasgeleSiir: [];
    function IsDetayComponent(ikService) {
        this.ikService = ikService;
    }
    IsDetayComponent.prototype.ngOnInit = function () {
        //this.ikService.Data()
        //    .subscribe(data => this.rasgeleSiir = data);
    };
    IsDetayComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/is/detay.html',
            styleUrls: [
                'Content/css/sayfalar/Sayfa.css',
                'Content/css/sayfalar/IsDetay.css'
            ],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [ik_service_1.IKService]
        }),
        __metadata("design:paramtypes", [ik_service_1.IKService])
    ], IsDetayComponent);
    return IsDetayComponent;
}());
exports.IsDetayComponent = IsDetayComponent;
//# sourceMappingURL=detay.js.map