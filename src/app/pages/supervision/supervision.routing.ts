import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckListEdificioComponent } from './check-list-edificio/check-list-edificio.component';
import { MasterCheckListEdificioComponent } from './master-check-list-edificio/master-check-list-edificio.component';

export const SUPERVISION_ROUTES: Routes = [
  { path: 'check-list-edificio', component: CheckListEdificioComponent },
  {
    path: 'master-check-list-edificio',
    component: MasterCheckListEdificioComponent,
  },
];
@NgModule({
  imports: [],
})
export class SupervisionRoutingModule {}
