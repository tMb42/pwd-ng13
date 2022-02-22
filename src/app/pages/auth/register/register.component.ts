import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { MustMatch } from '../../../validation/must-match.validator';
import Swal from 'sweetalert2';

export interface DialogData {
  checked: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  checked: boolean = false;
  hide = true;
  submitted = false;
  isLoading = false;
  error: {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog
    ) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(TermsAndConditionDialog, {
        data: {checked: this.checked},
      });
      dialogRef.afterClosed().subscribe(result => {
        this.checked = result;
        // console.log('The dialog was closed', result);
      });
    }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      middlename: new FormControl(null),
      lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      termsAndCondition: new FormControl(false, [Validators.required])
    },
      { validator: MustMatch('password', 'password_confirmation')}
    );
  }


  spinnerDiameter: number = 1; // Set to a low number to avoid affecting the container height
  @ViewChild('spinnerDiv') spinnerDiv: ElementRef;

  ngAfterViewInit() {
    // Wrap in a timeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(this.adjustSpinnerSize.bind(this), 100);
  }
  // Something happens that would cause the div height to change
  someEvent() {
    this.adjustSpinnerSize();
  }
  adjustSpinnerSize() {
    this.spinnerDiameter = this.spinnerDiv.nativeElement.offsetHeight;
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    // reset alerts on submit
    // this.alertService.clear();
    // console.log(this.loginForm.getRawValue());
    const formData = this.registerForm.getRawValue();
    // converting password to MD5
    // const md5 = new Md5();
    // const passwordMd5 = md5.appendStr(formData.password).end();
    // const ConfirmPasswordMd5 = md5.appendStr(formData.password_confirmation).end();
    const registerData = {
      firstname: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
      name: formData.firstname + ' ' + formData.middlename + ' ' + formData.lastname,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation
    }

    this.authService.register(registerData).pipe(first()).subscribe(response => {
      console.log(response),
      this.router.navigate(['../login'], { relativeTo: this.route });
      Swal.fire({ position: 'top-end', icon: 'success', showConfirmButton: false, timer: 6000, title: "Welcome, Your Registration is Completed. Please verify your E-mail before login" });
    },
    (err: any) => {
      this.isLoading = false;
      if(err.error.errors.email !=null){
      Swal.fire({ position: 'top-end', icon: 'info', title: err.error.errors.email, showConfirmButton: false, timer: 4000 });
      }else{
        Swal.fire({ position: 'top-end', icon: 'error',  title: err.error.errors.password, showConfirmButton: false, timer: 4000 });
      }
    });

  }

}

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsAndConditionDialog {
  constructor(public dialogRef: MatDialogRef<TermsAndConditionDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData ) {}

  aggreTermsAndCondition(){
    this.dialogRef.close(true);
  }
  disAggreTermsAndCondition(){
    this.dialogRef.close(false);
  }

}

