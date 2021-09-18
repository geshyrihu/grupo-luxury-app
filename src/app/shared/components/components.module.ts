import { ButtonDeleteComponent } from './botones/delete/button-delete.component';
import { TableHeaderComponent } from './table/table-header/table-header.component';
import { ButtonSubmitComponent } from './botones/submit/button-submit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StartheaderComponent } from './startheader/startheader.component';
import { InputImgComponent } from './input-img/input-img.component';

import { ButtonCreateReportComponent } from './botones/create-pdf/button-create-report.component';
import { ReportHeaderComponent } from './report-header/report-header.component';
import { ButtonEditComponent } from './botones/edit/button-edit.component';
import { LoginBlockButtonComponent } from './login/block-button/login-block-button.component';
import { TableFooterComponent } from './table/table-footer/table-footer.component';
import { ButtonRolesComponent } from './botones/button-roles/button-roles.component';
import { InputTextComponent } from './item-form/input-text/input-text.component';
// Graficos
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PrimengModule } from '../primeng/primeng.module';
import { MostrarErroresComponent } from './mostrar-errores/mostrar-errores.component';
import { InputImgReportComponent } from './input-img-report/input-img-report.component';

@NgModule({
  declarations: [
    StartheaderComponent,
    ButtonSubmitComponent,
    TableHeaderComponent,
    ButtonEditComponent,
    InputImgComponent,
    ButtonDeleteComponent,
    ButtonCreateReportComponent,
    ReportHeaderComponent,
    LoginBlockButtonComponent,
    TableFooterComponent,
    ButtonRolesComponent,
    InputTextComponent,
    DoughnutChartComponent,
    BarChartComponent,
    MostrarErroresComponent,
    InputImgReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PrimengModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  exports: [
    StartheaderComponent,
    ButtonSubmitComponent,
    TableHeaderComponent,
    ButtonEditComponent,
    InputImgComponent,
    ButtonDeleteComponent,
    ButtonCreateReportComponent,
    ReportHeaderComponent,
    LoginBlockButtonComponent,
    TableFooterComponent,
    ButtonRolesComponent,
    DoughnutChartComponent,
    BarChartComponent,
    InputTextComponent,
    MostrarErroresComponent,
    InputImgReportComponent,
  ],
})
export class ComponentsModule {}
