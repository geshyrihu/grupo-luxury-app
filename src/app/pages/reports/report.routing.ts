import { MinutaComponent } from './minuta/minuta.component';
import { CallAdminReportComponent } from './call-admin/call-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { PdfSolicitudCompraComponent } from './pdf-solicitud-compra/pdf-solicitud-compra.component';

// Guard

export const routes: Routes = [
  {
    path: 'report',
    component: ReportComponent,
    children: [
      {
        path: 'callAdmin',
        component: CallAdminReportComponent,
      },

      {
        path: 'minuta',
        component: MinutaComponent,
      },
      {
        path: 'pdfSolicitudCompra',
        component: PdfSolicitudCompraComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
