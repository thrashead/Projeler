import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';

//Layout
import { LayoutComponent } from './views/shared/layout';
import { HeaderComponent } from './views/shared/controls/header';
import { FooterComponent } from './views/shared/controls/footer';
import { ScriptsComponent } from './views/shared/controls/scripts';

//Shared
import { SharedBookNowComponent } from './views/shared/common/booknow';
import { SharedCallUsComponent } from './views/shared/common/callus';

//Home
import { IndexComponent } from './views/home';
import { HomeSliderComponent } from './views/home/parts/slider';
import { HomeSearchComponent } from './views/home/parts/search';
import { HomeFeaturedComponent } from './views/home/parts/featured';
import { HomeWelcomeComponent } from './views/home/parts/welcome';
import { HomeWorldComponent } from './views/home/parts/world';
import { HomeAsksComponent } from './views/home/parts/asks';
import { HomeAutoComponent } from './views/home/parts/auto';
import { HomeCountComponent } from './views/home/parts/count';
import { HomeNewsletterComponent } from './views/home/parts/newsletter';
import { HomeReviewComponent } from './views/home/parts/review';

//About
import { AboutComponent } from './views/about';
import { AboutHeaderComponent } from './views/about/parts/header';
import { AboutBreadCumbsComponent } from './views/about/parts/breadcumbs';
import { AboutBestComponent } from './views/about/parts/best';
import { AboutWhatComponent } from './views/about/parts/what';
import { AboutMoreComponent } from './views/about/parts/more';
import { AboutWorkersComponent } from './views/about/parts/workers';

//Blog
import { BlogComponent } from './views/blog';
import { BlogHeaderComponent } from './views/blog/parts/header';
import { BlogBreadCumbsComponent } from './views/blog/parts/breadcumbs';
import { BlogDetailComponent } from './views/blog/detail';
import { BlogItemsComponent } from './views/blog/parts/items';
import { BlogItemComponent } from './views/blog/parts/item';
import { BlogSearchComponent } from './views/blog/parts/search';
import { BlogCategoriesComponent } from './views/blog/parts/categories';
import { BlogPopularComponent } from './views/blog/parts/popular';

//Contact
import { ContactComponent } from './views/contact';
import { ContactHeaderComponent } from './views/contact/parts/header';
import { ContactBreadCumbsComponent } from './views/contact/parts/breadcumbs';
import { ContactMapComponent } from './views/contact/parts/map';
import { ContactFormComponent } from './views/contact/parts/form';

//CarsList
import { CarsListComponent } from './views/cars/list';
import { CarsListHeaderComponent } from './views/cars/list/parts/header';
import { CarsListBreadCumbsComponent } from './views/cars/list/parts/breadcumbs';
import { CarsListInfoComponent } from './views/cars/list/parts/info';
import { CarsListItemsComponent } from './views/cars/list/parts/items';
import { CarsListSearchComponent } from './views/cars/list/parts/search';

//CarsDetail
import { CarsDetailComponent } from './views/cars/detail';
import { CarsDetailHeaderComponent } from './views/cars/detail/parts/header';
import { CarsDetailBreadCumbsComponent } from './views/cars/detail/parts/breadcumbs';
import { CarsDetailInfoComponent } from './views/cars/detail/parts/info';
import { CarsDetailItemComponent } from './views/cars/detail/parts/item';
import { CarsDetailRelatedComponent } from './views/cars/detail/parts/related';
import { CarsDetailBrandsComponent } from './views/cars/detail/parts/brands';

//CarsCompare
import { CarsCompareComponent } from './views/cars/compare';
import { CarsCompareHeaderComponent } from './views/cars/compare/parts/header';
import { CarsCompareBreadCumbsComponent } from './views/cars/compare/parts/breadcumbs';
import { CarsCompareInfoComponent } from './views/cars/compare/parts/info';
import { CarsCompareItemsComponent } from './views/cars/compare/parts/items';

