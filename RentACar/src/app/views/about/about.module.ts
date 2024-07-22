import { NgModule } from '@angular/core';

import { AboutComponent } from '../../views/about';
import { AboutHeaderComponent } from '../../views/about/parts/header';
import { AboutBreadCumbsComponent } from '../../views/about/parts/breadcumbs';
import { AboutBestComponent } from '../../views/about/parts/best';
import { AboutWhatComponent } from '../../views/about/parts/what';
import { AboutMoreComponent } from '../../views/about/parts/more';
import { AboutWorkersComponent } from '../../views/about/parts/workers';

import { AboutRoutingModule } from './about-routing.module';
import { SiteService } from '../../services/site';
import { Lib } from '../../lib/methods';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [
        AboutComponent,
        AboutHeaderComponent,
        AboutBreadCumbsComponent,
        AboutBestComponent,
        AboutWhatComponent,
        AboutMoreComponent,
        AboutWorkersComponent,
    ],
    imports: [
        CommonModule,
        AboutRoutingModule
    ],

    providers: [
        SiteService,
        Lib,
    ],
    //bootstrap: [AboutComponent]
})
export class AboutModule { }
