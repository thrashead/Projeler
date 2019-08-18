import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';

import { LayoutComponent } from './views/shared/layout';
import { IndexComponent } from './views/home/index';

import { AdminLayoutComponent } from './admin/views/shared/layoutAdmin';
import { AdminLoginComponent } from './admin/views/home/login';
import { AdminHeaderComponent } from './admin/views/shared/controls/header';
import { AdminLeftMenuComponent } from './admin/views/shared/controls/leftmenu';
import { AdminFooterComponent } from './admin/views/shared/controls/footer';
import { AdminScriptsComponent } from './admin/views/shared/controls/scripts';
import { AdminCopyDeleteComponent } from './admin/views/shared/controls/copydelete';
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

import { AdminFormItemsIndexComponent } from './admin/views/formitems';
import { AdminFormItemsInsertComponent } from './admin/views/formitems/insert';
import { AdminFormItemsUpdateComponent } from './admin/views/formitems/update';

import { AdminFormValuesIndexComponent } from './admin/views/formvalues';
import { AdminFormValuesInsertComponent } from './admin/views/formvalues/insert';
import { AdminFormValuesUpdateComponent } from './admin/views/formvalues/update';

import { AdminFormGroupsIndexComponent } from './admin/views/formgroups';
import { AdminFormGroupsInsertComponent } from './admin/views/formgroups/insert';
import { AdminFormGroupsUpdateComponent } from './admin/views/formgroups/update';

import { AdminFormAttributesIndexComponent } from './admin/views/formattributes';
import { AdminFormAttributesInsertComponent } from './admin/views/formattributes/insert';
import { AdminFormAttributesUpdateComponent } from './admin/views/formattributes/update';

import { AdminFormTypesIndexComponent } from './admin/views/formtypes';
import { AdminFormTypesInsertComponent } from './admin/views/formtypes/insert';
import { AdminFormTypesUpdateComponent } from './admin/views/formtypes/update';

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

import { SharedService } from './admin/services/shared';
import { ModelService } from './admin/services/model';

@NgModule({
    declarations: [
        AppComponent,

        LayoutComponent,
        IndexComponent,

        AdminLayoutComponent,
        AdminLoginComponent,
        AdminFooterComponent,
        AdminHeaderComponent,
        AdminLeftMenuComponent,
        AdminScriptsComponent,
        AdminCopyDeleteComponent,
        AdminIndexComponent,

        AdminLinksIndexComponent,
        AdminLinksInsertComponent,
        AdminLinksUpdateComponent,

        AdminLinkTypesIndexComponent,
        AdminLinkTypesInsertComponent,
        AdminLinkTypesUpdateComponent,

        AdminTranslationIndexComponent,
        AdminTranslationInsertComponent,
        AdminTranslationUpdateComponent,

        AdminFilesIndexComponent,
        AdminFilesInsertComponent,
        AdminFilesUpdateComponent,

        AdminFormItemsIndexComponent,
        AdminFormItemsInsertComponent,
        AdminFormItemsUpdateComponent,

        AdminFormValuesIndexComponent,
        AdminFormValuesInsertComponent,
        AdminFormValuesUpdateComponent,

        AdminFormGroupsIndexComponent,
        AdminFormGroupsInsertComponent,
        AdminFormGroupsUpdateComponent,

        AdminFormAttributesIndexComponent,
        AdminFormAttributesInsertComponent,
        AdminFormAttributesUpdateComponent,

        AdminFormTypesIndexComponent,
        AdminFormTypesInsertComponent,
        AdminFormTypesUpdateComponent,

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
        AdminUsersChangeGroupComponent,

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

        AdminTypesIndexComponent,
        AdminTypesInsertComponent,
        AdminTypesUpdateComponent,

        AdminProductIndexComponent,
        AdminProductInsertComponent,
        AdminProductUpdateComponent,

        AdminProductTIndexComponent,
        AdminProductTInsertComponent,
        AdminProductTUpdateComponent,

        AdminVisitorsIndexComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        HttpClientModule
    ],

    //'/AdminPanelAngular/' -> '/' Bu þekilde deðiþecek
    providers: [{ provide: APP_BASE_HREF, useValue: '/AdminPanelAngular/' },
    SharedService,
    ModelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
