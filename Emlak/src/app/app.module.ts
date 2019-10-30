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

import { AdminCityIndexComponent } from './admin/views/property/city';
import { AdminCityInsertComponent } from './admin/views/property/city/insert';
import { AdminCityUpdateComponent } from './admin/views/property/city/update';

import { AdminFuelTypeIndexComponent } from './admin/views/property/fueltype';
import { AdminFuelTypeInsertComponent } from './admin/views/property/fueltype/insert';
import { AdminFuelTypeUpdateComponent } from './admin/views/property/fueltype/update';

import { AdminFuelTypeTIndexComponent } from './admin/views/property/fueltypet';
import { AdminFuelTypeTInsertComponent } from './admin/views/property/fueltypet/insert';
import { AdminFuelTypeTUpdateComponent } from './admin/views/property/fueltypet/update';

import { AdminPropertyIndexComponent } from './admin/views/property/property';
import { AdminPropertyInsertComponent } from './admin/views/property/property/insert';
import { AdminPropertyUpdateComponent } from './admin/views/property/property/update';

import { AdminPropertyCategoriesIndexComponent } from './admin/views/property/propertycategories';
import { AdminPropertyCategoriesInsertComponent } from './admin/views/property/propertycategories/insert';
import { AdminPropertyCategoriesUpdateComponent } from './admin/views/property/propertycategories/update';

import { AdminPropertyCategoriesTIndexComponent } from './admin/views/property/propertycategoriest';
import { AdminPropertyCategoriesTInsertComponent } from './admin/views/property/propertycategoriest/insert';
import { AdminPropertyCategoriesTUpdateComponent } from './admin/views/property/propertycategoriest/update';

import { AdminPropertyDetailsIndexComponent } from './admin/views/property/propertydetails';
import { AdminPropertyDetailsInsertComponent } from './admin/views/property/propertydetails/insert';
import { AdminPropertyDetailsUpdateComponent } from './admin/views/property/propertydetails/update';

import { AdminPropertyFeaturesIndexComponent } from './admin/views/property/propertyfeatures';
import { AdminPropertyFeaturesInsertComponent } from './admin/views/property/propertyfeatures/insert';
import { AdminPropertyFeaturesUpdateComponent } from './admin/views/property/propertyfeatures/update';

import { AdminPropertyPicturesIndexComponent } from './admin/views/property/propertypictures';
import { AdminPropertyPicturesInsertComponent } from './admin/views/property/propertypictures/insert';
import { AdminPropertyPicturesUpdateComponent } from './admin/views/property/propertypictures/update';

import { AdminPropertyStatusIndexComponent } from './admin/views/property/propertystatus';
import { AdminPropertyStatusInsertComponent } from './admin/views/property/propertystatus/insert';
import { AdminPropertyStatusUpdateComponent } from './admin/views/property/propertystatus/update';

import { AdminPropertyStatusTIndexComponent } from './admin/views/property/propertystatust';
import { AdminPropertyStatusTInsertComponent } from './admin/views/property/propertystatust/insert';
import { AdminPropertyStatusTUpdateComponent } from './admin/views/property/propertystatust/update';

import { AdminPropertyTIndexComponent } from './admin/views/property/propertyt';
import { AdminPropertyTInsertComponent } from './admin/views/property/propertyt/insert';
import { AdminPropertyTUpdateComponent } from './admin/views/property/propertyt/update';

import { AdminWarmTypeIndexComponent } from './admin/views/property/warmtype';
import { AdminWarmTypeInsertComponent } from './admin/views/property/warmtype/insert';
import { AdminWarmTypeUpdateComponent } from './admin/views/property/warmtype/update';

import { AdminWarmTypeTIndexComponent } from './admin/views/property/warmtypet';
import { AdminWarmTypeTInsertComponent } from './admin/views/property/warmtypet/insert';
import { AdminWarmTypeTUpdateComponent } from './admin/views/property/warmtypet/update';

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

        AdminCityIndexComponent,
        AdminCityInsertComponent,
        AdminCityUpdateComponent,

        AdminFuelTypeIndexComponent,
        AdminFuelTypeInsertComponent,
        AdminFuelTypeUpdateComponent,

        AdminFuelTypeTIndexComponent,
        AdminFuelTypeTInsertComponent,
        AdminFuelTypeTUpdateComponent,

        AdminPropertyIndexComponent,
        AdminPropertyInsertComponent,
        AdminPropertyUpdateComponent,

        AdminPropertyCategoriesIndexComponent,
        AdminPropertyCategoriesInsertComponent,
        AdminPropertyCategoriesUpdateComponent,

        AdminPropertyCategoriesTIndexComponent,
        AdminPropertyCategoriesTInsertComponent,
        AdminPropertyCategoriesTUpdateComponent,

        AdminPropertyDetailsIndexComponent,
        AdminPropertyDetailsInsertComponent,
        AdminPropertyDetailsUpdateComponent,

        AdminPropertyFeaturesIndexComponent,
        AdminPropertyFeaturesInsertComponent,
        AdminPropertyFeaturesUpdateComponent,

        AdminPropertyPicturesIndexComponent,
        AdminPropertyPicturesInsertComponent,
        AdminPropertyPicturesUpdateComponent,

        AdminPropertyStatusIndexComponent,
        AdminPropertyStatusInsertComponent,
        AdminPropertyStatusUpdateComponent,

        AdminPropertyStatusTIndexComponent,
        AdminPropertyStatusTInsertComponent,
        AdminPropertyStatusTUpdateComponent,

        AdminPropertyTIndexComponent,
        AdminPropertyTInsertComponent,
        AdminPropertyTUpdateComponent,

        AdminWarmTypeIndexComponent,
        AdminWarmTypeInsertComponent,
        AdminWarmTypeUpdateComponent,

        AdminWarmTypeTIndexComponent,
        AdminWarmTypeTInsertComponent,
        AdminWarmTypeTUpdateComponent,

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
