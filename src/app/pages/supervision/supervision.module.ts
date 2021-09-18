import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisionRoutingModule } from './supervision.routing';
import { CheckListEdificioComponent } from './check-list-edificio/check-list-edificio.component';
import { MasterCheckListEdificioComponent } from './master-check-list-edificio/master-check-list-edificio.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SupervisionComponent } from './supervision.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { CheckListEdificioAddOrEditComponent } from './check-list-edificio-add-or-edit/check-list-edificio-add-or-edit.component';
import { AreaCheckListEdificioComponent } from './area-check-list-edificio/area-check-list-edificio.component';

@NgModule({
  declarations: [
    CheckListEdificioComponent,
    MasterCheckListEdificioComponent,
    SupervisionComponent,
    CheckListEdificioAddOrEditComponent,
    AreaCheckListEdificioComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
  ],
})
export class SupervisionModule {}
