import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';

//Site
import { LayoutComponent } from './views/shared/layout';
import { ScriptsComponent } from './views/shared/controls/scripts';
import { HeaderComponent } from './views/shared/controls/header';
import { HeaderMenuComponent } from './views/shared/controls/menu';
import { FooterComponent } from './views/shared/controls/footer';

import { IndexComponent } from './views/home/index';
import { SliderComponent } from './views/home/controls/slider';
import { SearchComponent } from './views/home/controls/search';
import { ReOfDayComponent } from './views/home/controls/reofday';
import { ShowroomComponent } from './views/home/controls/showroom';
import { NewReComponent } from './views/home/controls/newre';
import { NewsComponent } from './views/home/controls/news';
import { AboutComponent } from './views/home/controls/about';

import { ContentIndexComponent } from './views/content';
import { ContentHeaderComponent } from './views/content/controls/header';
import { ContentReListComponent } from './views/content/controls/relist';
import { ContentSearchComponent } from './views/content/controls/search';
import { ContentContactComponent } from './views/content/contact';
import { ContentNewsComponent } from './views/content/news';

import { PropertyIndexComponent } from './views/property';
import { PropertySearchComponent } from './views/property/controls/search';
import { PropertyDetailComponent } from './views/property/detail';

//Admin
import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminHeaderComponent } from './admin/views/shared/controls/header';
import { AdminLeftMenuComponent } from './admin/views/shared/controls/leftmenu';
import { AdminFooterComponent } from './admin/views/shared/controls/footer';
import { AdminScriptsComponent } from './admin/views/shared/controls/scripts';
import { AdminCopyDeleteComponent } from './admin/views/shared/controls/copydelete';
import { AdminIndexComponent } from './admin/views/home/index';
import { AdminLoginComponent } from './admin/views/home/login';

import { AdminRealEstatesIndexComponent } from './admin/views/property/realestates';
import { AdminRealEstatesInsertComponent } from './admin/views/property/realestates/insert';
import { AdminRealEstatesUpdateComponent } from './admin/views/property/realestates/update';

import { AdminRealEstatesTIndexComponent } from './admin/views/property/realestatest';
import { AdminRealEstatesTInsertComponent } from './admin/views/property/realestatest/insert';
import { AdminRealEstatesTUpdateComponent } from './admin/views/property/realestatest/update';

import { AdminLangContentIndexComponent } from './admin/views/general/langcontent';
import { AdminLangContentInsertComponent } from './admin/views/general/langcontent/insert';
import { AdminLangContentUpdateComponent } from './admin/views/general/langcontent/update';

import { AdminLangContentTIndexComponent } from './admin/views/general/langcontentt';
import { AdminLangContentTInsertComponent } from './admin/views/general/langcontentt/insert';
import { AdminLangContentTUpdateComponent } from './admin/views/general/langcontentt/update';

import { AdminLinksIndexComponent } from './admin/views/general/links';
import { AdminLinksInsertComponent } from './admin/views/general/links/insert';
import { AdminLinksUpdateComponent } from './admin/views/general/links/update';

import { AdminLinkTypesIndexComponent } from './admin/views/general/linktypes';
import { AdminLinkTypesInsertComponent } from './admin/views/general/linktypes/insert';
import { AdminLinkTypesUpdateComponent } from './admin/views/general/linktypes/update';

import { AdminTranslationIndexComponent } from './admin/views/general/translation';
import { AdminTranslationInsertComponent } from './admin/views/general/translation/insert';
import { AdminTranslationUpdateComponent } from './admin/views/general/translation/update';

import { AdminFileIndexComponent } from './admin/views/general/file';
import { AdminFileInsertComponent } from './admin/views/general/file/insert';
import { AdminFileUpdateComponent } from './admin/views/general/file/update';

import { AdminGalleryIndexComponent } from './admin/views/general/gallery';
import { AdminGalleryInsertComponent } from './admin/views/general/gallery/insert';
import { AdminGalleryUpdateComponent } from './admin/views/general/gallery/update';

import { AdminGalleryTIndexComponent } from './admin/views/general/galleryt';
import { AdminGalleryTInsertComponent } from './admin/views/general/galleryt/insert';
import { AdminGalleryTUpdateComponent } from './admin/views/general/galleryt/update';

import { AdminContentIndexComponent } from './admin/views/general/content';
import { AdminContentInsertComponent } from './admin/views/general/content/insert';
import { AdminContentUpdateComponent } from './admin/views/general/content/update';

import { AdminContentTIndexComponent } from './admin/views/general/contentt';
import { AdminContentTInsertComponent } from './admin/views/general/contentt/insert';
import { AdminContentTUpdateComponent } from './admin/views/general/contentt/update';

import { AdminCategoryIndexComponent } from './admin/views/general/category';
import { AdminCategoryInsertComponent } from './admin/views/general/category/insert';
import { AdminCategoryUpdateComponent } from './admin/views/general/category/update';

