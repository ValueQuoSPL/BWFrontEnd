import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PlanService } from 'app/pratik/common/plan.service';
import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { SuccessService } from 'app/success/success.service';
import { JhiEventManager } from 'ng-jhipster';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { SpendingComponent } from 'app/pratik';
import { SpendingRouteGuardService } from 'app/pratik/common/spending-route-guard.service';
// import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css', '../../css/fa/css/all.css', '../../../content/css/w3.css']
})
@Injectable()
export class SidebarComponent implements OnInit, AfterViewInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    isLogin = false;
    account: any;
    isMobile;
    isPaid: any;
    isSubscribed: boolean;
    userPlan: any;
    uid: any;
    fullAccess: boolean;
    result: any = [];
    last: any;
    authority: any;
    encrypt: number;
    loggedIn = false;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private deviceService: DeviceDetectorService,
        private planService: PlanService,
        private userPlanService: UserPlanService,
        private commonService: CommonSidebarService,
        private srs: SpendingRouteGuardService
    ) {
        this.epicFunction();
    }

    epicFunction() {
        this.isMobile = this.deviceService.isMobile();
    }

    ngOnInit() {
        this.principal.getAuthenticationState().subscribe(authority => {
            if (authority) {
                if (authority.authorities[1]) {
                    this.authority = authority.authorities[1];
                    this.showSidebarAfterLogin();
                }
            }
        });
        this.planService.isPaid.subscribe(flag => {
            if (flag === true) {
                this.isPaid = true;
                this.showSidebarAfterLogin();
            } else {
                this.isPaid = false;
            }
        });
        this.commonService.account.subscribe(account => {
            if (account) {
                this.loggedIn = true;
                this.account = account;
                this.uid = this.account.id;
                this.encrypt = this.uid * 1993;
                this.get(this.uid);
                if (this.account.authorities[1]) {
                    this.authority = this.account.authorities[1];
                    if (this.authority === 'ROLE_ADMIN') {
                        this.showSidebarAfterLogin();
                        this.fullAccess = true;
                    }
                } else {
                }
            }
        });
        this.commonService.logout.subscribe(() => {
            this.loggedIn = false;
            this.isPaid = false;
        });
    }

    get(uid) {
        this.userPlanService.GetUserPlan(uid).subscribe(response => {
            this.userPlan = response;

            if (this.userPlan.length !== 0) {
                this.isSubscribed = true;
                const plan = this.userPlan[0].plan;

                if (plan === 'WISE') {
                    this.fullAccess = false;
                    if (this.authority === 'ROLE_ADMIN') {
                        this.fullAccess = true;
                    }
                } else {
                    this.fullAccess = true;
                }
            } else {
                this.fullAccess = false;

                this.isSubscribed = false;
                if (this.authority === 'ROLE_ADMIN') {
                    this.showSidebarAfterLogin();
                    this.fullAccess = true;
                }
            }
        });
    }

    ngAfterViewInit() {
        if (this.isMobile) {
            const x = document.getElementById('main-menu');
        }
    }

    isAuthenticated() {
        return this.loggedIn;
    }

    RouteChanged() {
        if (this.isMobile) {
            const x = document.getElementById('main-menu');
            if (x) {
                x.classList.add('expanded');
            }
        }
    }

    showSidebar(from) {
        this.epicFunction();
        this.planService.isPaid.subscribe(flag => {
            if (flag) {
                const x = document.getElementById('main-menu');
                if (x) {
                    x.classList.toggle('expanded');
                }
            }
        });
    }

    showSidebarAfterLogin() {
        if (!this.isMobile) {
            const x = document.getElementById('main-menu');
            if (x) {
                x.classList.add('expanded');
            }
        }
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    Login() {
        this.modalRef = this.loginModalService.open();
    }

    expense(route) {
        this.srs.accordion.next(route);
    }
}
