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
import { HomeContactComponent } from './views/home/parts/contact';
import { HomeReviewComponent } from './views/home/parts/review';

//About
import { AboutComponent } from './views/about';
import { AboutHeaderComponent } from './views/about/parts/header';
import { AboutBreadCumbsComponent } from './views/about/parts/breadcumbs';
import { AboutBestComponent } from './views/about/parts/best';
import { AboutWhatComponent } from './views/about/parts/what';
import { AboutMoreComponent } from './views/about/parts/more';
import { AboutPersonalComponent } from './views/about/parts/personal';

//Blog
import { BlogComponent } from './views/blog';
import { BlogHeaderComponent } from './views/blog/parts/header';
import { BlogBreadCumbsComponent } from './views/blog/parts/breadcumbs';
import { BlogDetailComponent } from './views/blog/detail';
import { BlogItemsComponent } from './views/blog/parts/items';
import { BlogItemComponent } from './views/blog/parts/item';

//Contact
import { ContactComponent } from './views/contact';
import { ContactHeaderComponent } from './views/contact/parts/header';
import { ContactBreadCumbsComponent } from './views/contact/parts/breadcumbs';
import { ContactMapComponent } from './views/contact/parts/map';
import { ContactFormComponent } from './views/contact/parts/form';

//CarList
import { CarListComponent } from './views/car/list';
import { CarListHeaderComponent } from './views/car/list/parts/header';
import { CarListBreadCumbsComponent } from './views/car/list/parts/breadcumbs';
import { CarListInfoComponent } from './views/car/list/parts/info';
import { CarListItemsComponent } from './views/car/list/parts/items';

//CarDetail
import { CarDetailComponent } from './views/car/detail';
import { CarDetailHeaderComponent } from './views/car/detail/parts/header';
import { CarDetailBreadCumbsComponent } from './views/car/detail/parts/breadcumbs';
import { CarDetailInfoComponent } from './views/car/detail/parts/info';
import { CarDetailItemComponent } from './views/car/detail/parts/item';
import { CarDetailRelatedComponent } from './views/car/detail/parts/related';
import { CarDetailBrandsComponent } from './views/car/detail/parts/brands';

//CarCompare
import { CarCompareComponent } from './views/car/compare';
import { CarCompareHeaderComponent } from './views/car/compare/parts/header';
import { CarCompareBreadCumbsComponent } from './views/car/compare/parts/breadcumbs';
import { CarCompareInfoComponent } from './views/car/compare/parts/info';
import { CarCompareItemsComponent } from './views/car/compare/parts/items';

//CarBooking
import { CarBookingComponent } from './views/car/booking';
import { CarBookingHeaderComponent } from './views/car/booking/parts/header';
import { CarBookingBreadCumbsComponent } from './views/car/booking/parts/breadcumbs';
import { CarBookingDetailComponent } from './views/car/booking/detail';
import { CarBookingContactComponent } from './views/car/booking/contact';
import { CarBookingSubmitComponent } from './views/car/booking/submit';

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

import { AdminWorkersIndexComponent } from './admin/views/rentacar/workers';
import { AdminWorkersInsertComponent } from './admin/views/rentacar/workers/insert';
import { AdminWorkersUpdateComponent } from './admin/views/rentacar/workers/update';



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

@NgModule({
    declarations: [
        AppComponent,

        //Layout
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        ScriptsComponent,

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
        HomeContactComponent,
        HomeReviewComponent,

        //About
        AboutComponent,
        AboutHeaderComponent,
        AboutBreadCumbsComponent,
        AboutBestComponent,
        AboutWhatComponent,
        AboutMoreComponent,
        AboutPersonalComponent,

        //Blog
        BlogComponent,
        BlogHeaderComponent,
        BlogBreadCumbsComponent,
        BlogDetailComponent,
        BlogItemsComponent,
        BlogItemComponent,

        //Contact
        ContactComponent,
        ContactHeaderComponent,
        ContactBreadCumbsComponent,
        ContactMapComponent,
        ContactFormComponent,

        //CarList
        CarListComponent,
        CarListHeaderComponent,
        CarListBreadCumbsComponent,
        CarListInfoComponent,
        CarListItemsComponent,

        //CarDetail
        CarDetailComponent,
        CarDetailHeaderComponent,
        CarDetailBreadCumbsComponent,
        CarDetailInfoComponent,
        CarDetailItemComponent,
        CarDetailRelatedComponent,
        CarDetailBrandsComponent,

        //CarCompare
        CarCompareComponent,
        CarCompareHeaderComponent,
        CarCompareBreadCumbsComponent,
        CarCompareInfoComponent,
        CarCompareItemsComponent,

        //CarBooking
        CarBookingComponent,
        CarBookingHeaderComponent,
        CarBookingBreadCumbsComponent,
        CarBookingDetailComponent,
        CarBookingContactComponent,
        CarBookingSubmitComponent,

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

        AdminWorkersIndexComponent,
        AdminWorkersInsertComponent,
        AdminWorkersUpdateComponent,


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
    ModelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
