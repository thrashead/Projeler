import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';

//Admin
import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminLoginComponent } from './admin/views/home/login';
import { AdminHeaderComponent } from './admin/views/shared/controls/header';
import { AdminLeftMenuComponent } from './admin/views/shared/controls/leftmenu';
import { AdminFooterComponent } from './admin/views/shared/controls/footer';
import { AdminScriptsComponent } from './admin/views/shared/controls/scripts';
import { AdminCopyDeleteComponent } from './admin/views/shared/controls/copydelete';
import { AdminIndexComponent } from './admin/views/home/index';

//Admin General
import { AdminCategoryIndexComponent } from './admin/views/general/category';
import { AdminCategoryInsertComponent } from './admin/views/general/category/insert';
import { AdminCategoryUpdateComponent } from './admin/views/general/category/update';

import { AdminContentIndexComponent } from './admin/views/general/content';
import { AdminContentInsertComponent } from './admin/views/general/content/insert';
import { AdminContentUpdateComponent } from './admin/views/general/content/update';

import { AdminFilesIndexComponent } from './admin/views/general/files';
import { AdminFilesInsertComponent } from './admin/views/general/files/insert';
import { AdminFilesUpdateComponent } from './admin/views/general/files/update';

import { AdminLinksIndexComponent } from './admin/views/general/links';
import { AdminLinksInsertComponent } from './admin/views/general/links/insert';
import { AdminLinksUpdateComponent } from './admin/views/general/links/update';

import { AdminLinkTypesIndexComponent } from './admin/views/general/linktypes';
import { AdminLinkTypesInsertComponent } from './admin/views/general/linktypes/insert';
import { AdminLinkTypesUpdateComponent } from './admin/views/general/linktypes/update';

import { AdminLogProcessIndexComponent } from './admin/views/general/logprocess';
import { AdminLogProcessInsertComponent } from './admin/views/general/logprocess/insert';
import { AdminLogProcessUpdateComponent } from './admin/views/general/logprocess/update';

import { AdminLogsIndexComponent } from './admin/views/general/logs';

import { AdminLogTypesIndexComponent } from './admin/views/general/logtypes';
import { AdminLogTypesInsertComponent } from './admin/views/general/logtypes/insert';
import { AdminLogTypesUpdateComponent } from './admin/views/general/logtypes/update';

import { AdminMetaIndexComponent } from './admin/views/general/meta';
import { AdminMetaInsertComponent } from './admin/views/general/meta/insert';
import { AdminMetaUpdateComponent } from './admin/views/general/meta/update';

import { AdminPicturesIndexComponent } from './admin/views/general/pictures';
import { AdminPicturesInsertComponent } from './admin/views/general/pictures/insert';
import { AdminPicturesUpdateComponent } from './admin/views/general/pictures/update';

import { AdminTranslationIndexComponent } from './admin/views/general/translation';
import { AdminTranslationInsertComponent } from './admin/views/general/translation/insert';
import { AdminTranslationUpdateComponent } from './admin/views/general/translation/update';

import { AdminTypesIndexComponent } from './admin/views/general/types';
import { AdminTypesInsertComponent } from './admin/views/general/types/insert';
import { AdminTypesUpdateComponent } from './admin/views/general/types/update';

import { AdminUserGroupsIndexComponent } from './admin/views/general/usergroups';
import { AdminUserGroupsInsertComponent } from './admin/views/general/usergroups/insert';
import { AdminUserGroupsUpdateComponent } from './admin/views/general/usergroups/update';

import { AdminUserGroupRightsIndexComponent } from './admin/views/general/usergrouprights';
import { AdminUserGroupRightsInsertComponent } from './admin/views/general/usergrouprights/insert';
import { AdminUserGroupRightsUpdateComponent } from './admin/views/general/usergrouprights/update';

import { AdminUserGroupProcessIndexComponent } from './admin/views/general/usergroupprocess';
import { AdminUserGroupProcessInsertComponent } from './admin/views/general/usergroupprocess/insert';
import { AdminUserGroupProcessUpdateComponent } from './admin/views/general/usergroupprocess/update';

import { AdminUserGroupTablesIndexComponent } from './admin/views/general/usergrouptables';
import { AdminUserGroupTablesInsertComponent } from './admin/views/general/usergrouptables/insert';
import { AdminUserGroupTablesUpdateComponent } from './admin/views/general/usergrouptables/update';

import { AdminUsersIndexComponent } from './admin/views/general/users';
import { AdminUsersInsertComponent } from './admin/views/general/users/insert';
import { AdminUsersUpdateComponent } from './admin/views/general/users/update';
import { AdminUsersChangeGroupComponent } from './admin/views/general/users/changegroup';

import { AdminVisitorsIndexComponent } from './admin/views/general/visitors';

//Admin HumanResources



//Services
import { SharedService } from './admin/services/shared';
import { ModelService } from './admin/services/model';
import { SiteService } from './services/site';
import { Lib } from './lib/methods';
import { AdminLib } from './admin/lib/methods';

