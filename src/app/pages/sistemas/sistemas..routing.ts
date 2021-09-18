import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SistemasComponent } from './sistemas.component';

// Rutas

export const SISTEMAS_ROUTES: Routes = [
  { path: 'reportes', component: SistemasComponent },
];
@NgModule({
  imports: [],
})
export class SistemasRoutingModule {}