//CarsBooking
import { CarsBookComponent } from './views/cars/booking';
import { CarsBookingHeaderComponent } from './views/cars/booking/parts/header';
import { CarsBookingBreadCumbsComponent } from './views/cars/booking/parts/breadcumbs';
import { CarsBookFeaturesComponent } from './views/cars/booking/features';
import { CarsBookCarsComponent } from './views/cars/booking/cars';
import { CarsBookSubmitComponent } from './views/cars/booking/submit';

//Admin
import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminLoginComponent } from './admin/views/home/login';
import { AdminHeaderComponent } from './admin/views/shared/controls/header';
import { AdminLeftMenuComponent } from './admin/views/shared/controls/leftmenu';
import { AdminFooterComponent } from './admin/views/shared/controls/footer';
import { AdminScriptsComponent } from './admin/views/shared/controls/scripts';
import { AdminCopyDeleteComponent } from './admin/views/shared/controls/copydelete';
import { AdminIndexComponent } from './admin/views/home/index';


//Admin RentACar
import { AdminBlogIndexComponent } from './admin/views/rentacar/blog';
import { AdminBlogInsertComponent } from './admin/views/rentacar/blog/insert';
import { AdminBlogUpdateComponent } from './admin/views/rentacar/blog/update';

import { AdminBlogCategoryIndexComponent } from './admin/views/rentacar/blogcategory';
import { AdminBlogCategoryInsertComponent } from './admin/views/rentacar/blogcategory/insert';
import { AdminBlogCategoryUpdateComponent } from './admin/views/rentacar/blogcategory/update';

import { AdminBlogCategoryTIndexComponent } from './admin/views/rentacar/blogcategoryt';
import { AdminBlogCategoryTInsertComponent } from './admin/views/rentacar/blogcategoryt/insert';
import { AdminBlogCategoryTUpdateComponent } from './admin/views/rentacar/blogcategoryt/update';

import { AdminBlogCommentsIndexComponent } from './admin/views/rentacar/blogcomments';
import { AdminBlogCommentsInsertComponent } from './admin/views/rentacar/blogcomments/insert';
import { AdminBlogCommentsUpdateComponent } from './admin/views/rentacar/blogcomments/update';

import { AdminBlogPicturesIndexComponent } from './admin/views/rentacar/blogpictures';
import { AdminBlogPicturesInsertComponent } from './admin/views/rentacar/blogpictures/insert';
import { AdminBlogPicturesUpdateComponent } from './admin/views/rentacar/blogpictures/update';

import { AdminBlogTIndexComponent } from './admin/views/rentacar/blogt';
import { AdminBlogTInsertComponent } from './admin/views/rentacar/blogt/insert';
import { AdminBlogTUpdateComponent } from './admin/views/rentacar/blogt/update';

import { AdminBlogVideosIndexComponent } from './admin/views/rentacar/blogvideos';
import { AdminBlogVideosInsertComponent } from './admin/views/rentacar/blogvideos/insert';
import { AdminBlogVideosUpdateComponent } from './admin/views/rentacar/blogvideos/update';

import { AdminCarDescIndexComponent } from './admin/views/rentacar/cardesc';
import { AdminCarDescInsertComponent } from './admin/views/rentacar/cardesc/insert';
import { AdminCarDescUpdateComponent } from './admin/views/rentacar/cardesc/update';

import { AdminCarDescTIndexComponent } from './admin/views/rentacar/cardesct';
import { AdminCarDescTInsertComponent } from './admin/views/rentacar/cardesct/insert';
import { AdminCarDescTUpdateComponent } from './admin/views/rentacar/cardesct/update';

import { AdminCarDetailsBasicIndexComponent } from './admin/views/rentacar/cardetailsbasic';
import { AdminCarDetailsBasicInsertComponent } from './admin/views/rentacar/cardetailsbasic/insert';
import { AdminCarDetailsBasicUpdateComponent } from './admin/views/rentacar/cardetailsbasic/update';

