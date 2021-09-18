import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ResidentComponent } from './resident.component';

@NgModule({
  declarations: [ResidentComponent],
  imports: [CommonModule, ComponentsModule, RouterModule],
  exports: [ResidentComponent],
})
export class ResidentModule {}
