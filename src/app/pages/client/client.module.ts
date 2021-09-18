import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//

import { AddoreditCallAdminComponent } from './call-admin/addoredit.component';
import { AddoreditDirectoryCondominiumComponent } from './directory-condominium/addoredit.component';
import { AddOrEditMeetingComponent } from './meetings/addOrEditMeeting.component';
import { AddOrEditMeetingDetailComponent } from './meetings/addOrEditMeetingDetail.component';
import { AddoreditListCondominoComponent } from './list-condomino/addoredit.component';
import { AddoreditProviderComponent } from './provider/addoredit.component';
import { ClientComponent } from './client.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { IndexCallAdminComponent } from './call-admin/index.component';
import { IndexDirectoryCondominiumComponent } from './directory-condominium/index.component';
import { IndexMeetingsComponent } from './meetings/index.component';
import { IndexListCondominoComponent } from './list-condomino/index.component';
import { ManualsModule } from './manuals/manuals.module';
import { OperatingboardsComponent } from './operatingboards/operatingboards.component';
import { PipesModule } from '../../shared/helpers/pipes/pipes.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { IndexEmployeeComponent } from './employee/index.component';
import { IndexProviderComponent } from './provider/index.component';
import { AddoreditEmplopyeeComponent } from './employee/addoredit.component';
import { FormFilterComponent } from './call-admin/form-filter.component';
import { ContactEmployeeComponent } from './employee/contact-employee.component';
import { FormAdministrationComponent } from './meetings/form-administration/form-administration.component';
import { FormInvitedComponent } from './meetings/form-invited/form-invited.component';
import { FormComiteComponent } from './meetings/form-comite/form-comite.component';
import { CardProviderComponent } from './provider/card-provider/card-provider.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { OrderModule } from 'ngx-order-pipe';
import { ManualGerenteMantenimientoComponent } from './manual-gerente-mantenimiento/manual-gerente-mantenimiento.component';
import { ProviderUseComponent } from './provider/provider-use/provider-use.component';
import { ProviderAddOrEditCategoryComponent } from './provider/provider-add-or-edit-category/provider-add-or-edit-category.component';
import { QualificationProviderComponent } from './provider/qualification-provider/qualification-provider.component';

@NgModule({
  declarations: [
    AddoreditCallAdminComponent,
    AddoreditDirectoryCondominiumComponent,
    AddoreditEmplopyeeComponent,
    AddoreditListCondominoComponent,
    AddOrEditMeetingComponent,
    AddOrEditMeetingDetailComponent,
    AddoreditProviderComponent,
    CardProviderComponent,
    ClientComponent,
    ContactEmployeeComponent,
    FormAdministrationComponent,
    FormComiteComponent,
    FormFilterComponent,
    FormInvitedComponent,
    IndexCallAdminComponent,
    IndexDirectoryCondominiumComponent,
    IndexEmployeeComponent,
    IndexListCondominoComponent,
    IndexMeetingsComponent,
    IndexProviderComponent,
    OperatingboardsComponent,
    TutorialComponent,
    ManualGerenteMantenimientoComponent,
    ProviderUseComponent,
    ProviderAddOrEditCategoryComponent,
    QualificationProviderComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ManualsModule,
    OrderModule,
    PipesModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ClientModule {}
