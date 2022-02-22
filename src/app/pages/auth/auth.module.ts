import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthRoutingModule } from './auth-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoginComponent } from './login/login.component';
import { RegisterComponent, TermsAndConditionDialog } from './register/register.component';
import { PasswordForgotComponent } from './password/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './password/password-reset/password-reset.component';
import { PasswordChangeComponent } from './password/password-change/password-change.component';
import { FieldErrorDisplayComponent } from 'src/app/validation/field-error-display/field-error-display.component';
import { GoogleComponent } from './socialite/google/google.component';
import { GithubComponent } from './socialite/github/github.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SendMailComponent } from './send-mail/send-mail.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TermsAndConditionDialog,
    PasswordForgotComponent,
    PasswordResetComponent,
    PasswordChangeComponent,
    FieldErrorDisplayComponent,
    GoogleComponent,
    GithubComponent,
    VerifyEmailComponent,
    SendMailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    FontAwesomeModule,
  ]

})
export class AuthModule { }
