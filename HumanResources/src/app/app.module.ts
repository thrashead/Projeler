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

import { AdminCityIndexComponent } from './admin/views/humanresources/city';
import { AdminCityInsertComponent } from './admin/views/humanresources/city/insert';
import { AdminCityUpdateComponent } from './admin/views/humanresources/city/update';

import { AdminContentIndexComponent } from './admin/views/general/content';
import { AdminContentInsertComponent } from './admin/views/general/content/insert';
import { AdminContentUpdateComponent } from './admin/views/general/content/update';

import { AdminFilesIndexComponent } from './admin/views/general/files';
import { AdminFilesInsertComponent } from './admin/views/general/files/insert';
import { AdminFilesUpdateComponent } from './admin/views/general/files/update';

import { AdminGalleryIndexComponent } from './admin/views/general/gallery';
import { AdminGalleryInsertComponent } from './admin/views/general/gallery/insert';
import { AdminGalleryUpdateComponent } from './admin/views/general/gallery/update';

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

import { AdminVisitorsIndexComponent } from './admin/views/humanresources/visitors';

//Admin HumanResources



//Services
import { SharedService } from './admin/services/shared';
import { ModelService } from './admin/services/model';
import { SiteService } from './services/site';
import { Lib } from './lib/methods';
import { AdminLib } from './admin/lib/lib';

//Layout
import { LayoutComponent } from './views/shared/layout';
import { HeaderComponent } from './views/shared/controls/header';
import { MenuComponent } from './views/shared/controls/menu';
import { FooterComponent } from './views/shared/controls/footer';
import { ScriptsComponent } from './views/shared/controls/scripts';
import { BannerComponent } from './views/shared/controls/banner';
import { BannerPictureComponent } from './views/shared/controls/bannerpicture';
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

//Blog
import { BlogIndexComponent } from './views/blog';
import { BlogListPagerComponent } from './views/blog/parts/list/pager';
import { BlogLeftComponent } from './views/blog/parts/left';
import { BlogSearchComponent } from './views/blog/parts/search';
import { BlogCategoriesComponent } from './views/blog/parts/categories';
import { BlogRecentComponent } from './views/blog/parts/recent';
import { BlogDetailComponent } from './views/blog/detail';

//Ýçerik
import { ContentIndexComponent } from './views/content';
import { ContactComponent } from './views/content/contact';
import { AboutComponent } from './views/content/about';
import { RegisterComponent } from './views/content/register';
import { PricingComponent } from './views/content/pricing';

//Ýlan
import { JobIndexComponent } from './views/job';
import { JobListTopComponent } from './views/job/parts/list/top';
import { JobListLeftComponent } from './views/job/parts/list/left';
import { JobListControlsComponent } from './views/job/parts/list/controls';
import { JobListPagerComponent } from './views/job/parts/list/pager';
import { JobDetailComponent } from './views/job/detail';
import { JobDetailRecentComponent } from './views/job/parts/detail/recent';
import { JobDetailOverviewComponent } from './views/job/parts/detail/overview';
import { JobDetailContactComponent } from './views/job/parts/detail/contact';
import { JobDetailExtraComponent } from './views/job/parts/detail/extra';

//Çalýþan
import { CandidateIndexComponent } from './views/candidate';
import { CandidateDashboardComponent } from './views/candidate/dashboard';
import { CandidateDetailComponent } from './views/candidate/detail';
import { CandidateLoginComponent } from './views/candidate/login';
import { CandidateProfileComponent } from './views/candidate/profile';
import { CandidateChangePasswordComponent } from './views/candidate/profile/changepassword';
import { CandidateResumeComponent } from './views/candidate/resume';
import { CandidateResumeAddComponent } from './views/candidate/resume/add';
import { CandidateResumeEditComponent } from './views/candidate/resume/edit';
import { CandidateResumeDetailComponent } from './views/candidate/resume/detail';
import { CandidateResumeCoverLetterComponent } from './views/candidate/resume/coverletter';
import { CandidateJobListComponent } from './views/candidate/job/list';
import { CandidateJobApplyComponent } from './views/candidate/job/apply';
import { CandidateJobFavoritesComponent } from './views/candidate/job/favorites';
import { CandidateJobAlertComponent } from './views/candidate/job/alert';

//Firma
import { EmployerIndexComponent } from './views/employer';
import { EmployerDashboardComponent } from './views/employer/dashboard';
import { EmployerDetailComponent } from './views/employer/detail';
import { EmployerLoginComponent } from './views/employer/login';
import { EmployerProfileComponent } from './views/employer/profile';
import { EmployerChangePasswordComponent } from './views/employer/profile/changepassword';
import { EmployerJobListComponent } from './views/employer/job/list';
import { EmployerJobAddComponent } from './views/employer/job/add';
import { EmployerJobEditComponent } from './views/employer/job/edit';
import { EmployerJobApplyComponent } from './views/employer/job/apply';
import { EmployerJobAlertComponent } from './views/employer/job/alert';
import { EmployerPackageComponent } from './views/employer/package';
import { EmployerTransactionsComponent } from './views/employer/package/transactions';

@NgModule({
    declarations: [
        AppComponent,

        //Layout
        LayoutComponent,
        HeaderComponent,
        MenuComponent,
        FooterComponent,
        ScriptsComponent,
        BannerComponent,
        BannerPictureComponent,
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

        //Blog
        BlogIndexComponent,
        BlogListPagerComponent,
        BlogLeftComponent,
        BlogSearchComponent,
        BlogCategoriesComponent,
        BlogRecentComponent,
        BlogDetailComponent,

        //Ýçerik
        ContentIndexComponent,
        ContactComponent,
        AboutComponent,
        RegisterComponent,
        PricingComponent,

        //Ýlan
        JobIndexComponent,
        JobListTopComponent,
        JobListLeftComponent,
        JobListControlsComponent,
        JobListPagerComponent,
        JobDetailComponent,
        JobDetailRecentComponent,
        JobDetailOverviewComponent,
        JobDetailContactComponent,
        JobDetailExtraComponent,

        //Çalýþan
        CandidateIndexComponent,
        CandidateDashboardComponent,
        CandidateDetailComponent,
        CandidateLoginComponent,
        CandidateProfileComponent,
        CandidateChangePasswordComponent,
        CandidateResumeComponent,
        CandidateResumeAddComponent,
        CandidateResumeEditComponent,
        CandidateResumeDetailComponent,
        CandidateResumeCoverLetterComponent,
        CandidateJobListComponent,
        CandidateJobApplyComponent,
        CandidateJobFavoritesComponent,
        CandidateJobAlertComponent,

        //Firma
        EmployerIndexComponent,
        EmployerDashboardComponent,
        EmployerDetailComponent,
        EmployerProfileComponent,
        EmployerChangePasswordComponent,
        EmployerLoginComponent,
        EmployerJobListComponent,
        EmployerJobAddComponent,
        EmployerJobEditComponent,
        EmployerJobApplyComponent,
        EmployerJobAlertComponent,
        EmployerPackageComponent,
        EmployerTransactionsComponent,

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

        AdminCityIndexComponent,
        AdminCityInsertComponent,
        AdminCityUpdateComponent,

        AdminContentIndexComponent,
        AdminContentInsertComponent,
        AdminContentUpdateComponent,

        AdminFilesIndexComponent,
        AdminFilesInsertComponent,
        AdminFilesUpdateComponent,

        AdminGalleryIndexComponent,
        AdminGalleryInsertComponent,
        AdminGalleryUpdateComponent,

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