//Layout
import { LayoutComponent } from './views/shared/layout';
import { HeaderComponent } from './views/shared/controls/header';
import { MenuComponent } from './views/shared/controls/menu';
import { FooterComponent } from './views/shared/controls/footer';
import { ScriptsComponent } from './views/shared/controls/scripts';
import { ModalAlertComponent } from './views/shared/common/modalalert';
import { ModalConfirmComponent } from './views/shared/common/modalconfirm';
import { RespHeaderComponent } from './views/shared/controls/responsive/header';
import { RespMenuComponent } from './views/shared/controls/responsive/menu';
import { RespSearchComponent } from './views/shared/controls/responsive/search';
import { PopupLoginComponent } from './views/shared/controls/popup/login';
import { PopupSignupComponent } from './views/shared/controls/popup/signup';

//Home
import { IndexComponent } from './views/home';
import { HomeTopComponent } from './views/home/parts/top';
import { HomeSliderComponent } from './views/home/parts/slider';
import { HomeSearchComponent } from './views/home/parts/search';
import { HomePopCatComponent } from './views/home/parts/popcat';
import { HomeAccountComponent } from './views/home/parts/account';
import { HomeJobsComponent } from './views/home/parts/jobs';
import { HomeCandidatesComponent } from './views/home/parts/candidates';
import { HomeCompaniesComponent } from './views/home/parts/companies';
import { HomeTipsComponent } from './views/home/parts/tips';
import { HomeQuestionComponent } from './views/home/parts/question';


@NgModule({
    declarations: [
        AppComponent,

        //Layout
        LayoutComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        ScriptsComponent,
        ModalAlertComponent,
        ModalConfirmComponent,
        RespHeaderComponent,
        RespSearchComponent,
        RespMenuComponent,
        PopupLoginComponent,
        PopupSignupComponent,

        //Home
        IndexComponent,
        HomeTopComponent,
        HomeSliderComponent,
        HomeSearchComponent,
        HomePopCatComponent,
        HomeAccountComponent,
        HomeJobsComponent,
        HomeCandidatesComponent,
        HomeCompaniesComponent,
        HomeTipsComponent,
        HomeQuestionComponent,

        //Admin
        AdminLayoutComponent,
        AdminLoginComponent,
        AdminFooterComponent,
        AdminHeaderComponent,
        AdminLeftMenuComponent,
        AdminScriptsComponent,
        AdminCopyDeleteComponent,
        AdminIndexComponent,

        //Admin General
        AdminCategoryIndexComponent,
        AdminCategoryInsertComponent,
        AdminCategoryUpdateComponent,

        AdminContentIndexComponent,
        AdminContentInsertComponent,
        AdminContentUpdateComponent,

        AdminFilesIndexComponent,
        AdminFilesInsertComponent,
        AdminFilesUpdateComponent,

        AdminLinksIndexComponent,
        AdminLinksInsertComponent,
        AdminLinksUpdateComponent,

        AdminLinkTypesIndexComponent,
        AdminLinkTypesInsertComponent,
        AdminLinkTypesUpdateComponent,

        AdminLogProcessIndexComponent,
        AdminLogProcessInsertComponent,
        AdminLogProcessUpdateComponent,

        AdminLogsIndexComponent,

        AdminLogTypesIndexComponent,
        AdminLogTypesInsertComponent,
        AdminLogTypesUpdateComponent,

        AdminMetaIndexComponent,
        AdminMetaInsertComponent,
        AdminMetaUpdateComponent,

        AdminPicturesIndexComponent,
        AdminPicturesInsertComponent,
        AdminPicturesUpdateComponent,

        AdminTranslationIndexComponent,
        AdminTranslationInsertComponent,
        AdminTranslationUpdateComponent,

        AdminTypesIndexComponent,
        AdminTypesInsertComponent,
        AdminTypesUpdateComponent,

        AdminUserGroupsIndexComponent,
        AdminUserGroupsInsertComponent,
        AdminUserGroupsUpdateComponent,

        AdminUserGroupRightsIndexComponent,
        AdminUserGroupRightsInsertComponent,
        AdminUserGroupRightsUpdateComponent,

        AdminUserGroupProcessIndexComponent,
        AdminUserGroupProcessInsertComponent,
        AdminUserGroupProcessUpdateComponent,

        AdminUserGroupTablesIndexComponent,
        AdminUserGroupTablesInsertComponent,
        AdminUserGroupTablesUpdateComponent,

        AdminUsersIndexComponent,
        AdminUsersInsertComponent,
        AdminUsersUpdateComponent,
        AdminUsersChangeGroupComponent,

        AdminVisitorsIndexComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        HttpClientModule
    ],

    //'/HumanResources/' -> '/' Bu þekilde deðiþecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/HumanResources/' },
        SharedService,
        ModelService,
        SiteService,
        Lib,
        AdminLib
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
