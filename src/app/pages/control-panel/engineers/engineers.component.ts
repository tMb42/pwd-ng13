import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AuthUser } from '../../../models/auth-user.model';
import { EngineerTable, Engrs } from '../../../models/engrs.model';
import { AuthService } from '../../../services/auth.service';
import { DropdownService } from '../../../services/dropdown.service';
import { EngineersService } from '../../../services/engineers.service';
import Swal from 'sweetalert2';
import { Department, Designation } from '../../dashboard/update-profile/update-profile.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Castes } from '../../../models/caste.model';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';


export interface DialogData {
  engrs: Engrs[];
  depts: Department[];
  designs: Designation[];
}

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.scss']
})

export class EngineersComponent implements OnInit {
  displayedColumns: string[] = [ 'select', 'name', 'caste', 'designation', 'doj', 'dob', 'dor', 'remarks','hrms', 'id'];
  displayedCols: string[] = Object.keys(EngineerTable);
  engineerTable = EngineerTable;
  engrsForm: FormGroup;
  isLoading = false;
  isDisabled: boolean = false;

  searchMobile = false;
  error: {};
  message: {};
  authUser: AuthUser = null;
  engrs: Engrs[] = [];
  depts: Department[] = [];
  designs: Designation[] = [];

  // MatPaginator Inputs
  totalRecords: number;
  pageSize: number = 50;     //default items per page
  pageSizeOptions: number[] = [10, 20, 50, 100, 5000];
  currentPage: number = 1;
  page: number = 1;
  totalPages: number;

  lastPageLabel: string;
  firstPageLabel: string;

  // MatPaginator Output
  pageEvent: PageEvent;


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dropdownService : DropdownService,
    private engineersService : EngineersService,
    private authService: AuthService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public type: string = 'component';
  public disabled: boolean = false;

  public config: PerfectScrollbarConfigInterface = {};


