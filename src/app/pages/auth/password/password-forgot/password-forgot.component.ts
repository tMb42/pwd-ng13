import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.scss']
})
export class PasswordForgotComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  data: FormGroup;
  isLoading = false;
  submitted = false;

  spinnerDiameter: number = 5; // Set to a low number to avoid affecting the container height
  @ViewChild('spinnerDiv') spinnerDiv: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService) { }


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

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  forgotPasswordLink() {
    this.submitted = true;
    this.isLoading = true;
    // // stop here if form is invalid
    // if (this.resetPasswordForm.invalid) {
    //   return;
    // }

    const data = {
      email: this.forgotPasswordForm.value.email
    }

    this.authService.sendPasswordResetLinkToEmail(data)
    .pipe(first())
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Please check your email for password reset instructions',
          showConfirmButton: false,
          timer: 4000
        });

      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({ position: 'top-end', icon: 'error', title: "We can't find a user with that email address", showConfirmButton: false, timer: 4000 });
      }

    });
  }

}
