import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthNavbarComponent } from './auth-navbar.component';



@NgModule({
  declarations: [
    AuthNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthNavbarComponent,
  ]
})
export class AuthNavbarModule { }
