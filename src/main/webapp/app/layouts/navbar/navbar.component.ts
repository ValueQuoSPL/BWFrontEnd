import { Component, OnInit, DoCheck, Injectable, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from 'app/layouts/navbar/window.service';
import { Principal, LoginModalService, LoginService, JhiLanguageHelper } from 'app/core';
import { VERSION } from 'app/app.constants';
import { JhiMainComponent } from 'app/layouts/main/main.component';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { JhiLanguageService, JhiEventManager } from 'ng-jhipster';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { PlanService } from 'app/pratik/common/plan.service';
import { UserIdleService } from 'angular-user-idle';

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
    loggedIn = false;
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
        private main: JhiMainComponent,
        private sidebar: SidebarComponent,
        private deviceService: DeviceDetectorService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private cd: ChangeDetectorRef,
        private commonService: CommonSidebarService,
        private planService: PlanService,
        private userIdle: UserIdleService,
        private eventManager: JhiEventManager
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
        this.registerAuthenticationSuccess();

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

        this.account = this.loginService.getCookie();
        if (this.account) {
            this.loggedIn = true;
            if (this.account.firstName !== null) {
                this.FirstName = this.account.firstName;
            } else {
                this.FirstName = 'Account';
            }
            if (this.account.authorities[1]) {
                if (this.account.authorities[1] === 'ROLE_ADMIN') {
                    this.isAdmin = true;
                    this.isPaid = true;
                }
            }
        } else {
            this.logoutOnReload();
        }

        // Start watching when user idle is starting.
        this.userIdle.onTimerStart().subscribe(count => {});

        // Start watch when time is up.
        this.userIdle.onTimeout().subscribe(() => {
            alert('Your session timed out. Please re-login');
            this.logout();
        });
    }

    logoutOnReload(): any {
        this.FirstName = 'Account';
        this.isPaid = false;
        this.isAdmin = false;
        this.loggedIn = false;

        this.loginService.logout();
        this.commonService.logout.next(1);
        this.planService.isPaid.next(false);
        this.router.navigate(['/']);
    }

    // after login
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.account = this.loginService.getCookie();

            if (this.account) {
                this.loggedIn = true;
                if (this.account.firstName !== null) {
                    this.FirstName = this.account.firstName;
                } else {
                    this.FirstName = 'Account';
                }
                if (this.account.authorities[1]) {
                    if (this.account.authorities[1] === 'ROLE_ADMIN') {
                        this.isAdmin = true;
                        this.isPaid = true;
                    }
                }
            } else {
                this.logout();
            }
        });
    }

    // idle start
    stop() {
        this.userIdle.stopTimer();
    }

    stopWatching() {
        this.userIdle.stopWatching();
    }

    startWatching() {
        this.userIdle.startWatching();
    }

    restart() {
        this.userIdle.resetTimer();
    }
    // idle end

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
            if (this.param === '/contact') {
                this.router.navigate(['/contact']);
            }
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

    // isAuthenticated() {
    //     const flag = this.principal.isAuthenticated();
    //     if (flag === true) {
    //         this.transparent = 'solid';
    //     }
    //     return flag;
    // }

    login() {
        this.collapseNavbar();
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.FirstName = 'Account';
        this.isPaid = false;
        this.isAdmin = false;
        this.loggedIn = false;
        this.collapseNavbar();

        this.sidebar.showSidebar('navbar logout()');
        this.loginService.logout();
        this.main.toggleSide(true);
        this.commonService.logout.next(1);
        this.planService.isPaid.next(false);
        this.router.navigate(['/']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.loggedIn ? this.principal.getImageUrl() : null;
    }

    toggle() {
        // let flag = false;
        this.flag = !this.flag;
        this.main.toggleSide(this.flag);
        this.sidebar.showSidebar('navbar toggle()');
    }
    register1() {
        this.router.navigate(['register']);
    }
}
