import { Component, OnInit, DoCheck, Injectable, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from 'app/layouts/navbar/window.service';

import { ProfileService } from 'app/layouts/profiles/profile.service';
import { Principal, LoginModalService, LoginService, JhiLanguageHelper } from 'app/core';

import { VERSION } from 'app/app.constants';
import { JhiMainComponent } from 'app/layouts/main/main.component';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { Register } from 'app/account';
import { DeviceDetectorService } from 'ngx-device-detector';
import { JhiLanguageService } from 'ng-jhipster';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { PlanService } from 'app/pratik/common/plan.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
@Injectable()
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
    isMobile: any;
    looggedIn = false;
    isPaid = false;
    account: any;
    isAdmin = false;
    FirstName = 'Account';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(WINDOW) private window: Window,
        private loginService: LoginService,
        private router: Router,
        private loginModalService: LoginModalService,
        private principal: Principal,
        private profileService: ProfileService,
        private main: JhiMainComponent,
        private sidebar: SidebarComponent,
        private deviceService: DeviceDetectorService,
        private register: Register,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private cd: ChangeDetectorRef,
        private commonService: CommonSidebarService,
        private planService: PlanService
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.isMobile = this.deviceService.isMobile();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        // we'll do some stuff here when the window is scrolled
        const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
        if (number > 100) {
            this.navIsFixed = true;
        } else if (this.navIsFixed && number < 10) {
            this.navIsFixed = false;
        }
    }

    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        if (this.isMobile) {
            this.transparent = 'solid';
        }

        this.planService.isPaid.subscribe(flag => {
            if (flag === true) {
                this.isPaid = true;
            } else {
                this.isPaid = false;
            }
        });

        this.commonService.account.subscribe(account => {
            if (account) {
                this.account = account;

                if (this.account.firstName !== null) {
                    this.FirstName = this.account.firstName;
                } else {
                    this.FirstName = 'sorry';
                }
                if (this.account.authorities[1]) {
                    if (this.account.authorities[1] === 'ROLE_ADMIN') {
                        this.isAdmin = true;
                        this.isPaid = true;
                    }
                }
            }
        });
    }

    changeLanguage(languageKey: string) {
        this.collapseNavbar();
        this.languageService.changeLanguage(languageKey);
    }

    contact() {
        this.router.navigate(['/contact']);
    }
    ngDoCheck() {
        setTimeout(() => {
            this.param = this.router.url;

            if (this.param === '/') {
                this.isHomePage = true;
                this.solid = 'solid';
                this.transparent = 'transparent';
                if (this.isMobile) {
                    this.transparent = 'solid';
                }
            } else {
                this.isHomePage = false;
                this.solid = 'solid';
                this.transparent = 'solid';
            }
        });

        this.cd.detectChanges();
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        const flag = this.principal.isAuthenticated();
        if (flag === true) {
            this.transparent = 'solid';
        }
        return flag;
    }

    login() {
        this.collapseNavbar();
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.FirstName = 'Account';
        this.isPaid = false;
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
        this.main.toggleSide(this.flag);
        this.sidebar.showSidebar();
    }
    register1() {
        this.router.navigate(['register']);
    }
}
