import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// Components
import { ProfileComponent } from './profile/update-profile.component';
import { IndexComponent } from './index/index-accounts.component';

export const ACCOUNTS_ROUTES: Routes = [
  { path: 'editprofile/:id', component: ProfileComponent },
  { path: 'index', component: IndexComponent },
];
@NgModule({
  imports: [],
})
export class AccountsRoutingModule {}
