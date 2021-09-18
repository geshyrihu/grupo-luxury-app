import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Componentes
import { IndexComponent } from './index/index-accounts.component';

// Module
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ProfileComponent } from './profile/update-profile.component';
import { RoleComponent } from './role/update-role.component';
import { AccountsComponent } from './accounts.component';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { UpdatePasswordComponent } from './profile/update-password/update-password.component';
import { UpdateAvatarComponent } from './profile/update-avatar/update-avatar.component';
import { UpdateDataUserComponent } from './profile/update-data-user/update-data-user.component';

@NgModule({
  declarations: [
    IndexComponent,
    ProfileComponent,
    RoleComponent,
    AccountsComponent,
    UpdatePasswordComponent,
    UpdateAvatarComponent,
    UpdateDataUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
  ],
  exports: [IndexComponent, ProfileComponent, RoleComponent, AccountsComponent],
})
export class AccountsModule {}
