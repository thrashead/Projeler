import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './views/shared/layout';
import { IndexComponent } from './views/home/index';

import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminLoginComponent } from './admin/views/home/login';
import { AdminIndexComponent } from './admin/views/home/index';

import { AdminLinksIndexComponent } from './admin/views/links';
import { AdminLinksInsertComponent } from './admin/views/links/insert';
import { AdminLinksUpdateComponent } from './admin/views/links/update';

import { AdminLinkTypesIndexComponent } from './admin/views/linktypes';
import { AdminLinkTypesInsertComponent } from './admin/views/linktypes/insert';
import { AdminLinkTypesUpdateComponent } from './admin/views/linktypes/update';

import { AdminTranslationIndexComponent } from './admin/views/translation';
import { AdminTranslationInsertComponent } from './admin/views/translation/insert';
import { AdminTranslationUpdateComponent } from './admin/views/translation/update';

import { AdminFilesIndexComponent } from './admin/views/files';
import { AdminFilesInsertComponent } from './admin/views/files/insert';
import { AdminFilesUpdateComponent } from './admin/views/files/update';

import { AdminGalleryIndexComponent } from './admin/views/gallery';
import { AdminGalleryInsertComponent } from './admin/views/gallery/insert';
import { AdminGalleryUpdateComponent } from './admin/views/gallery/update';

import { AdminGalleryTIndexComponent } from './admin/views/galleryt';
import { AdminGalleryTInsertComponent } from './admin/views/galleryt/insert';
import { AdminGalleryTUpdateComponent } from './admin/views/galleryt/update';

import { AdminContentIndexComponent } from './admin/views/content';
import { AdminContentInsertComponent } from './admin/views/content/insert';
import { AdminContentUpdateComponent } from './admin/views/content/update';

import { AdminContentTIndexComponent } from './admin/views/contentt';
import { AdminContentTInsertComponent } from './admin/views/contentt/insert';
import { AdminContentTUpdateComponent } from './admin/views/contentt/update';

import { AdminCategoryIndexComponent } from './admin/views/category';
import { AdminCategoryInsertComponent } from './admin/views/category/insert';
import { AdminCategoryUpdateComponent } from './admin/views/category/update';

import { AdminCategoryTIndexComponent } from './admin/views/categoryt';
import { AdminCategoryTInsertComponent } from './admin/views/categoryt/insert';
import { AdminCategoryTUpdateComponent } from './admin/views/categoryt/update';

import { AdminUserGroupsIndexComponent } from './admin/views/usergroups';
import { AdminUserGroupsInsertComponent } from './admin/views/usergroups/insert';
import { AdminUserGroupsUpdateComponent } from './admin/views/usergroups/update';

import { AdminUserGroupRightsIndexComponent } from './admin/views/usergrouprights';
import { AdminUserGroupRightsInsertComponent } from './admin/views/usergrouprights/insert';
import { AdminUserGroupRightsUpdateComponent } from './admin/views/usergrouprights/update';

import { AdminUserGroupProcessIndexComponent } from './admin/views/usergroupprocess';
import { AdminUserGroupProcessInsertComponent } from './admin/views/usergroupprocess/insert';
import { AdminUserGroupProcessUpdateComponent } from './admin/views/usergroupprocess/update';

import { AdminUserGroupTablesIndexComponent } from './admin/views/usergrouptables';
import { AdminUserGroupTablesInsertComponent } from './admin/views/usergrouptables/insert';
import { AdminUserGroupTablesUpdateComponent } from './admin/views/usergrouptables/update';

import { AdminUsersIndexComponent } from './admin/views/users';
import { AdminUsersInsertComponent } from './admin/views/users/insert';
import { AdminUsersUpdateComponent } from './admin/views/users/update';
import { AdminUsersChangeGroupComponent } from './admin/views/users/changegroup';

import { AdminLogProcessIndexComponent } from './admin/views/logprocess';
import { AdminLogProcessInsertComponent } from './admin/views/logprocess/insert';
import { AdminLogProcessUpdateComponent } from './admin/views/logprocess/update';

import { AdminLogsIndexComponent } from './admin/views/logs';

import { AdminLogTypesIndexComponent } from './admin/views/logtypes';
import { AdminLogTypesInsertComponent } from './admin/views/logtypes/insert';
import { AdminLogTypesUpdateComponent } from './admin/views/logtypes/update';

import { AdminMetaIndexComponent } from './admin/views/meta';
import { AdminMetaInsertComponent } from './admin/views/meta/insert';
import { AdminMetaUpdateComponent } from './admin/views/meta/update';

import { AdminMetaTIndexComponent } from './admin/views/metat';
import { AdminMetaTInsertComponent } from './admin/views/metat/insert';
import { AdminMetaTUpdateComponent } from './admin/views/metat/update';

import { AdminPicturesIndexComponent } from './admin/views/pictures';
import { AdminPicturesInsertComponent } from './admin/views/pictures/insert';
import { AdminPicturesUpdateComponent } from './admin/views/pictures/update';

