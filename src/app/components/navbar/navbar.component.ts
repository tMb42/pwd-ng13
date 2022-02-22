import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface MenuItem  {
  label: string;
  icon: string;
  path?: string;
  link?: string;
  isLoggedIn?: boolean;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  // public menuItems: any[];
  loading = false;

  loginGuardMenu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
  ];

  logoutMenu: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'exit_to_app',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
  ];

  loginGuardMenu2: MenuItem[] = [
    {
      label: 'Home',
      icon: 'home',
      path: 'auth',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Register',
      icon: 'person_add',
      path: 'auth/register',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Login',
      icon: 'login',
      path: 'auth/login',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    }
  ];

  menuItems: MenuItem[] = [
    {
      label: 'Contact',
      icon: 'email',
      path: 'auth/contact',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },

    {
      label: 'Docs',
      icon: 'notes',
      path: '/auth/docs',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
    {
      label: 'About',
      icon: 'help',
      path: '/auth/about',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
  ];
  menuItems2: MenuItem[] = [
    {
      label: 'Help',
      icon: 'ondemand_video',
      link: 'https://www.youtube.com/playlist?list=PL-XnBqE6GzTrF2nX1Qm3v_eQgqo1U4xYH',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
    {
      label: 'Facebook',
      icon: 'facebook',
      link: 'https://www.facebook.com/tmb2021',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
    {
      label: 'Blog',
      icon: 'rss_feed',
      link: 'https://www.youtube.com/channel/UC094B-h2cN66yCE-UvDhLdQ',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
  ];

  constructor(private observer: BreakpointObserver, private route: ActivatedRoute, private authService: AuthService, private router: Router) {}


  ngOnInit(): void {

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

}
