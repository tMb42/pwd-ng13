import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { PwdEngrsLayoutComponent } from './layouts/pwd-engrs-layout/pwd-engrs-layout.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeLayoutComponent,
    children: [{
      path: 'auth',
      loadChildren:()=> import('./pages/auth/auth.module').then(mod => mod.AuthModule)
    }]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: 'dashboard',
      loadChildren:()=> import('./pages/dashboard/dashboard.module').then(mod => mod.DashboardModule)
    }]
  },
  {
    path: '',
    component: PwdEngrsLayoutComponent,
    children: [
      {
        path: 'engrs',
        loadChildren:()=> import('./pages/pwd-engrs/pwd-engrs.module').then(mod => mod.PwdEngrsModule)
      },
      {
        path: 'jengrs',
        canActivate: [AuthGuard],
        data: {
          roles: ["super_admin", "junior_engineer","assistant_engineer", "executive_engineer", "superindending_engineer", "chief_engineer"]
        },
        loadChildren:()=> import('./pages/pwd-engrs/jengrs/jengrs.module').then(mod => mod.JengrsModule)
      },
      {
        path: 'aengrs',
        canActivate: [AuthGuard],
        data: {
          roles: ["super_admin", "junior_engineer","assistant_engineer", "executive_engineer", "superindending_engineer", "chief_engineer"]
        },
        loadChildren:()=> import('./pages/pwd-engrs/aengrs/aengrs.module').then(mod => mod.AengrsModule)
      },
      // {
      //   path: 'sengrs',
      //   canActivate: [AuthGuard],
      //   data: {
      //     roles: ["super_admin","junior_engineer","assistant_engineer", "executive_engineer", "superindending_engineer", "chief_engineer"]
      //   },
      //   loadChildren:()=> import('./pages/pwd-engrs/sengrs/sengrs.module').then(mod => mod.SengrsModule)
      // }
    ]
  },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      canActivate: [AuthGuard],
        data: {
          roles: ["super_admin", "admin"]
        },
        loadChildren:()=> import('./pages/control-panel/control-panel.module').then(mod => mod.ControlPanelModule)
    }]
  },

  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: 'pwd-works',
  //       canActivate: [AuthGuard],
  //       data: {
  //         roles: ["super_admin", "junior_engineer","assistant_engineer", "executive_engineer", "superindending_engineer", "chief_engineer"]
  //       },
  //       loadChildren:()=> import('./pages/pwd-works/pwd-works.module').then(mod => mod.PwdWorksModule)
  //     }
  //   ]
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
