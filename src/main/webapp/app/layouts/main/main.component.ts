import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { PlanService } from 'app/pratik/common/plan.service';
import { SuccessService } from 'app/success/success.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.css']
})
export class JhiMainComponent implements OnInit, AfterViewInit {
    account: Account;
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
        private sc: CommonSidebarService
    ) {
        this.epicFunction();
    }

    epicFunction() {
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
        this.isDesktop = this.deviceService.isDesktop();
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

        this.sc.newlogin.subscribe(data => {
            this.principal.identity().then(account => {
                this.account = account;
                this.uid = account.id;
                this.checkSuccess(this.uid);
            });
        });

        this.planService.plan.subscribe(flag => {
            if (flag) {
                this.isPaid = true;
            } else {
                this.isPaid = false;
            }
        });
        this.registerAuthenticationSuccess();
    }

    ngAfterViewInit() {
        this.principal.identity().then(account => {
            this.account = account;
            this.uid = account.id;
            this.checkSuccess(this.uid);
        });

        this.cd.detectChanges();
    }

    checkSuccess(uid) {
        this.successService.getTransactionData(uid).subscribe(data => {
            this.result = data;
            this.last = this.result.pop();
            if (this.last) {
                if (this.last.status === 'success') {
                    this.isPaid = true;
                    if (!this.isMobile) {
                        this.flag = true;
                    }
                    this.planService.isSubscribed.next(true);
                } else {
                    this.isPaid = false;
                }
            } else {
                this.isPaid = false;
                this.flag = false;
            }
        });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
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
        if (this.isPaid) {
            const element = document.getElementById('toggle');
            if (!this.isMobile) {
                if (flag) {
                    element.setAttribute('style', 'margin-left: 0px;');
                } else {
                    element.setAttribute('style', 'margin-left: 200px;');
                }
            }
        } else {
        }
    }
}
