import * as tslib_1 from "tslib";
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
import { BiyografiComponent } from './biyografi/biyografi';
import { GaleriComponent } from './galeri/galeri';
import { SiirleriComponent } from './siirleri/siirleri';
import { SiirComponent } from './siir/siir';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            LayoutComponent,
            ScriptsComponent,
            GirisComponent,
            BiyografiComponent,
            GaleriComponent,
            SiirleriComponent,
            SiirComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
            HttpClientModule
        ],
        providers: [{ provide: APP_BASE_HREF, useValue: '/CeyhanPolat/' }],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map