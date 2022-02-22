import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { AuthUser } from '../../models/auth-user.model';
import { first } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

export interface MenuItem  {
  path: string;
  title: string;
  role?: string;
  ablity?: number;
  permission?: any;
  is_departmental?: number;
  inforce?: number;
  display?: number;
  type?: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

export const menuItems: MenuItem[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    inforce: 1,
    type: 'link',
    icontype: 'dashboard'
  },
  {
    path: '/dashboard',
    title: 'User Management',
    role: 'super_admin',
    type: 'sub',
    icontype: 'widgets',
    collapse: 'superadmin',
    children: [
      {path: 'user-role', title: 'User - Role', ab:'UR'},
      {path: 'user-permission', title: 'User - Permission', ab:'UP'},
      {path: 'users', title: 'Users', ab:'U'},
      {path: 'roles', title: 'Roles', ab:'R'},
      {path: 'active-users', title: 'Active User', ab:'AU'},
      {path: 'block-users', title: 'Blocked User', ab:'BU'},
    ]
  },
  {
    path: '/engrsCpanel',
    title: 'Cpanel - PWD Engineers',
    role: 'super_admin',
    type: 'sub',
    icontype: 'school',
    collapse: 'pwdEngrs',
    children: [
      {path: 'update-je', title: 'Junior Engineer', ab:'UJE'},
      {path: 'update-ae', title: 'Assistant Engineer', ab:'UAE'},
      {path: 'update-se', title: 'Senior Engineer', ab:'USE'},
    ]
  },
  {
    path: '/engrs',
    title: 'WB PWD Engineers',
    ablity: 1,
    type: 'link',
    icontype: 'architecture'
  },
  {
    path: '/pwd-works',
    title: 'PWD-Works',
    ablity: 1,
    // is_departmental: 1,
    type: 'link',
    icontype: 'work'
  },
  {
    path: 'dashboard/tweety',
    title: 'Discussion Room',
    ablity: 1,
    type: 'link',
    icontype: 'mail'
    // collapse: 'chat',
    // children: [
    //   {path: 'chat', title: 'Chat', ab:'C'},
    //   {path: 'inbox', title: 'Inbox', ab:'IB'},
    // ]
  },

  {
    path: '/developers',
    title: 'Web Development',
    role: 'programmer',
    type: 'sub',
    icontype: 'widgets',
    collapse: 'developers',
    children: [
      {path: 'laravel', title: 'Laravel', ab:'LAR'},
      {path: 'angular', title: 'Angular', ab:'ANG'},
      {path: 'vue', title: 'Vue', ab:'VUE'},
    ]
  },
  {
    path: '/tutorials',
    title: 'Video Tutorial',
    role: 'academy',
    type: 'sub',
    icontype: 'image',
    collapse: 'tutorials',
    children: [
      {path: 'software', title: 'Software', ab:'S'},
      {path: 'dev', title: 'Coding', ab:'C'},
    ]
  },
];

@Component({
  selector: 'app-pwd-engrs-navbar',
  templateUrl: './pwd-engrs-navbar.component.html',
  styleUrls: ['./pwd-engrs-navbar.component.scss']
})

export class PwdEngrsNavbarComponent implements OnInit {
  authUser: AuthUser = null;
  loading = false;
  returnUrl: string;
  public menuItems: any[];

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.authService.getAuthUser().pipe(first()).subscribe( (response: any) => {
      this.authUser = response.data;
    });
  }

  ngOnInit(): void {
    this.authService.getAuthUserUpdateListener().subscribe( (res: any) => {
      this.authUser = res.userData;
    });
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logoutCurrentUser(): void {
    this.loading = true;
    this.authService.logout().subscribe(data=>{
     Swal.fire({icon: 'success', title: data.message, showConfirmButton: false, timer: 2000 });
    });

  }

}

