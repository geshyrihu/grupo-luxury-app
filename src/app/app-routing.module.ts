import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './pages/auth/auth.routing';
import { PageNotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { ReportsRoutingModule } from './pages/reports/report.routing';

const routes: Routes = [
  {
    path: 'comunes',
    loadChildren: () =>
      import('./pages/comunes/comunes.module').then((m) => m.ComunesModule),
  },
  { path: '**', component: PageNotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    AuthRoutingModule,
    PagesRoutingModule,
    ReportsRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
