import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Admin
import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminLoginComponent } from './admin/views/home/login';
import { AdminIndexComponent } from './admin/views/home/index';

import { AdminCategoryIndexComponent } from './admin/views/general/category';
import { AdminCategoryInsertComponent } from './admin/views/general/category/insert';
import { AdminCategoryUpdateComponent } from './admin/views/general/category/update';

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

//Home
import { LayoutComponent } from './views/shared/layout';
import { IndexComponent } from './views/home/index';

//Blog
import { BlogIndexComponent } from './views/blog';
import { BlogDetailComponent } from './views/blog/detail';

//Ýçerik
import { ContentIndexComponent } from './views/content';
import { ContactComponent } from './views/content/contact';
import { AboutComponent } from './views/content/about';
import { RegisterComponent } from './views/content/register';
import { PricingComponent } from './views/content/pricing';

//Ýlan
import { JobIndexComponent } from './views/job';
import { JobDetailComponent } from './views/job/detail';

//Firma
import { EmployerIndexComponent } from './views/employer';
import { EmployerListComponent } from './views/employer/list';
import { EmployerDetailComponent } from './views/employer/detail';
import { EmployerLoginComponent } from './views/employer/login';
import { EmployerProfileComponent } from './views/employer/profile';
import { EmployerChangePasswordComponent } from './views/employer/profile/changepassword';
import { EmployerJobListComponent } from './views/employer/job/list';
import { EmployerJobAddComponent } from './views/employer/job/add';
import { EmployerJobEditComponent } from './views/employer/job/edit';
import { EmployerJobAppliesComponent } from './views/employer/job/applies';
import { EmployerJobAlertComponent } from './views/employer/job/alert';
import { EmployerPackageComponent } from './views/employer/package';
import { EmployerTransactionsComponent } from './views/employer/package/transactions';

//Çalýþan
import { CandidateIndexComponent } from './views/candidate';
import { CandidateListComponent } from './views/candidate/list';
import { CandidateDetailComponent } from './views/candidate/detail';
import { CandidateLoginComponent } from './views/candidate/login';
import { CandidateProfileComponent } from './views/candidate/profile';
import { CandidateChangePasswordComponent } from './views/candidate/profile/changepassword';
import { CandidateResumeComponent } from './views/candidate/resume';
import { CandidateResumeEditComponent } from './views/candidate/resume/edit';
import { CandidateResumeCoverLetterComponent } from './views/candidate/resume/coverletter';
import { CandidateJobListComponent } from './views/candidate/job/list';
import { CandidateJobFavoritesComponent } from './views/candidate/job/favorites';
import { CandidateJobAlertComponent } from './views/candidate/job/alert';