import { AdminCarDetailsExtIntIndexComponent } from './admin/views/rentacar/cardetailsextint';
import { AdminCarDetailsExtIntInsertComponent } from './admin/views/rentacar/cardetailsextint/insert';
import { AdminCarDetailsExtIntUpdateComponent } from './admin/views/rentacar/cardetailsextint/update';

import { AdminCarDetailsFeaturesIndexComponent } from './admin/views/rentacar/cardetailsfeatures';
import { AdminCarDetailsFeaturesInsertComponent } from './admin/views/rentacar/cardetailsfeatures/insert';
import { AdminCarDetailsFeaturesUpdateComponent } from './admin/views/rentacar/cardetailsfeatures/update';

import { AdminCarDetailsMechanicalIndexComponent } from './admin/views/rentacar/cardetailsmechanical';
import { AdminCarDetailsMechanicalInsertComponent } from './admin/views/rentacar/cardetailsmechanical/insert';
import { AdminCarDetailsMechanicalUpdateComponent } from './admin/views/rentacar/cardetailsmechanical/update';

import { AdminCarFeatsBodyTypeIndexComponent } from './admin/views/rentacar/carfeatsbodytype';
import { AdminCarFeatsBodyTypeInsertComponent } from './admin/views/rentacar/carfeatsbodytype/insert';
import { AdminCarFeatsBodyTypeUpdateComponent } from './admin/views/rentacar/carfeatsbodytype/update';

import { AdminCarFeatsBodyTypeTIndexComponent } from './admin/views/rentacar/carfeatsbodytypet';
import { AdminCarFeatsBodyTypeTInsertComponent } from './admin/views/rentacar/carfeatsbodytypet/insert';
import { AdminCarFeatsBodyTypeTUpdateComponent } from './admin/views/rentacar/carfeatsbodytypet/update';

import { AdminCarFeatsDriveTypeIndexComponent } from './admin/views/rentacar/carfeatsdrivetype';
import { AdminCarFeatsDriveTypeInsertComponent } from './admin/views/rentacar/carfeatsdrivetype/insert';
import { AdminCarFeatsDriveTypeUpdateComponent } from './admin/views/rentacar/carfeatsdrivetype/update';

import { AdminCarFeatsDriveTypeTIndexComponent } from './admin/views/rentacar/carfeatsdrivetypet';
import { AdminCarFeatsDriveTypeTInsertComponent } from './admin/views/rentacar/carfeatsdrivetypet/insert';
import { AdminCarFeatsDriveTypeTUpdateComponent } from './admin/views/rentacar/carfeatsdrivetypet/update';

import { AdminCarFeatsEngineTypeIndexComponent } from './admin/views/rentacar/carfeatsenginetype';
import { AdminCarFeatsEngineTypeInsertComponent } from './admin/views/rentacar/carfeatsenginetype/insert';
import { AdminCarFeatsEngineTypeUpdateComponent } from './admin/views/rentacar/carfeatsenginetype/update';

import { AdminCarFeatsEngineTypeTIndexComponent } from './admin/views/rentacar/carfeatsenginetypet';
import { AdminCarFeatsEngineTypeTInsertComponent } from './admin/views/rentacar/carfeatsenginetypet/insert';
import { AdminCarFeatsEngineTypeTUpdateComponent } from './admin/views/rentacar/carfeatsenginetypet/update';

import { AdminCarFeatsFuelTypeIndexComponent } from './admin/views/rentacar/carfeatsfueltype';
import { AdminCarFeatsFuelTypeInsertComponent } from './admin/views/rentacar/carfeatsfueltype/insert';
import { AdminCarFeatsFuelTypeUpdateComponent } from './admin/views/rentacar/carfeatsfueltype/update';

