import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './views/shared/layout';
import { IndexComponent } from './views/home/index';
import { AboutComponent } from './views/about/index';
import { BlogComponent } from './views/blog/index';
import { BlogDetailComponent } from './views/blog/detail';
import { ContactComponent } from './views/contact/index';
import { CarsListComponent } from './views/car/list/index';
import { CarsDetailComponent } from './views/car/detail/index';
import { CarsCompareComponent } from './views/car/compare/index';
import { CarsBookComponent } from './views/car/booking/index';
import { CarsBookFeaturesComponent } from './views/car/booking/features';
import { CarsBookCarsComponent } from './views/car/booking/cars';
import { CarsBookSubmitComponent } from './views/car/booking/submit';

import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminLoginComponent } from './admin/views/home/login';
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

const routes: Routes = [
    { path: 'Admin/Login', component: AdminLoginComponent },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: IndexComponent, pathMatch: 'full' },
            { path: 'Index', component: IndexComponent },
            { path: 'About', component: AboutComponent },
            { path: 'Blog', component: BlogComponent },
            { path: 'Blog/List/:url', component: BlogComponent },
            { path: 'Blog/Category/:url', component: BlogComponent },
            { path: 'Blog/Detail/:url', component: BlogDetailComponent },
            { path: 'Contact', component: ContactComponent },
            { path: 'Cars', component: CarsListComponent },
            { path: 'Cars/List/:url', component: CarsListComponent },
            { path: 'Cars/Detail/:url', component: CarsDetailComponent },
            { path: 'Cars/Compare/:url', component: CarsCompareComponent },
            { path: 'Cars/Book', component: CarsBookComponent },
            { path: 'Cars/Book/Index', component: CarsBookComponent },
            { path: 'Cars/Book/Features', component: CarsBookFeaturesComponent },
            { path: 'Cars/Book/Cars', component: CarsBookCarsComponent },
            { path: 'Cars/Book/Submit', component: CarsBookSubmitComponent }
        ]
    },

    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: 'Admin', component: AdminIndexComponent },
            { path: 'Admin/Index', component: AdminIndexComponent },

            //Admin RentACar
            { path: 'Admin/Blog', component: AdminBlogIndexComponent },
            { path: 'Admin/Blog/Index', component: AdminBlogIndexComponent },
            { path: 'Admin/Blog/Insert', component: AdminBlogInsertComponent },
            { path: 'Admin/Blog/Update/:id', component: AdminBlogUpdateComponent },

            { path: 'Admin/BlogCategory', component: AdminBlogCategoryIndexComponent },
            { path: 'Admin/BlogCategory/Index', component: AdminBlogCategoryIndexComponent },
            { path: 'Admin/BlogCategory/Insert', component: AdminBlogCategoryInsertComponent },
            { path: 'Admin/BlogCategory/Update/:id', component: AdminBlogCategoryUpdateComponent },

            { path: 'Admin/BlogCategoryT', component: AdminBlogCategoryTIndexComponent },
            { path: 'Admin/BlogCategoryT/Index', component: AdminBlogCategoryTIndexComponent },
            { path: 'Admin/BlogCategoryT/Insert', component: AdminBlogCategoryTInsertComponent },
            { path: 'Admin/BlogCategoryT/Insert/:linkid', component: AdminBlogCategoryTInsertComponent },
            { path: 'Admin/BlogCategoryT/Update/:id', component: AdminBlogCategoryTUpdateComponent },

            { path: 'Admin/BlogComments', component: AdminBlogCommentsIndexComponent },
            { path: 'Admin/BlogComments/Index', component: AdminBlogCommentsIndexComponent },
            { path: 'Admin/BlogComments/Insert', component: AdminBlogCommentsInsertComponent },
            { path: 'Admin/BlogComments/Update/:id', component: AdminBlogCommentsUpdateComponent },

            { path: 'Admin/BlogPictures', component: AdminBlogPicturesIndexComponent },
            { path: 'Admin/BlogPictures/Index', component: AdminBlogPicturesIndexComponent },
            { path: 'Admin/BlogPictures/Insert', component: AdminBlogPicturesInsertComponent },
            { path: 'Admin/BlogPictures/Insert/:linkid', component: AdminBlogPicturesInsertComponent },
            { path: 'Admin/BlogPictures/Update/:id', component: AdminBlogPicturesUpdateComponent },

            { path: 'Admin/BlogT', component: AdminBlogTIndexComponent },
            { path: 'Admin/BlogT/Index', component: AdminBlogTIndexComponent },
            { path: 'Admin/BlogT/Insert', component: AdminBlogTInsertComponent },
            { path: 'Admin/BlogT/Insert/:linkid', component: AdminBlogTInsertComponent },
            { path: 'Admin/BlogT/Update/:id', component: AdminBlogTUpdateComponent },

            { path: 'Admin/BlogVideos', component: AdminBlogVideosIndexComponent },
            { path: 'Admin/BlogVideos/Index', component: AdminBlogVideosIndexComponent },
            { path: 'Admin/BlogVideos/Insert', component: AdminBlogVideosInsertComponent },
            { path: 'Admin/BlogVideos/Insert/:linkid', component: AdminBlogVideosInsertComponent },
            { path: 'Admin/BlogVideos/Update/:id', component: AdminBlogVideosUpdateComponent },

            { path: 'Admin/ContactForm', component: AdminContactFormIndexComponent },
            { path: 'Admin/ContactForm/Index', component: AdminContactFormIndexComponent },
            { path: 'Admin/ContactForm/Insert', component: AdminContactFormInsertComponent },
            { path: 'Admin/ContactForm/Update/:id', component: AdminContactFormUpdateComponent },

            { path: 'Admin/LangContent', component: AdminLangContentIndexComponent },
            { path: 'Admin/LangContent/Index', component: AdminLangContentIndexComponent },
            { path: 'Admin/LangContent/Insert', component: AdminLangContentInsertComponent },
            { path: 'Admin/LangContent/Update/:id', component: AdminLangContentUpdateComponent },

            { path: 'Admin/LangContentT', component: AdminLangContentTIndexComponent },
            { path: 'Admin/LangContentT/Index', component: AdminLangContentTIndexComponent },
            { path: 'Admin/LangContentT/Insert', component: AdminLangContentTInsertComponent },
            { path: 'Admin/LangContentT/Insert/:linkid', component: AdminLangContentTInsertComponent },
            { path: 'Admin/LangContentT/Update/:id', component: AdminLangContentTUpdateComponent },

            { path: 'Admin/Newsletter', component: AdminNewsletterIndexComponent },
            { path: 'Admin/Newsletter/Index', component: AdminNewsletterIndexComponent },
            { path: 'Admin/Newsletter/Insert', component: AdminNewsletterInsertComponent },
            { path: 'Admin/Newsletter/Update/:id', component: AdminNewsletterUpdateComponent },

            { path: 'Admin/NoLangContent', component: AdminNoLangContentIndexComponent },
            { path: 'Admin/NoLangContent/Index', component: AdminNoLangContentIndexComponent },
            { path: 'Admin/NoLangContent/Insert', component: AdminNoLangContentInsertComponent },
            { path: 'Admin/NoLangContent/Update/:id', component: AdminNoLangContentUpdateComponent },

            { path: 'Admin/Workers', component: AdminWorkersIndexComponent },
            { path: 'Admin/Workers/Index', component: AdminWorkersIndexComponent },
            { path: 'Admin/Workers/Insert', component: AdminWorkersInsertComponent },
            { path: 'Admin/Workers/Update/:id', component: AdminWorkersUpdateComponent },

            { path: 'Admin/WorkersT', component: AdminWorkersTIndexComponent },
            { path: 'Admin/WorkersT/Index', component: AdminWorkersTIndexComponent },
            { path: 'Admin/WorkersT/Insert', component: AdminWorkersTInsertComponent },
            { path: 'Admin/WorkersT/Update/:id', component: AdminWorkersTUpdateComponent },



            //Admin General
            { path: 'Admin/Category', component: AdminCategoryIndexComponent },
            { path: 'Admin/Category/Index', component: AdminCategoryIndexComponent },
            { path: 'Admin/Category/Insert', component: AdminCategoryInsertComponent },
            { path: 'Admin/Category/Update/:id', component: AdminCategoryUpdateComponent },

            { path: 'Admin/CategoryT', component: AdminCategoryTIndexComponent },
            { path: 'Admin/CategoryT/Index', component: AdminCategoryTIndexComponent },
            { path: 'Admin/CategoryT/Insert', component: AdminCategoryTInsertComponent },
            { path: 'Admin/CategoryT/Insert/:linkID', component: AdminCategoryTInsertComponent },
            { path: 'Admin/CategoryT/Update/:id', component: AdminCategoryTUpdateComponent },

            { path: 'Admin/Content', component: AdminContentIndexComponent },
            { path: 'Admin/Content/Index', component: AdminContentIndexComponent },
            { path: 'Admin/Content/Insert', component: AdminContentInsertComponent },
            { path: 'Admin/Content/Update/:id', component: AdminContentUpdateComponent },

            { path: 'Admin/ContentT', component: AdminContentTIndexComponent },
            { path: 'Admin/ContentT/Index', component: AdminContentTIndexComponent },
            { path: 'Admin/ContentT/Insert', component: AdminContentTInsertComponent },
            { path: 'Admin/ContentT/Insert/:linkID', component: AdminContentTInsertComponent },
            { path: 'Admin/ContentT/Update/:id', component: AdminContentTUpdateComponent },

            { path: 'Admin/Files', component: AdminFilesIndexComponent },
            { path: 'Admin/Files/Index', component: AdminFilesIndexComponent },
            { path: 'Admin/Files/Insert', component: AdminFilesInsertComponent },
            { path: 'Admin/Files/Update/:id', component: AdminFilesUpdateComponent },

            { path: 'Admin/Gallery', component: AdminGalleryIndexComponent },
            { path: 'Admin/Gallery/Index', component: AdminGalleryIndexComponent },
            { path: 'Admin/Gallery/Insert', component: AdminGalleryInsertComponent },
            { path: 'Admin/Gallery/Update/:id', component: AdminGalleryUpdateComponent },

            { path: 'Admin/GalleryT', component: AdminGalleryTIndexComponent },
            { path: 'Admin/GalleryT/Index', component: AdminGalleryTIndexComponent },
            { path: 'Admin/GalleryT/Insert', component: AdminGalleryTInsertComponent },
            { path: 'Admin/GalleryT/Insert/:linkID', component: AdminGalleryTInsertComponent },
            { path: 'Admin/GalleryT/Update/:id', component: AdminGalleryTUpdateComponent },

            { path: 'Admin/Links', component: AdminLinksIndexComponent },
            { path: 'Admin/Links/Index', component: AdminLinksIndexComponent },
            { path: 'Admin/Links/Insert', component: AdminLinksInsertComponent },
            { path: 'Admin/Links/Insert/:linkID', component: AdminLinksInsertComponent },
            { path: 'Admin/Links/Update/:id', component: AdminLinksUpdateComponent },

            { path: 'Admin/LinkTypes', component: AdminLinkTypesIndexComponent },
            { path: 'Admin/LinkTypes/Index', component: AdminLinkTypesIndexComponent },
            { path: 'Admin/LinkTypes/Insert', component: AdminLinkTypesInsertComponent },
            { path: 'Admin/LinkTypes/Update/:id', component: AdminLinkTypesUpdateComponent },

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

            { path: 'Admin/MetaT', component: AdminMetaTIndexComponent },
            { path: 'Admin/MetaT/Index', component: AdminMetaTIndexComponent },
            { path: 'Admin/MetaT/Insert', component: AdminMetaTInsertComponent },
            { path: 'Admin/MetaT/Insert/:linkID', component: AdminMetaTInsertComponent },
            { path: 'Admin/MetaT/Update/:id', component: AdminMetaTUpdateComponent },

            { path: 'Admin/Pictures', component: AdminPicturesIndexComponent },
            { path: 'Admin/Pictures/Index', component: AdminPicturesIndexComponent },
            { path: 'Admin/Pictures/Insert', component: AdminPicturesInsertComponent },
            { path: 'Admin/Pictures/Update/:id', component: AdminPicturesUpdateComponent },

            { path: 'Admin/Translation', component: AdminTranslationIndexComponent },
            { path: 'Admin/Translation/Index', component: AdminTranslationIndexComponent },
            { path: 'Admin/Translation/Insert', component: AdminTranslationInsertComponent },
            { path: 'Admin/Translation/Update/:id', component: AdminTranslationUpdateComponent },

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
