import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { GirisComponent } from './giris/giris.component';
import { GaleriComponent } from './giris/galeri.component';
import { GitarModComponent } from './giris/gitarmod.component';
import { IletisimComponent } from './giris/iletisim.component';
import { PuzzleComponent } from './giris/puzzle.component';
import { SudokuComponent } from './giris/sudoku.component';
import { VarYokComponent } from './giris/varyok.component';
import { VideoComponent } from './giris/video.component';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent,
                    GirisComponent,
                    GaleriComponent,
                    GitarModComponent,
                    IletisimComponent,
                    PuzzleComponent,
                    SudokuComponent,
                    VarYokComponent,
                    VideoComponent
                ],

    //'/SinaSalik/' -> '/' Bu şekilde değişecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/SinaSalik/' }],
    bootstrap: [AppComponent]
})

export class AppModule { }