import { Routes } from '@angular/router';

import { IndexBankComponent } from './banks/index-bank/index-bank.component';
import { IndexCategorieComponent } from './categorie/index-categorie/index-categorie.component';
import { IndexCustomerComponent } from './customer/index-customer/index-customers.component';
import { IndexMeasurementUnitsComponent } from './measurement-units/index-measurement-units/index-measurement-units.component';
import { IndexProfessionsComponent } from './professions/index-profession/index-professions.component';
import { IndexRequestsComponent } from './requests/index-request/index-request.component';
import { IndexResponsibleAreasComponent } from './responsible-areas/index-responsible-areas/index-responsible-areas.component';

export const COMUNES_ROUTES: Routes = [
  { path: 'banks', component: IndexBankComponent },
  { path: 'categories', component: IndexCategorieComponent },
  { path: 'customers', component: IndexCustomerComponent },
  { path: 'measurementUnits', component: IndexMeasurementUnitsComponent },
  { path: 'professions', component: IndexProfessionsComponent },
  { path: 'requests', component: IndexRequestsComponent },
  { path: 'responsibleareas', component: IndexResponsibleAreasComponent },
];
