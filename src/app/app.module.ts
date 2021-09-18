import { ReportModule } from './pages/reports/report.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageNotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX';
registerLocaleData(localeEs);

import { AccountsModule } from './pages/admin/accounts/accounts.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './pages/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PagesModule } from './pages/pages.module';
import { PrimengModule } from './shared/primeng/primeng.module';

// ... SweetAlet
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PipesModule } from './shared/helpers/pipes/pipes.module';
import { SupervisionModule } from './pages/supervision/supervision.module';
import { RrhhModule } from './pages/rrhh/rrhh.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent, PageNotfoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    ReportModule,
    AccountsModule,
    BrowserAnimationsModule,
    PrimengModule,
    PipesModule,
    SweetAlert2Module.forRoot(),
    SupervisionModule,
    RrhhModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-MX',
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
