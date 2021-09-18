import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ComunesComponent } from './comunes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { RouterModule } from '@angular/router';

import { FormBankComponent } from './banks/form-bank/form-bank.component';
import { FormCategorieComponent } from './categorie/form-categorie/form-categorie.component';
import { FormCustomerComponent } from './customer/form-customer/form-customers.component';
import { FormMeasurementUnitsComponent } from './measurement-units/form-measurement-units/form-measurement-units.component';
import { FormProfessionsComponent } from './professions/form-profession/form-professions.component';
import { FormRequestComponent } from './requests/form-request/form-request.component';
import { FormResponsibleAreaComponent } from './responsible-areas/form-responsible-areas/crud-responsible-areas.component';
import { IndexBankComponent } from './banks/index-bank/index-bank.component';
import { IndexCategorieComponent } from './categorie/index-categorie/index-categorie.component';
import { IndexCustomerComponent } from './customer/index-customer/index-customers.component';
import { IndexMeasurementUnitsComponent } from './measurement-units/index-measurement-units/index-measurement-units.component';
import { IndexProfessionsComponent } from './professions/index-profession/index-professions.component';
import { IndexRequestsComponent } from './requests/index-request/index-request.component';
import { IndexResponsibleAreasComponent } from './responsible-areas/index-responsible-areas/index-responsible-areas.component';
import { PipesModule } from 'src/app/shared/helpers/pipes/pipes.module';

@NgModule({
  declarations: [
    ComunesComponent,
    FormBankComponent,
    FormCategorieComponent,
    FormCustomerComponent,
    FormMeasurementUnitsComponent,
    FormProfessionsComponent,
    FormRequestComponent,
    FormResponsibleAreaComponent,
    IndexBankComponent,
    IndexCategorieComponent,
    IndexCustomerComponent,
    IndexMeasurementUnitsComponent,
    IndexProfessionsComponent,
    IndexRequestsComponent,
    IndexResponsibleAreasComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    PipesModule,
    ComponentsModule,
  ],
})
export class ComunesModule {}
