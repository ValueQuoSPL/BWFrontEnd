import { Component, OnInit, DoCheck, Injectable, ChangeDetectorRef, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { NotificationService } from 'app/pratik/notification/notification.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
@Injectable()
export class NavbarComponent implements OnInit, DoCheck, OnDestroy {
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
    notify_count = 0;
    show: boolean;
    // isNotification = false;
    titleNotify = 'Notifications';
    notifyArray: any = [];
    notification: any;
    timerflag: boolean;
    idleModalRef: NgbModalRef;
    isExpired: boolean;

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
        private eventManager: JhiEventManager,
        private notifyService: NotificationService,
        private modalService: NgbModal
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
        this.commonService.Expiry.subscribe(flag => {
            this.isPaid = false;
            this.isExpired = true;
            // console.log('expired');
        });
        this.registerAuthenticationSuccess();

        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        if (this.isMobile) {
            this.transparent = 'solid';
        }

        this.planService.isPaid.subscribe(flag => {
            if (flag === true) {
                if (!this.isExpired) {
                    this.isPaid = true;
                    // console.log('paid', this.isPaid);
                }
            } else {
                this.isPaid = false;
            }
        });

        this.account = this.loginService.getCookie();
        if (this.account) {
            this.loggedIn = true;
            if (this.account.firstName !== null) {
                this.FirstName = 'Hi ' + this.account.firstName;
            } else {
                this.FirstName = 'Account';
            }
            if (this.account.authorities[1]) {
                if (this.account.authorities[1] === 'ROLE_ADMIN') {
                    this.isAdmin = true;
                    this.isPaid = true;
                    // console.log('paid', this.isPaid);
                }
            }
        } else {
            this.logoutOnReload();
        }

        this.planService.idle.subscribe(flag => {
            this.timerflag = true;
            this.onHereClick();
        });

        // Start watching when user idle is starting.
        this.startTimer();

        // Start watch when time is up.
        this.timeOut();

        this.notifyService.showNotifier.subscribe((message: string) => {
            // this.notification = data;
            this.onAddNotify(message);
        });
        this.notifyService.clearNotify.subscribe(data => {
            this.onClearNotify();
        });
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

    ngOnDestroy() {
        // console.log('navbar destroyed');
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

    startTimer() {
        this.timerflag = true;
        this.userIdle.onTimerStart().subscribe(count => {
            if (count) {
                if (this.timerflag) {
                    this.timerflag = false;
                    this.openIdleAlert();
                }
            }
        });
    }

    onHereClick() {
        this.timerflag = true;
        this.stop();
        this.restart();
    }

    timeOut() {
        this.userIdle.onTimeout().subscribe(() => {
            this.openSessionTimeout();
            // this.logout();
            this.logoutForIdle();
        });
    }

    restart() {
        this.userIdle.resetTimer();
    }

    openIdleAlert() {
        this.idleModalRef = this.modalService.open(IdleAlertComponent);
        // modalRef.componentInstance.name = 'World';
    }

    openSessionTimeout() {
        this.idleModalRef.close();
        const modalRef = this.modalService.open(SessionTimeoutComponent);
    }
    // idle end

    onAddNotify(message: string) {
        this.notify_count++;
        this.notifyArray.push(message);
    }

    onClearNotify() {
        this.notify_count = 0;
        this.notifyArray.length = 0;
    }

    logoutOnReload(): any {
        this.FirstName = 'Account';
        this.isPaid = false;
        this.isAdmin = false;
        this.loggedIn = false;
        this.notifyArray.length = 0;
        this.notify_count = 0;

        this.loginService.logout();
        this.commonService.logout.next(1);
        this.planService.isPaid.next(false);
        this.planService.isTrial.next(true);

        // this.router.navigate(['/']);
    }

    // after login
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.account = this.loginService.getCookie();

            if (this.account) {
                this.startWatching();
                this.loggedIn = true;
                if (this.account.firstName !== null) {
                    this.FirstName = 'Hi ' + this.account.firstName;
                } else {
                    this.FirstName = 'Account';
                }
                if (this.account.authorities[1]) {
                    if (this.account.authorities[1] === 'ROLE_ADMIN') {
                        this.isAdmin = true;
                        this.isPaid = true;
                        // console.log('paid', this.isPaid);
                    }
                }
            } else {
                this.logout();
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

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    login() {
        this.collapseNavbar();
        this.modalRef = this.loginModalService.open();
    }

    sample() {
        console.log('hii from nav component');
    }

    logout() {
        this.FirstName = 'Account';
        this.isPaid = false;
        this.isAdmin = false;
        this.loggedIn = false;
        this.notifyArray.length = 0;
        this.notify_count = 0;
        this.collapseNavbar();
        this.stopWatching();

        this.sidebar.showSidebar('navbar logout()');
        this.loginService.logout();
        this.main.toggleSide(true);
        this.commonService.logout.next(1);
        this.planService.isPaid.next(false);
        this.planService.isTrial.next(true);

        this.router.navigate(['/']);
    }

    logoutForIdle() {
        this.FirstName = 'Account';
        this.isPaid = false;
        this.isAdmin = false;
        this.loggedIn = false;
        this.notifyArray.length = 0;
        this.notify_count = 0;
        this.collapseNavbar();
        this.stopWatching();

        this.sidebar.showSidebar('navbar logout()');
        // this.loginService.logout();
        this.main.toggleSide(true);
        this.commonService.logout.next(1);
        this.planService.isPaid.next(false);
        this.planService.isTrial.next(true);

        this.router.navigate(['/']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.loggedIn ? this.principal.getImageUrl() : null;
    }

    toggle() {
        if (!this.isExpired) {
            // let flag = false;
            this.flag = !this.flag;
            this.main.toggleSide(this.flag);
            // if there is sidebar then it hide, else show
            this.sidebar.showSidebar('navbar toggle()');
        }
    }
    register1() {
        this.router.navigate(['register']);
    }

    onOpenNotify() {
        this.show = !this.show;
    }
}

@Component({
    selector: 'jhi-ngbd-modal-content',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Hi {{firstName}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Are you still here? </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="onHereClick()" (click)="activeModal.close('Close click')">I'm Here</button>
      </div>
    `
})
export class IdleAlertComponent {
    userDetail: any;
    firstName;
    constructor(public activeModal: NgbActiveModal, public idle: PlanService, private loginService: LoginService) {
        this.userDetail = this.loginService.getCookie();
        this.firstName = this.userDetail.firstName;
    }

    onHereClick() {
        this.idle.idle.next(0);
    }
}

@Component({
    selector: 'jhi-ngbd-modal-content',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">Hi {{firstName}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Your session has been timed out! Please re-login. </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      </div>
    `
})
export class SessionTimeoutComponent {
    userDetail: any;
    firstName;
    constructor(public activeModal: NgbActiveModal, private loginService: LoginService) {
        this.userDetail = this.loginService.getCookie();
        this.firstName = this.userDetail.firstName;
    }
}
