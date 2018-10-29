import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PlanService } from 'app/pratik/common/plan.service';
import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { SuccessService } from 'app/success/success.service';
import { JhiEventManager } from 'ng-jhipster';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css', '../../css/fa/css/all.css']
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
    isPaid: boolean;
    isSubscribed: boolean;
    userPlan: any;
    uid: any;
    fullAccess: boolean;
    result: any = [];
    last: any;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private deviceService: DeviceDetectorService,
        private planService: PlanService,
        private eventManager: JhiEventManager,
        private userPlanService: UserPlanService,
        private sc: CommonSidebarService,
        private successService: SuccessService
    ) {
        this.epicFunction();
    }

    epicFunction() {
        this.isMobile = this.deviceService.isMobile();
    }

    ngOnInit() {
        this.planService.plan.subscribe(flag => {
            if (flag) {
                this.isPaid = true;
            } else {
                this.isPaid = false;
            }
        });
        this.sc.account.subscribe(account => {
            if (account) {
                this.account = account;
                this.uid = this.account.id;
                this.get(this.uid);
            }
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            // alert('success');
            // this.principal.identity().then(account => {
            //     this.account = account;
            //     this.uid = account.id;
            //     this.get(this.uid);
            // });
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
                } else {
                    this.fullAccess = true;
                }
            } else {
                this.fullAccess = false;
                this.isSubscribed = false;
            }

            this.checkSuccess(uid);
        });
    }

    checkSuccess(uid) {
        this.successService.getTransactionData(uid).subscribe(data => {
            this.result = data;
            this.last = this.result.pop();
            if (this.last) {
                if (this.last.status === 'success') {
                    this.isPaid = true;
                    this.isSubscribed = true;
                    this.showSidebar();
                } else {
                    this.isPaid = false;
                }
            } else {
                this.isPaid = false;
            }
        });
    }

    ngAfterViewInit() {
        if (this.isMobile) {
            const x = document.getElementById('main-menu');
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    RouteChanged() {
        if (this.isMobile) {
            const x = document.getElementById('main-menu').classList.toggle('expanded');
        }
    }

    showSidebar() {
        const x = document.getElementById('main-menu').classList.toggle('expanded');
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    Login() {
        this.modalRef = this.loginModalService.open();
    }
}
