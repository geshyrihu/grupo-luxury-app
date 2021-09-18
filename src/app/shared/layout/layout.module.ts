import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarMenuComponent,
    BrandLogoComponent,
    UserPanelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
    ComponentsModule,
    PrimengModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarMenuComponent,
    BrandLogoComponent,
    UserPanelComponent,
  ],
})
export class layoutModule {}
