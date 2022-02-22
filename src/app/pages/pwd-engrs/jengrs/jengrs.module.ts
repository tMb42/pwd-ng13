import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JengrsRoutingModule } from './jengrs-routing.module';
import { JeGradationComponent } from './je-gradation/je-gradation.component';
import { JePassedComponent } from './je-passed/je-passed.component';
import { JePromotionComponent } from './je-promotion/je-promotion.component';
import { JeRetirementComponent } from './je-retirement/je-retirement.component';
import { JeCasteComponent } from './je-caste/je-caste.component';

import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    JeGradationComponent,
    JePassedComponent,
    JePromotionComponent,
    JeRetirementComponent,
    JeCasteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JengrsRoutingModule,
    MatExpansionModule,

  ]
})
export class JengrsModule { }