import { AdminCarFeatsFuelTypeTIndexComponent } from './admin/views/rentacar/carfeatsfueltypet';
import { AdminCarFeatsFuelTypeTInsertComponent } from './admin/views/rentacar/carfeatsfueltypet/insert';
import { AdminCarFeatsFuelTypeTUpdateComponent } from './admin/views/rentacar/carfeatsfueltypet/update';

import { AdminCarFeatsGearsTypeIndexComponent } from './admin/views/rentacar/carfeatsgearstype';
import { AdminCarFeatsGearsTypeInsertComponent } from './admin/views/rentacar/carfeatsgearstype/insert';
import { AdminCarFeatsGearsTypeUpdateComponent } from './admin/views/rentacar/carfeatsgearstype/update';

import { AdminCarFeatsGearsTypeTIndexComponent } from './admin/views/rentacar/carfeatsgearstypet';
import { AdminCarFeatsGearsTypeTInsertComponent } from './admin/views/rentacar/carfeatsgearstypet/insert';
import { AdminCarFeatsGearsTypeTUpdateComponent } from './admin/views/rentacar/carfeatsgearstypet/update';

import { AdminCarFeatsMakeIndexComponent } from './admin/views/rentacar/carfeatsmake';
import { AdminCarFeatsMakeInsertComponent } from './admin/views/rentacar/carfeatsmake/insert';
import { AdminCarFeatsMakeUpdateComponent } from './admin/views/rentacar/carfeatsmake/update';

import { AdminCarFeatsModelIndexComponent } from './admin/views/rentacar/carfeatsmodel';
import { AdminCarFeatsModelInsertComponent } from './admin/views/rentacar/carfeatsmodel/insert';
import { AdminCarFeatsModelUpdateComponent } from './admin/views/rentacar/carfeatsmodel/update';

import { AdminCarsIndexComponent } from './admin/views/rentacar/cars';
import { AdminCarsInsertComponent } from './admin/views/rentacar/cars/insert';
import { AdminCarsUpdateComponent } from './admin/views/rentacar/cars/update';

import { AdminCarStatusIndexComponent } from './admin/views/rentacar/carstatus';
import { AdminCarStatusInsertComponent } from './admin/views/rentacar/carstatus/insert';
import { AdminCarStatusUpdateComponent } from './admin/views/rentacar/carstatus/update';

import { AdminCarStatusTIndexComponent } from './admin/views/rentacar/carstatust';
import { AdminCarStatusTInsertComponent } from './admin/views/rentacar/carstatust/insert';
import { AdminCarStatusTUpdateComponent } from './admin/views/rentacar/carstatust/update';

import { AdminContactFormIndexComponent } from './admin/views/rentacar/contactform';
import { AdminContactFormInsertComponent } from './admin/views/rentacar/contactform/insert';
import { AdminContactFormUpdateComponent } from './admin/views/rentacar/contactform/update';

import { AdminLangContentIndexComponent } from './admin/views/rentacar/langcontent';
import { AdminLangContentInsertComponent } from './admin/views/rentacar/langcontent/insert';
import { AdminLangContentUpdateComponent } from './admin/views/rentacar/langcontent/update';

import { AdminLangContentTIndexComponent } from './admin/views/rentacar/langcontentt';
import { AdminLangContentTInsertComponent } from './admin/views/rentacar/langcontentt/insert';
import { AdminLangContentTUpdateComponent } from './admin/views/rentacar/langcontentt/update';

import { AdminNewsletterIndexComponent } from './admin/views/rentacar/newsletter';
import { AdminNewsletterInsertComponent } from './admin/views/rentacar/newsletter/insert';
import { AdminNewsletterUpdateComponent } from './admin/views/rentacar/newsletter/update';

import { AdminNoLangContentIndexComponent } from './admin/views/rentacar/nolangcontent';
import { AdminNoLangContentInsertComponent } from './admin/views/rentacar/nolangcontent/insert';
import { AdminNoLangContentUpdateComponent } from './admin/views/rentacar/nolangcontent/update';

