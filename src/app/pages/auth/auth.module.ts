import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';
import { AuthComponent } from './auth.component';
import { PrimengModule } from '../../shared/primeng/primeng.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CardUserComponent } from './card-user/card-user.component';
import { LoginTilteComponent } from 'src/app/shared/components/login/login-title/login-title.component';
import { DirectivesModule } from 'src/app/shared/helpers/directives/directives.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverypasswordComponent,
    ResetpasswordComponent,
    AuthComponent,
    LoginTilteComponent,
    CardUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    DirectivesModule,
    ComponentsModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RecoverypasswordComponent,
    ResetpasswordComponent,
  ],
})
export class AuthModule {}
