import { IndexEmployeeComponent } from './employee/index.component';
import { IndexProviderComponent } from './provider/index.component';
import { IndexDirectoryCondominiumComponent } from './directory-condominium/index.component';
import { Routes } from '@angular/router';
import { IndexCallAdminComponent } from './call-admin/index.component';
// Componentes
import { IndexMeetingsComponent } from './meetings/index.component';
import { IndexListCondominoComponent } from './list-condomino/index.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { ManualGerenteMantenimientoComponent } from './manual-gerente-mantenimiento/manual-gerente-mantenimiento.component';

export const CLIENT_ROUTES: Routes = [
  { path: 'callAdmin', component: IndexCallAdminComponent },
  { path: 'meetings', component: IndexMeetingsComponent },
  {
    path: 'directoryCondominium',
    component: IndexDirectoryCondominiumComponent,
  },
  { path: 'listCondomino', component: IndexListCondominoComponent },
  { path: 'employees', component: IndexEmployeeComponent },
  { path: 'providers', component: IndexProviderComponent },
  { path: 'tutorial', component: TutorialComponent },
  {
    path: 'gerenciaMantenimiento',
    component: ManualGerenteMantenimientoComponent,
  },
];
