import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PwdEngrsLayoutComponent } from './pwd-engrs-layout.component';
import { PwdEngrsNavbarComponent } from 'src/app/components/pwd-engrs-navbar/pwd-engrs-navbar.component';



@NgModule({
  declarations: [
    PwdEngrsLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PwdEngrsNavbarComponent,
  ]
})
export class PwdEngrsLayoutModule { }
