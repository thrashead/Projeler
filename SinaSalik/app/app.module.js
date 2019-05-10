"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var giris_component_1 = require("./giris/giris.component");
var galeri_component_1 = require("./giris/galeri.component");
var gitarmod_component_1 = require("./giris/gitarmod.component");
var iletisim_component_1 = require("./giris/iletisim.component");
var puzzle_component_1 = require("./giris/puzzle.component");
var sudoku_component_1 = require("./giris/sudoku.component");
var varyok_component_1 = require("./giris/varyok.component");
var video_component_1 = require("./giris/video.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule],
            declarations: [app_component_1.AppComponent,
                giris_component_1.GirisComponent,
                galeri_component_1.GaleriComponent,
                gitarmod_component_1.GitarModComponent,
                iletisim_component_1.IletisimComponent,
                puzzle_component_1.PuzzleComponent,
                sudoku_component_1.SudokuComponent,
                varyok_component_1.VarYokComponent,
                video_component_1.VideoComponent
            ],
            //'/SinaSalik/' -> '/' Bu şekilde değişecek
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/SinaSalik/' }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map