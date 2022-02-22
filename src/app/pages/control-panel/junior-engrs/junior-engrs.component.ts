import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import { Castes } from '../../../models/caste.model';
import { Designations } from '../../../models/designation.model';
import { JEngrs } from '../../../models/jengrs.model';
import { DropdownService } from '../../../services/dropdown.service';
import { JengrsService } from '../../../services/jengrs.service';
import Swal from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthUser } from 'src/app/models/auth-user.model';
import { Engrs } from 'src/app/models/engrs.model';
import { AuthService } from 'src/app/services/auth.service';
import { EngineersService } from 'src/app/services/engineers.service';
import { Department, Designation } from '../../dashboard/update-profile/update-profile.component';
import { DialogData } from '../engineers/engineers.component';
import { MatAccordion } from '@angular/material/expansion';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-junior-engrs',
  templateUrl: './junior-engrs.component.html',
  styleUrls: ['./junior-engrs.component.scss']
})
export class JuniorEngrsComponent implements OnInit {

  // JeGrdDisplayedColumns: string[] = ['sl', 'id', 'name', ];
  displayedColumns: string[] = [ 'select', 'sl','name', 'caste', 'designation', 'doj', 'dob', 'dor', 'remarks','hrms', 'id' ];
  JeGrdDisplayedColumns: string[] = [ 'select', 'sl','name', 'caste', 'designation', 'doj', 'dob', 'dor', 'remarks', 'id' ];

  engrsForm: FormGroup;
  isLoading = false;
  isDisabled: boolean = false;
  isChecked: boolean = false;
  tableHeader: string ="All PWD JE in Service";
  expanded = false;

  searchMobile = false;
  error: {};
  message: {};
  authUser: AuthUser = null;
  selectedJe: any[] = [];
  jeDraftGrd: JEngrs[] = [];
  allJe: Engrs[] = [];
  engrs: Engrs[] = [];
  depts: Department[] = [];
  designs: Designation[] = [];

  totalJe: number;
  jeDraftTotal: number;

  // MatPaginator Inputs
  totalRecords: number;
  pageSize: number = 50;     //default items per page
  pageSizeOptions: number[] = [10, 20, 50, 100, 5000];
  currentPage: number = 1;
  page: number = 1;
  totalPages: number;

  // MatPaginator Inputs for draft gradation
  totalJeDraftRecords: number;
  pageSizeJeDraft: number = 5;     //default items per page
  pageSizeOptionsJeDraft: number[] = [10, 20, 50, 100, 5000];
  currentJeDraftPage: number = 1;
  pageJeDraft: number = 1;
  totalJeDraftPages: number;

  lastPageLabel: string;
  firstPageLabel: string;

  // MatPaginator Output
  pageEvent: PageEvent;


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dropdownService : DropdownService,
    private engineersService : EngineersService,
    private jengrsService : JengrsService,
    private authService: AuthService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('table') table: MatTable<JEngrs>;

  // drop(event: CdkDragDrop<Engrs[]>) {
  //   moveItemInArray(this.jeDraftGrd, event.previousIndex, event.currentIndex);
  // }


  dropTable(event: CdkDragDrop<JEngrs[]>) {
    const prevIndex = this.jeDraftGrd.findIndex((d) => d === event.item.data);
    moveItemInArray(this.jeDraftGrd, prevIndex, event.currentIndex);
    // this.table.renderRows();
  }
  // drop(event: CdkDragDrop<Engrs[]>) {
  //   // const previousIndex = this.allJe.findIndex(row => row === event.item.data);
  //   moveItemInArray(this.allJe, event.previousIndex, event.currentIndex);
  //   this.allJe = this.allJe.slice();
  // }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }

  //   // updates moved data and table, but not dynamic if more dropzones
  //   this.allActiveJe = clonedeep(this.allActiveJe);
  //   this.allJe = clonedeep(this.allJe);
  // }




  public type: string = 'component';
  public disabled: boolean = false;