  clickedRows = new Set<Engrs>();
  selection = new SelectionModel<Engrs>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.engrs.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.engrs);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Engrs): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.hrms_id + 1}`;
  }

  openDialog(id:any): void {
    this.isLoading = true;
    this.engineersService.getEngrsDetailsById(id).pipe(first()).subscribe((x: any) => {
      this.isLoading = false;
      // this.engrsUpdateForm.patchValue(x.engr);
      console.log('engrs', x);
    });
    const dialogRef = this.dialog.open(EngineersUpdateDialog, {

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
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

    this.engineersService.getEngineers().subscribe((res: Engrs[]) => {
      this.isLoading = false;
      this.engrs = res;
    })

    this.dropdownService.getDesignations().subscribe((response: { designationData: Designation[]; }) => {
      this.designs = response.designationData;
    });

    this.engineersService.getEngrsUpdateListener().subscribe(response => {
      this.isLoading = false;
      this.engrs = response;
    });

    this.getAllPwdEngineers();
  }

  getAllPwdEngineers(){
    this.isLoading = true;
    const requestObj = {
      page: this.page,
      itemsPerPage: this.pageSize,
    }
    this.engineersService.getAllEngineersData(requestObj).pipe(first()).subscribe((res:any) => {
      this.isLoading = false;
      this.engrs = res.engineers.data;
      this.totalPages = res.engineers.total_pages;
      this.currentPage = res.engineers.current_page;
      this.totalRecords = res.engineers.total;
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
    this.getAllPwdEngineers();
  }

  getSearchTableData(event: any){
    if(event.value.length > 0){
      this.isLoading = true;
      this.engineersService.getSearchData(event.value).pipe(first()).subscribe((res:any) => {
        this.isLoading = false;
        this.engrs = res.engineers.data;
        this.totalPages = res.engineers.total_pages;
        this.currentPage = res.engineers.current_page;
        this.totalRecords = res.engineers.total;
      });
    }
    if(event.length <= 0){
      this.getAllPwdEngineers();
    }

  }

  editRow(row) {
    if (row.id === 0) {
      this.engineersService.addEngineer(row).subscribe(res => {
        row.id = res.id;
        row.isEdit = false;
      });
    } else {
      this.engineersService.updateEngineer(row).subscribe(() => row.isEdit = false);
    }
  }

  addRow() {
    const newRow: Engrs = {id: 0, engineer_name: " ", remarks: "", isEdit: true, isSelected: false}
    this.engrs = [newRow, ...this.engrs];
  }

  removeRow(id) {
    this.engineersService.deleteEngineer(id).subscribe(() => {
      this.engrs = this.engrs.filter((u: Engrs) => u.id !== id);
    });
  }

  removeSelectedRows() {
    const users= this.engrs.filter((u: Engrs) => u.isSelected);
    this.dialog.open(ConfirmationDialogComponent).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.engineersService.deleteEngineers(users).subscribe(() => {
          this.engrs = this.engrs.filter((u: Engrs) => !u.isSelected);
        });
      }
    });
  }


}

@Component({
  selector: 'app-engineers-update',
  templateUrl: './engineers-update.component.html',
  styleUrls: ['./engineers.component.scss']
})

export class EngineersUpdateDialog {
  engrsUpdateForm: FormGroup;
  authUser: AuthUser = null;
  engrs: Engrs[] = [];
  depts: Department[] = [];
  designs: Designation[] = [];
  castes: Castes[] = [];
  isLoading = false;
  isDisabled: boolean = false;
  joinDate: string;
  birthDate: string;
  retrDate: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dropdownService : DropdownService,
    private engineersService : EngineersService,
    public dialogRef: MatDialogRef<EngineersUpdateDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData ) {}


  ngOnInit(): void {
    console.log('data', this.data);
    this.isLoading = true;

    this.engrsUpdateForm.patchValue({
      // id: this.engrs.id,
      // hrms_id: this.engrs.hrms_id,
      // firstname: this.engrs.first_name,
      // middlename: this.engrs.middle_name,
      // lastname: this.engrs.last_name,
      // caste: this.engrs.department_id,
      // designation: this.engrs.entry_designation_id,
      // joinDate: this.engrs.dob,
      // birthDate: this.engrs.engineer_dob,
      // retrDate: this.engrs.engineer_dor,
      // remarks: this.engrs.remarks,
    });

    this.dropdownService.getDepartments().subscribe((response: { departmentData: Department[]; }) => {
      this.depts = response.departmentData;
    });

    this.dropdownService.getDesignations().subscribe((response: { designationData: Designation[]; }) => {
      this.designs = response.designationData;
    });

    this.dropdownService.getCastes().subscribe((response: { castes:  Castes[]; }) => {
      this.castes = response.castes;
    });

    this.engineersService.getEngrsUpdateListener().subscribe(response => {
      this.isLoading = false;
      this.engrs = response;
    });

    this.engrsUpdateForm = this.fb.group({
      id: new FormControl({value:null, disabled: true}),
      hrms_id: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      middlename: new FormControl(null),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      caste: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      joinDate: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      retrDate: new FormControl({value:null, disabled: true}),
      remarks: new FormControl(null),
    });

  }


  // this.birthDate = formatDate(event.value, 'yyyy-MM-dd', 'en');


  updateEngrsServiceData(){
    this.isLoading = true;
    const formData = this.engrsUpdateForm.getRawValue();
    const updateEngineersData = {
      id: formData.id,
      hrms_id: formData.hrms_id,
      firstname: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
      name: formData.firstname + ' ' + formData.middlename + ' ' + formData.lastname,
      doj: formData.joinDate,
      dob: formData.birthDate,
      dor: formData.retrDate,
      designation_id: formData.designation,
      remarks: formData.aboutMe,
    }

    this.engineersService.updateEngineerServiceData(updateEngineersData).pipe(first()).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['../../dashboard/profile'], { relativeTo: this.route });
      Swal.fire({ position: 'top-end', icon: 'success', showConfirmButton: false, timer: 3000, title: "Update Succesfull" });
    }, err => {
      this.isLoading = false;
      Swal.fire({ position: 'top-end', icon: 'error',  title: err.error.message, showConfirmButton: false, timer: 2000 });
    });

  }



  // addEmployee(e: Employee){
  //   this.$data.first().subscribe(data => {
  //     let newData = data.slice();
  //     newData.push(e);
  //     this.$data.next(newData);
  //   }
  // }



}

