import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { empty } from 'rxjs/Observer';
import { GirisComponent } from './giris/giris.component';
import { GaleriComponent } from './giris/galeri.component';
import { GitarModComponent } from './giris/gitarmod.component';
import { IletisimComponent } from './giris/iletisim.component';
import { PuzzleComponent } from './giris/puzzle.component';
import { SudokuComponent } from './giris/sudoku.component';
import { VarYokComponent } from './giris/varyok.component';
import { VideoComponent } from './giris/video.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'Giris', pathMatch: 'full' },
    { path: 'Giris', component: GirisComponent },
    { path: 'Galeri', component: GaleriComponent },
    { path: 'GitarMod', component: GitarModComponent },
    { path: 'Iletisim', component: IletisimComponent },
    { path: 'Puzzle', component: PuzzleComponent },
    { path: 'Sudoku', component: SudokuComponent },
    { path: 'VarYok', component: VarYokComponent },
    { path: 'Video', component: VideoComponent },
    { path: '**', component: GirisComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);