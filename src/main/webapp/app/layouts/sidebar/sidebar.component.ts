import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PlanService } from 'app/pratik/common/plan.service';
import { UserPlanService } from 'app/home/subscriber/userplan.service';

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
    account: Account;
    isMobile;
    isPaid: boolean;
    isSubscribed: boolean;
    userPlan: any;
    uid: any;
    fullAccess: boolean;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private deviceService: DeviceDetectorService,
        private planService: PlanService,
        private userPlanService: UserPlanService
    ) {
        this.epicFunction();
    }

    epicFunction() {
        this.isMobile = this.deviceService.isMobile();
    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
            if (this.account) {
                this.uid = account.id;
                if (!this.isMobile) {
                    this.showSidebar();
                }
            }
        });

        this.planService.plan.subscribe(flag => {
            if (flag) {
                this.isPaid = true;
            } else {
                this.isPaid = false;
            }
        });
    }

    get() {
        this.userPlanService.GetUserPlan(this.uid).subscribe(response => {
            this.userPlan = response;
            if (this.userPlan.length !== 0) {
                this.isSubscribed = true;
                if (this.userPlan.plan === 'WISE') {
                    this.fullAccess = false;
                } else if (this.userPlan.plan === 'WISER') {
                    this.fullAccess = true;
                } else if (this.userPlan.plan === 'WISEST') {
                    this.fullAccess = true;
                }
            } else {
                this.isSubscribed = false;
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
