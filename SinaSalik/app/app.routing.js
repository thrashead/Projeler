"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var giris_component_1 = require("./giris/giris.component");
var galeri_component_1 = require("./giris/galeri.component");
var gitarmod_component_1 = require("./giris/gitarmod.component");
var iletisim_component_1 = require("./giris/iletisim.component");
var puzzle_component_1 = require("./giris/puzzle.component");
var sudoku_component_1 = require("./giris/sudoku.component");
var varyok_component_1 = require("./giris/varyok.component");
var video_component_1 = require("./giris/video.component");
var appRoutes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: giris_component_1.GirisComponent },
    { path: 'Galeri', component: galeri_component_1.GaleriComponent },
    { path: 'GitarMod', component: gitarmod_component_1.GitarModComponent },
    { path: 'Iletisim', component: iletisim_component_1.IletisimComponent },
    { path: 'Puzzle', component: puzzle_component_1.PuzzleComponent },
    { path: 'Sudoku', component: sudoku_component_1.SudokuComponent },
    { path: 'VarYok', component: varyok_component_1.VarYokComponent },
    { path: 'Video', component: video_component_1.VideoComponent },
    { path: '**', component: giris_component_1.GirisComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map