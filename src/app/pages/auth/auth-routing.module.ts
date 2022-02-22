import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordForgotComponent } from './password/password-forgot/password-forgot.component';
import { PasswordResetComponent } from './password/password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';
import { SendMailComponent } from './send-mail/send-mail.component';
import { GithubComponent } from './socialite/github/github.component';
import { GoogleComponent } from './socialite/google/google.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'contact',
        component: SendMailComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'verify-email',
        component: VerifyEmailComponent
      },
      {
        path: 'forgot-password',
        component: PasswordForgotComponent
      },
      {
        path: 'reset-password',
        component: PasswordResetComponent
      },
      {
        path: 'google/callback',
        component: GoogleComponent
      },
      {
        path: 'github/callback',
        component: GithubComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
