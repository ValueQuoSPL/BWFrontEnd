import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { Principal, LoginModalService, LoginService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { PlanService } from 'app/pratik/common/plan.service';
import { SuccessService } from 'app/success/success.service';
import { JhiLoginModalComponent } from 'app/shared';
import { UserIdleService } from 'angular-user-idle';
import { UserPlanService } from 'app/home/subscriber/userplan.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.css']
})
export class JhiMainComponent implements OnInit, AfterViewInit {
    account: any;
    ac: any;
    modalRef: NgbModalRef;
    deviceInfo = null;
    isMobile;
    isTablet;
    isDesktop;
    globalElement: HTMLElement;
    toggleFlag: any;
    push;
    pull;
    flag = false;
    isPaid = false;

    @ViewChild('toggleClass') toggle: ElementRef;
    result: any = [];
    last: any;
    uid: any;
    isPlan: boolean;
    PaymentArray: any = [];
    isPayment: boolean;
    authority: any;
    change;
    loggedIn = false;
    trialData: any = [];
    isExpired: boolean;

    constructor(
        private titleService: Title,
        private router: Router,
        private loginModalService: LoginModalService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private deviceService: DeviceDetectorService,
        private planService: PlanService,
        private successService: SuccessService,
        private cd: ChangeDetectorRef,
        private sc: CommonSidebarService,
        private paymentCheck: SuccessService,
        private loginService: LoginService,
        private userIdle: UserIdleService,
        private userPlanService: UserPlanService
    ) {
        this.epicFunction();
    }

    epicFunction() {
        this.isMobile = this.deviceService.isMobile();
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'Buckswise';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.sc.logout.subscribe(() => {
            this.isPaid = false;
            this.flag = false;
        });
    }

    // after every load/reload
    ngAfterViewInit() {
        // for expiry plan hide side bar, disable toggle flag button
        this.sc.Expiry.subscribe(flag => {
            if (flag === false) {
                // this.showSidebar('from login');
                this.isPaid = false;
                this.flag = false;
                this.isExpired = true;
            } else {
                this.ac = this.loginService.getCookie();
                this.account = this.ac;
                if (this.account) {
                    this.startWatching();
                    this.loggedIn = true;
                    this.sc.account.next(this.account);
                    this.uid = this.account.id;

                    if (this.account.authorities[1]) {
                        this.authority = this.account.authorities[1];
                    }
                    this.userPlanService.GetUserPlan(this.uid).subscribe(data => {
                        // // console.log(data);
                        this.trialData = data;
                        if (this.trialData[0].uid === this.uid) {
                            this.planService.isTrial.next(false);
                        }
                    });
                    this.checkSuccess(this.uid);
                } else {
                    this.loginService.logout();
                    this.loggedIn = false;
                }
            }
            // this.toggleSide(false);
        });

        // for normal condition when plan is not expire
        this.ac = this.loginService.getCookie();
        this.account = this.ac;
        if (this.account) {
            this.startWatching();
            this.loggedIn = true;
            this.sc.account.next(this.account);
            this.uid = this.account.id;
            if (this.account.authorities[1]) {
                this.authority = this.account.authorities[1];
            }
            if (this.uid) {
                this.userPlanService.GetUserPlan(this.uid).subscribe(data => {
                    this.trialData = data;
                    if (this.trialData.length > 0) {
                        if (this.trialData[0].uid === this.uid) {
                            this.planService.isTrial.next(false);
                        }
                    }
                });
            }

            this.checkSuccess(this.uid);
        } else {
            this.loginService.logout();
            this.loggedIn = false;
        }
        this.registerAuthenticationSuccess();

        this.change = this.cd.detectChanges();
    }

    // after login
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.account = this.loginService.getCookie();
            if (this.account) {
                this.loggedIn = true;
                this.sc.account.next(this.account);
                this.uid = this.account.id;
                if (this.account.authorities[1]) {
                    this.authority = this.account.authorities[1];
                } else {
                    this.authority = null;
                }

                this.checkSuccess(this.uid);
            } else {
                this.loginService.logout();
                this.loggedIn = false;
            }
        });
    }

    startWatching() {
        // console.log('idle watching start');
        this.userIdle.startWatching();
    }

    checkSuccess(uid) {
        this.successService.getTransactionData(uid, 'main').subscribe(data => {
            this.result = data;
            this.last = this.result.pop();
            if (this.last) {
                if (this.last.status === 'success') {
                    // if not Expired set flag show the sidebar
                    if (!this.isExpired) {
                        this.isPaid = true;
                    }
                    if (!this.isMobile) {
                        // if not Expired set flag show the sidebar
                        if (!this.isExpired) {
                            this.flag = true;
                        }
                    }
                    this.planService.isPaid.next(true);
                } else {
                    this.isPaid = false;
                }
            } else {
                this.isPaid = false;
                this.flag = false;

                if (this.authority === 'ROLE_ADMIN') {
                    this.isPaid = true;
                    if (!this.isMobile) {
                        this.flag = true;
                        console.log('pull', this.flag);
                    }
                }
            }
        });
    }

    isAuthenticated() {
        const flag = this.principal.isAuthenticated();
        return flag;
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    toggleSide(flag) {
        this.isMobile = this.deviceService.isMobile();

        const element = document.getElementById('toggle');
        if (!this.isMobile) {
            if (flag) {
                this.flag = false;
            } else {
                this.flag = true;
                console.log('pull', this.flag);
                // element.setAttribute('style', 'margin-left: 200px;');
            }
        }
    }
}
