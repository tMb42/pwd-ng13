import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, first } from 'rxjs/operators';
import { AuthUser } from 'src/app/models/auth-user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

//Metadata
export interface menuLists  {
  label: string;
  icon: string;
  routerLink?: string;
  role?: string;
  ablity?: number;
  display?: number;
  permission?: any;
  is_departmental?: number;
  inforce?: number;
  children?: ChildItems[];
}

export interface ChildItems {
  label: string;
  ab?: string;
  icon?: string;
  routerLink?: string;
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  panelOpenState = false;
  expanded = false;

  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);

  authUser: AuthUser = null;
  imagePreview: null;
  avatar: string;
  loading = false;

  //user Menu Items
  // userMenu: MenuItem[] = [
  //   {
  //     label: 'My Profile',
  //     icon: 'person',
  //     path: 'dashboard/profile',
  //   },
  //   {
  //     label: 'Update Profile',
  //     icon: 'update',
  //     path: 'dashboard/update-profile',
  //   },
  //   {
  //     label: 'PWD Working Profile',
  //     icon: 'engineering',
  //     path: 'pwd-works/pwd-working-profile',
  //   },
  //   {
  //     label: 'Change Password',
  //     icon: 'password',
  //     path: 'dashboard/change-password',
  //   },
  //   {
  //     label: 'Suspend my Account',
  //     icon: 'person_remove',
  //     path: 'dashboard/delete-account',
  //   },
  // ];

  menuList: menuLists[] = [
    {
      routerLink: '/dashboard',
      label: 'User Management',
      role: 'super_admin',
      icon: 'widgets',
      children: [
        {routerLink: 'user-role', label: 'User - Role'},
        {routerLink: 'user-permission', label: 'User - Permission'},
        {routerLink: 'users', label: 'Users'},
        {routerLink: 'roles', label: 'Roles'},
        {routerLink: 'active-users', label: 'Active User'},
        {routerLink: 'block-users', label: 'Blocked User'},
      ]
    },
    {
      routerLink: '/engrsCpanel',
      label: 'Cpanel - PWD Engineers',
      role: 'super_admin',
      icon: 'school',
      children: [
        {routerLink: 'update-engrs', label: 'Engineers'},
        {routerLink: 'update-je', label: 'Junior Engineer'},
        {routerLink: 'update-ae', label: 'Assistant Engineer'},
        {routerLink: 'update-se', label: 'Senior Engineer'},
      ]
    },
    {
      label: 'PWD Engineers',
      ablity: 1,
      icon: 'architecture',
      routerLink: '/engrs',
    },
    {

      label: 'PWD-Works',
      ablity: 1,
      icon: 'work',
      routerLink: '/pwd-works',
    },

  ];



  constructor(private observer: BreakpointObserver, private authService: AuthService, private overlay: OverlayContainer) {
    this.authService.getAuthUser().pipe(first()).subscribe( (response: any) => {
      this.authUser = response.data;
    });

  }


  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).pipe(delay(1)).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  ngOnInit(): void {
    this.authService.getAuthUserUpdateListener().subscribe( (res: any) => {
      this.authUser = res.userData;
    });

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });

    // this.menuItems = ROUTES.filter(menuItem => menuItem);
    // this.AdminMenu = ROUTES.filter(menuItem => menuItem);
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logoutCurrentUser(): void {
    this.loading = true;
    this.authService.logout().subscribe((data:any)=>{
      this.loading = false;
      Swal.fire({icon: 'success', title: data.message, showConfirmButton: false, timer: 2000 });
    });
  }

  //  for a single link menu
  isPwdEngineer(menuitem): boolean {
    if(this.authUser.is_departmental == 1){
      if(menuitem.is_departmental === this.authUser.is_departmental ||
          menuitem.ablity === this.authUser.is_pwd_engineer ||
          (menuitem.type === 'link' && this.authUser.roles.includes(menuitem.role)) ||
          menuitem.inforce === this.authUser.inforce){
        return true;
      }

      if(this.authUser.is_pwd_engineer == 1){
        if((menuitem.ablity === this.authUser.is_pwd_engineer) ||
          (menuitem.type === 'link' && this.authUser.roles.includes(menuitem.role))){
          return true;
        }
        return false;
      }else{
        if(menuitem.type === 'link' && this.authUser.roles.includes(menuitem.role)){
          return true;
        }
        return false;
      }

    }else{
      if( menuitem.inforce === this.authUser.inforce || menuitem.type === 'link' && this.authUser.roles.includes(menuitem.role)){
        return true;
      }
      return false;
    }

  }

  //  for a sub menu link
  activeSubMenu(menuitem): boolean{
    if(menuitem.display === this.authUser.display || (menuitem.type === 'link' && this.authUser.roles.includes(menuitem.role))){
      return true;
    }
    return false;
  }



}