import { AdminTypesIndexComponent } from './admin/views/types';
import { AdminTypesInsertComponent } from './admin/views/types/insert';
import { AdminTypesUpdateComponent } from './admin/views/types/update';

import { AdminProductIndexComponent } from './admin/views/product';
import { AdminProductInsertComponent } from './admin/views/product/insert';
import { AdminProductUpdateComponent } from './admin/views/product/update';

import { AdminProductTIndexComponent } from './admin/views/productt';
import { AdminProductTInsertComponent } from './admin/views/productt/insert';
import { AdminProductTUpdateComponent } from './admin/views/productt/update';

import { AdminVisitorsIndexComponent } from './admin/views/visitors';

const routes: Routes = [
    { path: 'Admin/Login', component: AdminLoginComponent },

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: IndexComponent, pathMatch: 'full' },
            { path: 'Index', component: IndexComponent }
        ]
    },

    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: 'Admin', component: AdminIndexComponent },
            { path: 'Admin/Index', component: AdminIndexComponent },

            { path: 'Admin/Links', component: AdminLinksIndexComponent },
            { path: 'Admin/Links/Index', component: AdminLinksIndexComponent },
            { path: 'Admin/Links/Insert', component: AdminLinksInsertComponent },
            { path: 'Admin/Links/Insert/:linkID', component: AdminLinksInsertComponent },
            { path: 'Admin/Links/Update/:id', component: AdminLinksUpdateComponent },

            { path: 'Admin/LinkTypes', component: AdminLinkTypesIndexComponent },
            { path: 'Admin/LinkTypes/Index', component: AdminLinkTypesIndexComponent },
            { path: 'Admin/LinkTypes/Insert', component: AdminLinkTypesInsertComponent },
            { path: 'Admin/LinkTypes/Update/:id', component: AdminLinkTypesUpdateComponent },

            { path: 'Admin/Translation', component: AdminTranslationIndexComponent },
            { path: 'Admin/Translation/Index', component: AdminTranslationIndexComponent },
            { path: 'Admin/Translation/Insert', component: AdminTranslationInsertComponent },
            { path: 'Admin/Translation/Update/:id', component: AdminTranslationUpdateComponent },

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

            { path: 'Admin/Content', component: AdminContentIndexComponent },
            { path: 'Admin/Content/Index', component: AdminContentIndexComponent },
            { path: 'Admin/Content/Insert', component: AdminContentInsertComponent },
            { path: 'Admin/Content/Update/:id', component: AdminContentUpdateComponent },

            { path: 'Admin/ContentT', component: AdminContentTIndexComponent },
            { path: 'Admin/ContentT/Index', component: AdminContentTIndexComponent },
            { path: 'Admin/ContentT/Insert', component: AdminContentTInsertComponent },
            { path: 'Admin/ContentT/Insert/:linkID', component: AdminContentTInsertComponent },
            { path: 'Admin/ContentT/Update/:id', component: AdminContentTUpdateComponent },

            { path: 'Admin/Category', component: AdminCategoryIndexComponent },
            { path: 'Admin/Category/Index', component: AdminCategoryIndexComponent },
            { path: 'Admin/Category/Insert', component: AdminCategoryInsertComponent },
            { path: 'Admin/Category/Update/:id', component: AdminCategoryUpdateComponent },

            { path: 'Admin/CategoryT', component: AdminCategoryTIndexComponent },
            { path: 'Admin/CategoryT/Index', component: AdminCategoryTIndexComponent },
            { path: 'Admin/CategoryT/Insert', component: AdminCategoryTInsertComponent },
            { path: 'Admin/CategoryT/Insert/:linkID', component: AdminCategoryTInsertComponent },
            { path: 'Admin/CategoryT/Update/:id', component: AdminCategoryTUpdateComponent },

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

            { path: 'Admin/Types', component: AdminTypesIndexComponent },
            { path: 'Admin/Types/Index', component: AdminTypesIndexComponent },
            { path: 'Admin/Types/Insert', component: AdminTypesInsertComponent },
            { path: 'Admin/Types/Update/:id', component: AdminTypesUpdateComponent },

            { path: 'Admin/Product', component: AdminProductIndexComponent },
            { path: 'Admin/Product/Index', component: AdminProductIndexComponent },
            { path: 'Admin/Product/Insert', component: AdminProductInsertComponent },
            { path: 'Admin/Product/Update/:id', component: AdminProductUpdateComponent },

            { path: 'Admin/ProductT', component: AdminProductTIndexComponent },
            { path: 'Admin/ProductT/Index', component: AdminProductTIndexComponent },
            { path: 'Admin/ProductT/Insert', component: AdminProductTInsertComponent },
            { path: 'Admin/ProductT/Insert/:linkID', component: AdminProductTInsertComponent },
            { path: 'Admin/ProductT/Update/:id', component: AdminProductTUpdateComponent },

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
