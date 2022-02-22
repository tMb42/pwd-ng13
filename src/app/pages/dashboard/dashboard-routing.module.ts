import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { PasswordChangeComponent } from '../auth/password/password-change/password-change.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'change-password',
        component: PasswordChangeComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'delete-account',
      //   component: DeleteAccountComponent,
      //   canActivate: [AuthGuard]
      // },

    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
