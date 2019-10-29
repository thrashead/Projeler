import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './views/shared/layout';
import { IndexComponent } from './views/home/index';
import { ContentIndexComponent } from './views/content';
import { ContentContactComponent } from './views/content/contact';
import { ContentNewsComponent } from './views/content/news';
import { PropertyIndexComponent } from './views/property';
import { PropertyDetailComponent } from './views/property/detail';

import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminLoginComponent } from './admin/views/home/login';
import { AdminIndexComponent } from './admin/views/home/index';

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

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: IndexComponent, pathMatch: 'full' },

            { path: 'Emlak', component: PropertyIndexComponent },
            { path: 'Emlak/Listele', component: PropertyIndexComponent },
            { path: 'Emlak/Listele/:link', component: PropertyIndexComponent },
            { path: 'Emlak/Kategori/:link', component: PropertyIndexComponent },
            { path: 'Emlak/Detay/:link', component: PropertyDetailComponent },

            { path: 'Haberler', component: ContentNewsComponent },
            { path: 'Haberler/:link', component: ContentIndexComponent },
            { path: 'Icerik/Iletisim', component: ContentContactComponent },
            { path: 'Icerik/:link', component: ContentIndexComponent },
        ]
    },

    { path: 'Admin/Login', component: AdminLoginComponent },

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

            { path: 'Admin/LangContent', component: AdminLangContentIndexComponent },
            { path: 'Admin/LangContent/Index', component: AdminLangContentIndexComponent },
            { path: 'Admin/LangContent/Insert', component: AdminLangContentInsertComponent },
            { path: 'Admin/LangContent/Update/:id', component: AdminLangContentUpdateComponent },

            { path: 'Admin/LangContentT', component: AdminLangContentTIndexComponent },
            { path: 'Admin/LangContentT/Index', component: AdminLangContentTIndexComponent },
            { path: 'Admin/LangContentT/Insert', component: AdminLangContentTInsertComponent },
            { path: 'Admin/LangContentT/Update/:id', component: AdminLangContentTUpdateComponent },

            { path: 'Admin/File', component: AdminFileIndexComponent },
            { path: 'Admin/File/Index', component: AdminFileIndexComponent },
            { path: 'Admin/File/Insert', component: AdminFileInsertComponent },
            { path: 'Admin/File/Update/:id', component: AdminFileUpdateComponent },

            { path: 'Admin/RealEstates', component: AdminRealEstatesIndexComponent },
            { path: 'Admin/RealEstates/Index', component: AdminRealEstatesIndexComponent },
            { path: 'Admin/RealEstates/Insert', component: AdminRealEstatesInsertComponent },
            { path: 'Admin/RealEstates/Update/:id', component: AdminRealEstatesUpdateComponent },

            { path: 'Admin/RealEstatesT', component: AdminRealEstatesTIndexComponent },
            { path: 'Admin/RealEstatesT/Index', component: AdminRealEstatesTIndexComponent },
            { path: 'Admin/RealEstatesT/Insert', component: AdminRealEstatesTInsertComponent },
            { path: 'Admin/RealEstatesT/Insert/:linkID', component: AdminRealEstatesTInsertComponent },
            { path: 'Admin/RealEstatesT/Update/:id', component: AdminRealEstatesTUpdateComponent },

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
            { path: 'Admin/Users/GrupDegistir/:id', component: AdminUsersGrupDegistirComponent },

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

            { path: 'Admin/Picture', component: AdminPictureIndexComponent },
            { path: 'Admin/Picture/Index', component: AdminPictureIndexComponent },
            { path: 'Admin/Picture/Insert', component: AdminPictureInsertComponent },
            { path: 'Admin/Picture/Update/:id', component: AdminPictureUpdateComponent },

            { path: 'Admin/Types', component: AdminTypesIndexComponent },
            { path: 'Admin/Types/Index', component: AdminTypesIndexComponent },
            { path: 'Admin/Types/Insert', component: AdminTypesInsertComponent },
            { path: 'Admin/Types/Update/:id', component: AdminTypesUpdateComponent },

            { path: 'Admin/VisitorCounter', component: AdminVisitorCounterIndexComponent },
            { path: 'Admin/VisitorCounter/Index', component: AdminVisitorCounterIndexComponent },
        ]
    },

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
