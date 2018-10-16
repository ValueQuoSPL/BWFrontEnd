import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from './window.service';

import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Principal, LoginModalService, LoginService } from 'app/core';

import { VERSION } from 'app/app.constants';
import { JhiMainComponent } from '../main/main.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Register } from 'app/account';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  navIsFixed = false;
  flag = false;
  param;
  isHomePage = false;
  transparent;
  solid;

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private main: JhiMainComponent,
    private sidebar: SidebarComponent,
    private register: Register,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.isNavbarCollapsed = true;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // we'll do some stuff here when the window is scrolled
    const number =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (number > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && number < 10) {
      this.navIsFixed = false;
    }
  }

  ngOnInit() {
    this.profileService.getProfileInfo().then(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });

    // this.register.isRegisterPage.subscribe(state => {
    //   console.log('is register page', state);
    //   if (state === true) {
    //     this.transparent = 'solid';
    //   } else {
    //     this.transparent = 'transparent';
    //   }
    // });

  }

  ngDoCheck() {
    this.param = this.router.url;

    if (this.param === '/') {
      console.log('home');
      this.isHomePage = true;
      this.solid = 'solid';
      this.transparent = 'transparent';
    } else {
      console.log('not home');
      this.isHomePage = false;
      this.solid = 'solid';
      this.transparent = 'solid';
    }

  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.principal.getImageUrl() : null;
  }

  toggle() {
    // let flag = false;
    this.flag = !this.flag;
    // console.log('inside navbar', this.flag);
    this.main.toggleSide(this.flag);
    this.sidebar.showSidebar();
  }
}
