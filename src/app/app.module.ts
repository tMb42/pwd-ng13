import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthNavbarModule } from './components/auth-navbar/auth-navbar.module';
import { AuthModule } from './pages/auth/auth.module';
import { DateAdapter } from '@angular/material/core';
import { PwdEngrsNavbarModule } from './components/pwd-engrs-navbar/pwd-engrs-navbar.module';
import { PwdEngrsLayoutComponent } from './layouts/pwd-engrs-layout/pwd-engrs-layout.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ConfirmationDialogModule } from './components/confirmation-dialog/confirmation-dialog.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    PwdEngrsLayoutComponent,
  ],

  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    NavbarModule,
    AuthNavbarModule,
    PwdEngrsNavbarModule,
    SidebarModule,
    PerfectScrollbarModule,
    ConfirmationDialogModule,
  ],

  providers: [httpInterceptorProviders,
    { provide: DateAdapter, useValue: 'en-in' },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(private dateAdapter: DateAdapter<Date>) {
  //   dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  // }
 }