import { AdminWorkersIndexComponent } from './admin/views/rentacar/workers';
import { AdminWorkersInsertComponent } from './admin/views/rentacar/workers/insert';
import { AdminWorkersUpdateComponent } from './admin/views/rentacar/workers/update';

import { AdminWorkersTIndexComponent } from './admin/views/rentacar/workerst';
import { AdminWorkersTInsertComponent } from './admin/views/rentacar/workerst/insert';
import { AdminWorkersTUpdateComponent } from './admin/views/rentacar/workerst/update';



//Admin General
import { AdminCategoryIndexComponent } from './admin/views/general/category';
import { AdminCategoryInsertComponent } from './admin/views/general/category/insert';
import { AdminCategoryUpdateComponent } from './admin/views/general/category/update';

import { AdminCategoryTIndexComponent } from './admin/views/general/categoryt';
import { AdminCategoryTInsertComponent } from './admin/views/general/categoryt/insert';
import { AdminCategoryTUpdateComponent } from './admin/views/general/categoryt/update';

import { AdminContentIndexComponent } from './admin/views/general/content';
import { AdminContentInsertComponent } from './admin/views/general/content/insert';
import { AdminContentUpdateComponent } from './admin/views/general/content/update';

import { AdminContentTIndexComponent } from './admin/views/general/contentt';
import { AdminContentTInsertComponent } from './admin/views/general/contentt/insert';
import { AdminContentTUpdateComponent } from './admin/views/general/contentt/update';

import { AdminFilesIndexComponent } from './admin/views/general/files';
import { AdminFilesInsertComponent } from './admin/views/general/files/insert';
import { AdminFilesUpdateComponent } from './admin/views/general/files/update';

import { AdminGalleryIndexComponent } from './admin/views/general/gallery';
import { AdminGalleryInsertComponent } from './admin/views/general/gallery/insert';
import { AdminGalleryUpdateComponent } from './admin/views/general/gallery/update';

import { AdminGalleryTIndexComponent } from './admin/views/general/galleryt';
import { AdminGalleryTInsertComponent } from './admin/views/general/galleryt/insert';
import { AdminGalleryTUpdateComponent } from './admin/views/general/galleryt/update';

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

import { AdminMetaTIndexComponent } from './admin/views/general/metat';
import { AdminMetaTInsertComponent } from './admin/views/general/metat/insert';
import { AdminMetaTUpdateComponent } from './admin/views/general/metat/update';

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

import { SharedService } from './admin/services/shared';
import { ModelService } from './admin/services/model';
import { SiteService } from './services/site';
import { Lib } from './lib/methods';
import { AdminLib } from './admin/lib/methods';


