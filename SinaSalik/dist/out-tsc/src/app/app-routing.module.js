import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout';
import { GirisComponent } from './giris/giris';
import { GaleriComponent } from './giris/galeri';
import { GitarModComponent } from './giris/gitarmod';
import { IletisimComponent } from './giris/iletisim';
import { PuzzleComponent } from './giris/puzzle';
import { SudokuComponent } from './giris/sudoku';
import { VarYokComponent } from './giris/varyok';
import { VideoComponent } from './giris/video';
const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: GirisComponent, pathMatch: 'full' },
            { path: 'Giris', component: GirisComponent },
            { path: 'Galeri', component: GaleriComponent },
            { path: 'GitarMod', component: GitarModComponent },
            { path: 'Iletisim', component: IletisimComponent },
            { path: 'Puzzle', component: PuzzleComponent },
            { path: 'Sudoku', component: SudokuComponent },
            { path: 'VarYok', component: VarYokComponent },
            { path: 'Video', component: VideoComponent },
        ]
    },
    { path: '**', redirectTo: '' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map