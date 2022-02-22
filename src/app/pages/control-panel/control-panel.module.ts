import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { EngineersComponent, EngineersUpdateDialog } from './engineers/engineers.component';
import { JuniorEngrsComponent } from './junior-engrs/junior-engrs.component';
import { AssistantEngrsComponent } from './assistant-engrs/assistant-engrs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatExpansionModule } from '@angular/material/expansion';
import {CdkTableModule} from '@angular/cdk/table';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    EngineersComponent,
    JuniorEngrsComponent,
    AssistantEngrsComponent,
    EngineersUpdateDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatButtonModule,
    ScrollingModule,
    MatTooltipModule,
    MatToolbarModule,
    MatTableModule,
    CdkTableModule,
    DragDropModule,
    MatPaginatorModule,
    FlexLayoutModule,
    FontAwesomeModule,
    PerfectScrollbarModule,
    ControlPanelRoutingModule,
    AccordionModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot()
  ]
})
export class ControlPanelModule { }