@NgModule({
    declarations: [
        AppComponent,

        //Layout
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        ScriptsComponent,

        //Shared
        SharedBookNowComponent,
        SharedCallUsComponent,

        //Home
        IndexComponent,
        HomeSliderComponent,
        HomeSearchComponent,
        HomeFeaturedComponent,
        HomeWelcomeComponent,
        HomeWorldComponent,
        HomeAsksComponent,
        HomeAutoComponent,
        HomeCountComponent,
        HomeNewsletterComponent,
        HomeReviewComponent,

        //About
        AboutComponent,
        AboutHeaderComponent,
        AboutBreadCumbsComponent,
        AboutBestComponent,
        AboutWhatComponent,
        AboutMoreComponent,
        AboutWorkersComponent,

        //Blog
        BlogComponent,
        BlogHeaderComponent,
        BlogBreadCumbsComponent,
        BlogDetailComponent,
        BlogItemsComponent,
        BlogItemComponent,
        BlogSearchComponent,
        BlogCategoriesComponent,
        BlogPopularComponent,

        //Contact
        ContactComponent,
        ContactHeaderComponent,
        ContactBreadCumbsComponent,
        ContactMapComponent,
        ContactFormComponent,

        //CarList
        CarsListComponent,
        CarsListHeaderComponent,
        CarsListBreadCumbsComponent,
        CarsListInfoComponent,
        CarsListItemsComponent,
        CarsListSearchComponent,

        //CarDetail
        CarsDetailComponent,
        CarsDetailHeaderComponent,
        CarsDetailBreadCumbsComponent,
        CarsDetailInfoComponent,
        CarsDetailItemComponent,
        CarsDetailRelatedComponent,
        CarsDetailBrandsComponent,

        //CarCompare
        CarsCompareComponent,
        CarsCompareHeaderComponent,
        CarsCompareBreadCumbsComponent,
        CarsCompareInfoComponent,
        CarsCompareItemsComponent,

        //CarBooking
        CarsBookComponent,
        CarsBookingHeaderComponent,
        CarsBookingBreadCumbsComponent,
        CarsBookFeaturesComponent,
        CarsBookCarsComponent,
        CarsBookSubmitComponent,

        //Admin
        AdminLayoutComponent,
        AdminLoginComponent,
        AdminFooterComponent,
        AdminHeaderComponent,
        AdminLeftMenuComponent,
        AdminScriptsComponent,
        AdminCopyDeleteComponent,
        AdminIndexComponent,


        //Admin RentACar
        AdminBlogIndexComponent,
        AdminBlogInsertComponent,
        AdminBlogUpdateComponent,

        AdminBlogCategoryIndexComponent,
        AdminBlogCategoryInsertComponent,
        AdminBlogCategoryUpdateComponent,

        AdminBlogCategoryTIndexComponent,
        AdminBlogCategoryTInsertComponent,
        AdminBlogCategoryTUpdateComponent,

        AdminBlogCommentsIndexComponent,
        AdminBlogCommentsInsertComponent,
        AdminBlogCommentsUpdateComponent,

        AdminBlogPicturesIndexComponent,
        AdminBlogPicturesInsertComponent,
        AdminBlogPicturesUpdateComponent,

        AdminBlogTIndexComponent,
        AdminBlogTInsertComponent,
        AdminBlogTUpdateComponent,

        AdminBlogVideosIndexComponent,
        AdminBlogVideosInsertComponent,
        AdminBlogVideosUpdateComponent,

        AdminCarDetailsBasicIndexComponent,
        AdminCarDetailsBasicInsertComponent,
        AdminCarDetailsBasicUpdateComponent,

        AdminCarDetailsExtIntIndexComponent,
        AdminCarDetailsExtIntInsertComponent,
        AdminCarDetailsExtIntUpdateComponent,

        AdminCarDetailsFeaturesIndexComponent,
        AdminCarDetailsFeaturesInsertComponent,
        AdminCarDetailsFeaturesUpdateComponent,

        AdminCarDetailsMechanicalIndexComponent,
        AdminCarDetailsMechanicalInsertComponent,
        AdminCarDetailsMechanicalUpdateComponent,

        AdminCarFeatsBodyTypeIndexComponent,
        AdminCarFeatsBodyTypeInsertComponent,
        AdminCarFeatsBodyTypeUpdateComponent,

        AdminCarFeatsBodyTypeTIndexComponent,
        AdminCarFeatsBodyTypeTInsertComponent,
        AdminCarFeatsBodyTypeTUpdateComponent,

        AdminCarFeatsDriveTypeIndexComponent,
        AdminCarFeatsDriveTypeInsertComponent,
        AdminCarFeatsDriveTypeUpdateComponent,

        AdminCarFeatsDriveTypeTIndexComponent,
        AdminCarFeatsDriveTypeTInsertComponent,
        AdminCarFeatsDriveTypeTUpdateComponent,

        AdminCarFeatsEngineTypeIndexComponent,
        AdminCarFeatsEngineTypeInsertComponent,
        AdminCarFeatsEngineTypeUpdateComponent,

        AdminCarFeatsEngineTypeTIndexComponent,
        AdminCarFeatsEngineTypeTInsertComponent,
        AdminCarFeatsEngineTypeTUpdateComponent,

        AdminCarFeatsFuelTypeIndexComponent,
        AdminCarFeatsFuelTypeInsertComponent,
        AdminCarFeatsFuelTypeUpdateComponent,

        AdminCarFeatsFuelTypeTIndexComponent,
        AdminCarFeatsFuelTypeTInsertComponent,
        AdminCarFeatsFuelTypeTUpdateComponent,

        AdminCarFeatsGearsTypeIndexComponent,
        AdminCarFeatsGearsTypeInsertComponent,
        AdminCarFeatsGearsTypeUpdateComponent,

        AdminCarFeatsGearsTypeTIndexComponent,
        AdminCarFeatsGearsTypeTInsertComponent,
        AdminCarFeatsGearsTypeTUpdateComponent,

        AdminCarFeatsMakeIndexComponent,
        AdminCarFeatsMakeInsertComponent,
        AdminCarFeatsMakeUpdateComponent,

        AdminCarFeatsModelIndexComponent,
        AdminCarFeatsModelInsertComponent,
        AdminCarFeatsModelUpdateComponent,

        AdminCarsIndexComponent,
        AdminCarsInsertComponent,
        AdminCarsUpdateComponent,

        AdminCarDescIndexComponent,
        AdminCarDescInsertComponent,
        AdminCarDescUpdateComponent,

        AdminCarDescTIndexComponent,
        AdminCarDescTInsertComponent,
        AdminCarDescTUpdateComponent,

        AdminCarStatusIndexComponent,
        AdminCarStatusInsertComponent,
        AdminCarStatusUpdateComponent,

        AdminCarStatusTIndexComponent,
        AdminCarStatusTInsertComponent,
        AdminCarStatusTUpdateComponent,

        AdminContactFormIndexComponent,
        AdminContactFormInsertComponent,
        AdminContactFormUpdateComponent,

        AdminLangContentIndexComponent,
        AdminLangContentInsertComponent,
        AdminLangContentUpdateComponent,

        AdminLangContentTIndexComponent,
        AdminLangContentTInsertComponent,
        AdminLangContentTUpdateComponent,

        AdminNewsletterIndexComponent,
        AdminNewsletterInsertComponent,
        AdminNewsletterUpdateComponent,

        AdminNoLangContentIndexComponent,
        AdminNoLangContentInsertComponent,
        AdminNoLangContentUpdateComponent,

        AdminWorkersIndexComponent,
        AdminWorkersInsertComponent,
        AdminWorkersUpdateComponent,

        AdminWorkersTIndexComponent,
        AdminWorkersTInsertComponent,
        AdminWorkersTUpdateComponent,


        //Admin General
        AdminCategoryIndexComponent,
        AdminCategoryInsertComponent,
        AdminCategoryUpdateComponent,

        AdminCategoryTIndexComponent,
        AdminCategoryTInsertComponent,
        AdminCategoryTUpdateComponent,

        AdminContentIndexComponent,
        AdminContentInsertComponent,
        AdminContentUpdateComponent,

        AdminContentTIndexComponent,
        AdminContentTInsertComponent,
        AdminContentTUpdateComponent,

        AdminFilesIndexComponent,
        AdminFilesInsertComponent,
        AdminFilesUpdateComponent,

        AdminGalleryIndexComponent,
        AdminGalleryInsertComponent,
        AdminGalleryUpdateComponent,

        AdminGalleryTIndexComponent,
        AdminGalleryTInsertComponent,
        AdminGalleryTUpdateComponent,

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

        AdminMetaTIndexComponent,
        AdminMetaTInsertComponent,
        AdminMetaTUpdateComponent,

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

    //'/RentACar/' -> '/' Bu þekilde deðiþecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/RentACar/' },
        SharedService,
        ModelService,
        SiteService,
        Lib,
        AdminLib
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