const routes: Routes = [
    { path: 'Admin/Login', component: AdminLoginComponent },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: IndexComponent, pathMatch: 'full' },
            { path: 'Index', component: IndexComponent },

            { path: 'Haber', component: BlogIndexComponent },
            { path: 'Haber/Liste', component: BlogIndexComponent },
            { path: 'Haber/Liste/:url', component: BlogIndexComponent },
            { path: 'Haber/Detay/:url', component: BlogDetailComponent },

            { path: 'Icerik/:url', component: ContentIndexComponent },
            { path: 'Hakkimizda', component: AboutComponent },
            { path: 'Iletisim', component: ContactComponent },
            { path: 'Kayit', component: RegisterComponent },
            { path: 'Paketler', component: PricingComponent },

            { path: 'Ilan', component: JobIndexComponent },
            { path: 'Ilan/Liste', component: JobIndexComponent },
            { path: 'Ilan/Liste/:url', component: JobIndexComponent },
            { path: 'Ilan/Detay/:url', component: JobDetailComponent },

            { path: 'IsVeren', component: EmployerIndexComponent },
            { path: 'IsVeren/Panel', component: EmployerIndexComponent },
            { path: 'IsVeren/Ozgecmis/Liste', component: CandidateListComponent },
            { path: 'IsVeren/Ozgecmis/Detay/:url', component: CandidateDetailComponent },
            { path: 'IsVeren/Giris', component: EmployerLoginComponent },
            { path: 'IsVeren/Profil', component: EmployerProfileComponent },
            { path: 'IsVeren/Profil/SifreDegistir', component: EmployerChangePasswordComponent },
            { path: 'IsVeren/Ilan/Liste', component: EmployerJobListComponent },
            { path: 'IsVeren/Ilan/Ekle', component: EmployerJobAddComponent },
            { path: 'IsVeren/Ilan/Duzenle/:url', component: EmployerJobEditComponent },
            { path: 'IsVeren/Ilan/Basvurular', component: EmployerJobAppliesComponent },
            { path: 'IsVeren/Ilan/Alarm', component: EmployerJobAlertComponent },
            { path: 'IsVeren/Paket/Liste', component: EmployerPackageComponent },
            { path: 'IsVeren/Paket/Odemeler', component: EmployerTransactionsComponent },

            { path: 'IsArayan', component: CandidateIndexComponent },
            { path: 'IsArayan/Panel', component: CandidateIndexComponent },
            { path: 'IsArayan/Firma/Liste', component: EmployerListComponent },
            { path: 'IsArayan/Firma/Detay/:url', component: EmployerDetailComponent },
            { path: 'IsArayan/Giris', component: CandidateLoginComponent },
            { path: 'IsArayan/Profil', component: CandidateProfileComponent },
            { path: 'IsArayan/Profil/SifreDegistir', component: CandidateChangePasswordComponent },
            { path: 'IsArayan/Ozgecmis', component: CandidateResumeComponent },
            { path: 'IsArayan/Ozgecmis/Duzenle', component: CandidateResumeEditComponent },
            { path: 'IsArayan/Ozgecmis/Onyazi', component: CandidateResumeCoverLetterComponent },
            { path: 'IsArayan/Ilan/Basvurular', component: CandidateJobListComponent },
            { path: 'IsArayan/Ilan/Alarm', component: CandidateJobAlertComponent },
            { path: 'IsArayan/Ilan/Favori', component: CandidateJobFavoritesComponent },
        ]
    },

    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: 'Admin', component: AdminIndexComponent },
            { path: 'Admin/Index', component: AdminIndexComponent },

            //Admin General
            { path: 'Admin/Category', component: AdminCategoryIndexComponent },
            { path: 'Admin/Category/Index', component: AdminCategoryIndexComponent },
            { path: 'Admin/Category/Insert', component: AdminCategoryInsertComponent },
            { path: 'Admin/Category/Update/:id', component: AdminCategoryUpdateComponent },

            { path: 'Admin/Content', component: AdminContentIndexComponent },
            { path: 'Admin/Content/Index', component: AdminContentIndexComponent },
            { path: 'Admin/Content/Insert', component: AdminContentInsertComponent },
            { path: 'Admin/Content/Update/:id', component: AdminContentUpdateComponent },

            { path: 'Admin/Files', component: AdminFilesIndexComponent },
            { path: 'Admin/Files/Index', component: AdminFilesIndexComponent },
            { path: 'Admin/Files/Insert', component: AdminFilesInsertComponent },
            { path: 'Admin/Files/Update/:id', component: AdminFilesUpdateComponent },

            { path: 'Admin/Gallery', component: AdminGalleryIndexComponent },
            { path: 'Admin/Gallery/Index', component: AdminGalleryIndexComponent },
            { path: 'Admin/Gallery/Insert', component: AdminGalleryInsertComponent },
            { path: 'Admin/Gallery/Update/:id', component: AdminGalleryUpdateComponent },

            { path: 'Admin/LogProcess', component: AdminLogProcessIndexComponent },
            { path: 'Admin/LogProcess/Index', component: AdminLogProcessIndexComponent },
            { path: 'Admin/LogProcess/Insert', component: AdminLogProcessInsertComponent },
            { path: 'Admin/LogProcess/Insert/:linkID', component: AdminLogProcessInsertComponent },
            { path: 'Admin/LogProcess/Update/:id', component: AdminLogProcessUpdateComponent },

            { path: 'Admin/Logs', component: AdminLogsIndexComponent },
            { path: 'Admin/Logs/Index', component: AdminLogsIndexComponent },

            { path: 'Admin/LogTypes', component: AdminLogTypesIndexComponent },
            { path: 'Admin/LogTypes/Index', component: AdminLogTypesIndexComponent },
            { path: 'Admin/LogTypes/Insert', component: AdminLogTypesInsertComponent },
            { path: 'Admin/LogTypes/Update/:id', component: AdminLogTypesUpdateComponent },

            { path: 'Admin/Meta', component: AdminMetaIndexComponent },
            { path: 'Admin/Meta/Index', component: AdminMetaIndexComponent },
            { path: 'Admin/Meta/Insert', component: AdminMetaInsertComponent },
            { path: 'Admin/Meta/Update/:id', component: AdminMetaUpdateComponent },

            { path: 'Admin/Pictures', component: AdminPicturesIndexComponent },
            { path: 'Admin/Pictures/Index', component: AdminPicturesIndexComponent },
            { path: 'Admin/Pictures/Insert', component: AdminPicturesInsertComponent },
            { path: 'Admin/Pictures/Update/:id', component: AdminPicturesUpdateComponent },

            { path: 'Admin/Types', component: AdminTypesIndexComponent },
            { path: 'Admin/Types/Index', component: AdminTypesIndexComponent },
            { path: 'Admin/Types/Insert', component: AdminTypesInsertComponent },
            { path: 'Admin/Types/Update/:id', component: AdminTypesUpdateComponent },

            { path: 'Admin/Users', component: AdminUsersIndexComponent },
            { path: 'Admin/Users/Index', component: AdminUsersIndexComponent },
            { path: 'Admin/Users/Insert', component: AdminUsersInsertComponent },
            { path: 'Admin/Users/Update/:id', component: AdminUsersUpdateComponent },
            { path: 'Admin/Users/ChangeGroup/:id', component: AdminUsersChangeGroupComponent },

            { path: 'Admin/UserGroups', component: AdminUserGroupsIndexComponent },
            { path: 'Admin/UserGroups/Index', component: AdminUserGroupsIndexComponent },
            { path: 'Admin/UserGroups/Insert', component: AdminUserGroupsInsertComponent },
            { path: 'Admin/UserGroups/Update/:id', component: AdminUserGroupsUpdateComponent },

            { path: 'Admin/UserGroupRights', component: AdminUserGroupRightsIndexComponent },
            { path: 'Admin/UserGroupRights/Index', component: AdminUserGroupRightsIndexComponent },
            { path: 'Admin/UserGroupRights/Insert', component: AdminUserGroupRightsInsertComponent },
            { path: 'Admin/UserGroupRights/Insert/:linkID', component: AdminUserGroupRightsInsertComponent },
            { path: 'Admin/UserGroupRights/Update/:id', component: AdminUserGroupRightsUpdateComponent },

            { path: 'Admin/UserGroupProcess', component: AdminUserGroupProcessIndexComponent },
            { path: 'Admin/UserGroupProcess/Index', component: AdminUserGroupProcessIndexComponent },
            { path: 'Admin/UserGroupProcess/Insert', component: AdminUserGroupProcessInsertComponent },
            { path: 'Admin/UserGroupProcess/Update/:id', component: AdminUserGroupProcessUpdateComponent },

            { path: 'Admin/UserGroupTables', component: AdminUserGroupTablesIndexComponent },
            { path: 'Admin/UserGroupTables/Index', component: AdminUserGroupTablesIndexComponent },
            { path: 'Admin/UserGroupTables/Insert', component: AdminUserGroupTablesInsertComponent },
            { path: 'Admin/UserGroupTables/Insert/:linkID', component: AdminUserGroupTablesInsertComponent },
            { path: 'Admin/UserGroupTables/Update/:id', component: AdminUserGroupTablesUpdateComponent },

            { path: 'Admin/Visitors', component: AdminVisitorsIndexComponent },
            { path: 'Admin/Visitors/Index', component: AdminVisitorsIndexComponent },
        ]
    },

    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
