import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app';
import { LayoutComponent } from './shared/layout';
import { ScriptsComponent } from './shared/controls/scripts';
import { GirisComponent } from './giris/giris';
import { GaleriComponent } from './giris/galeri';
import { GitarModComponent } from './giris/gitarmod';
import { IletisimComponent } from './giris/iletisim';
import { PuzzleComponent } from './giris/puzzle';
import { SudokuComponent } from './giris/sudoku';
import { VarYokComponent } from './giris/varyok';
import { VideoComponent } from './giris/video';

import * as $ from "jquery";

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        ScriptsComponent,
        GirisComponent,
        GaleriComponent,
        GitarModComponent,
        IletisimComponent,
        PuzzleComponent,
        SudokuComponent,
        VarYokComponent,
        VideoComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        HttpClientModule
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/SinaSalik/' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