  clickedRows = new Set<Engrs>();
  selection = new SelectionModel<Engrs>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.allJe.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.allJe);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Engrs): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  selectForTransfer(){
    // console.log('add',  this.selection.selected);
    this.selectedJe = [];
    const newArray = [];
    newArray.push(this.selection.selected.map(({id}) => (id)));
    this.selectedJe = newArray[0];
    const requestObj = {
      page: this.page,
      itemsPerPage: this.pageSize,
      selectedJe: this.selectedJe,
    }
    this.engineersService.getTemporaryEngineersDraftList(requestObj).subscribe((response:any) => {
      this.expanded = true;
      this.isLoading = false;
      this.jeDraftGrd = response.jeDraftGrdnData.data;
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.getAuthUser().pipe(first()).subscribe((response: any) => {
      this.isLoading = false;
      this.authUser = response.data;
      if(!response.data.is_pwd_engineer){
        this.isDisabled = false;
      }else{
        this.isDisabled = true;
      }
    });

    this.dropdownService.getDesignations().subscribe((response: { designationData: Designation[]; }) => {
      this.designs = response.designationData;
    });

    this.engineersService.getEngrsUpdateListener().subscribe(response => {
      this.isLoading = false;
      this.engrs = response;
    });

    this.engrsForm = this.fb.group({
      isChecked: new FormControl({value: false}),
      designation: new FormControl({value: 1}),

    });

    this.getAllActiveJeList();
    this.getJeDraftGradationList();

  }


  getAllPwdJeEngineers(){
    this.isLoading = true;
    const requestObj = {
      page: this.page,
      itemsPerPage: this.pageSize,
    }
    this.engineersService.getAllJeEngineersData(requestObj).pipe(first()).subscribe((res:any) => {
      this.isLoading = false;
      this.allJe = res.allJengrs.data;
      this.totalPages = res.allJengrs.total_pages;
      this.currentPage = res.allJengrs.current_page;
      this.totalRecords = res.allJengrs.total;
      this.totalJe = res.allJengrs.total;
    });
  }

  getAllActiveJeList(){
    this.isLoading = true;
    const requestObj = {
      page: this.page,
      itemsPerPage: this.pageSize,
    }
    this.engineersService.getAllActiveJeList(requestObj).pipe(first()).subscribe((res:any) => {
      this.isLoading = false;
      this.allJe = res.allActiveJengrs.data;
      this.totalPages = res.allActiveJengrs.total_pages;
      this.currentPage = res.allActiveJengrs.current_page;
      this.totalRecords = res.allActiveJengrs.total;
      this.totalJe = res.allActiveJengrs.total;
    });

  }

  getJeDraftGradationList(){
    this.isLoading = true;
    const requestObj = {
      page: this.pageJeDraft,
      itemsPerPage: this.pageSizeJeDraft,
    }
    this.jengrsService.jeDraftGradationList(requestObj).pipe(first()).subscribe((res:any) => {
      this.isLoading = false;
      this.jeDraftGrd = res.jeDraftGrdn.data;
      this.totalJeDraftPages = res.jeDraftGrdn.total_pages;
      this.currentJeDraftPage = res.jeDraftGrdn.current_page;
      this.totalJeDraftRecords = res.jeDraftGrdn.total;
      this.jeDraftTotal = res.jeDraftGrdn.total;
      console.log('test', this.jeDraftGrd);
    });

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onChangePage(event: PageEvent): void {
    console.log(event);
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllActiveJeList();
  }

  getSearchTableData(event: any){
    if(event.value.length > 0){
      this.isLoading = true;
      this.engineersService.getSearchData(event.value).pipe(first()).subscribe((res:any) => {
        this.isLoading = false;
        this.allJe = res.engineers.data;
        this.totalPages = res.engineers.total_pages;
        this.currentPage = res.engineers.current_page;
        this.totalRecords = res.engineers.total;
      });
    }
    if(event.value.length <= 0){
      this.getAllActiveJeList();
    }
  }

  clickOnChecked(value: boolean){
    if(value == true){
      this.getAllPwdJeEngineers();
      this.tableHeader = "All PWD JE";
    }else{
      this.getAllActiveJeList();
      this.tableHeader = "All PWD JE in Service";
    }
  }

}