import { AdminCategoryTIndexComponent } from './admin/views/general/categoryt';
import { AdminCategoryTInsertComponent } from './admin/views/general/categoryt/insert';
import { AdminCategoryTUpdateComponent } from './admin/views/general/categoryt/update';

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
import { AdminUsersGrupDegistirComponent } from './admin/views/general/users/grupdegistir';

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

import { AdminMetaTIndexComponent } from './admin/views/general/metat';
import { AdminMetaTInsertComponent } from './admin/views/general/metat/insert';
import { AdminMetaTUpdateComponent } from './admin/views/general/metat/update';

import { AdminPictureIndexComponent } from './admin/views/general/picture';
import { AdminPictureInsertComponent } from './admin/views/general/picture/insert';
import { AdminPictureUpdateComponent } from './admin/views/general/picture/update';

import { AdminTypesIndexComponent } from './admin/views/general/types';
import { AdminTypesInsertComponent } from './admin/views/general/types/insert';
import { AdminTypesUpdateComponent } from './admin/views/general/types/update';

import { AdminVisitorCounterIndexComponent } from './admin/views/general/visitorcounter';

//Services
import { SiteService } from './services/site';

//Admin Services
import { SharedService } from './admin/services/shared';
import { ModelService } from './admin/services/model';

//Library
import { Lib } from './lib/methods';
import { AdminLib } from './admin/lib/methods';


@NgModule({
    declarations: [
        AppComponent,

        //Site
        LayoutComponent,
        ScriptsComponent,
        HeaderComponent,
        HeaderMenuComponent,
        FooterComponent,

        IndexComponent,
        SliderComponent,
        SearchComponent,
        ReOfDayComponent,
        ShowroomComponent,
        NewReComponent,
        NewsComponent,
        AboutComponent,

        ContentIndexComponent,
        ContentHeaderComponent,
        ContentReListComponent,
        ContentSearchComponent,
        ContentContactComponent,
        ContentNewsComponent,

        PropertyIndexComponent,
        PropertyDetailComponent,
        PropertySearchComponent,

        //Admin
        AdminLayoutComponent,
        AdminFooterComponent,
        AdminHeaderComponent,
        AdminLeftMenuComponent,
        AdminScriptsComponent,
        AdminCopyDeleteComponent,
        AdminIndexComponent,
        AdminLoginComponent,

        AdminLinksIndexComponent,
        AdminLinksInsertComponent,
        AdminLinksUpdateComponent,

        AdminLinkTypesIndexComponent,
        AdminLinkTypesInsertComponent,
        AdminLinkTypesUpdateComponent,

        AdminTranslationIndexComponent,
        AdminTranslationInsertComponent,
        AdminTranslationUpdateComponent,

        AdminFileIndexComponent,
        AdminFileInsertComponent,
        AdminFileUpdateComponent,

        AdminRealEstatesIndexComponent,
        AdminRealEstatesInsertComponent,
        AdminRealEstatesUpdateComponent,

        AdminRealEstatesTIndexComponent,
        AdminRealEstatesTInsertComponent,
        AdminRealEstatesTUpdateComponent,

        AdminGalleryIndexComponent,
        AdminGalleryInsertComponent,
        AdminGalleryUpdateComponent,

        AdminGalleryTIndexComponent,
        AdminGalleryTInsertComponent,
        AdminGalleryTUpdateComponent,

        AdminContentIndexComponent,
        AdminContentInsertComponent,
        AdminContentUpdateComponent,

        AdminContentTIndexComponent,
        AdminContentTInsertComponent,
        AdminContentTUpdateComponent,

        AdminCategoryIndexComponent,
        AdminCategoryInsertComponent,
        AdminCategoryUpdateComponent,

        AdminCategoryTIndexComponent,
        AdminCategoryTInsertComponent,
        AdminCategoryTUpdateComponent,

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
        AdminUsersGrupDegistirComponent,

        AdminLangContentIndexComponent,
        AdminLangContentInsertComponent,
        AdminLangContentUpdateComponent,

        AdminLangContentTIndexComponent,
        AdminLangContentTInsertComponent,
        AdminLangContentTUpdateComponent,

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

        AdminMetaTIndexComponent,
        AdminMetaTInsertComponent,
        AdminMetaTUpdateComponent,

        AdminPictureIndexComponent,
        AdminPictureInsertComponent,
        AdminPictureUpdateComponent,

        AdminTypesIndexComponent,
        AdminTypesInsertComponent,
        AdminTypesUpdateComponent,

        AdminVisitorCounterIndexComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        HttpClientModule
    ],
    //'/Emlak/' -> '/' Bu þekilde deðiþecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/Emlak/' },
        SiteService,

        SharedService,
        ModelService,

        Lib,
        AdminLib
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
