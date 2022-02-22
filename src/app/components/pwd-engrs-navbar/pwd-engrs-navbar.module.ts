import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwdEngrsNavbarComponent } from './pwd-engrs-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    PwdEngrsNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
  ],
  exports: [
    PwdEngrsNavbarComponent,
  ]
})
export class PwdEngrsNavbarModule { }
