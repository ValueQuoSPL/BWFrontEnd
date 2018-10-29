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
import { JhiLoginModalComponent } from 'app/shared';

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
    isPlan: boolean;
    PaymentArray: any = [];
    isPayment: boolean;

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
        private paymentCheck: SuccessService
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
        // this.loginComponent.CheckPlanSelected();
        this.CheckPlanSelected();
    }

    ngAfterViewInit() {
        // alert('calling get');
        this.principal.identity().then(account => {
            if (account) {
                this.account = account;
                this.uid = account.id;
                this.checkSuccess(this.uid);
                this.sc.account.next(this.account);
                this.CheckPlanSelected();
            }
        });

        this.cd.detectChanges();
    }

    checkSuccess(uid) {
        this.successService.getTransactionData(uid).subscribe(
            data => {
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
            },
            error => {}
        );
    }

    CheckPlanSelected() {
        this.paymentCheck.getTransactionData(this.uid).subscribe(paymentData => {
            if (paymentData) {
                this.isPlan = true;
                this.PaymentArray = paymentData;
                this.CheckPayment();
            } else {
                this.isPlan = false;
                this.isPayment = false;
            }
        });
    }

    CheckPayment() {
        let status;
        this.PaymentArray.forEach(element => {
            status = element.status;
        });
        if (status === 'success') {
            this.isPayment = true;
            this.planService.plan.next(true);
        } else {
            this.isPayment = false;
            this.planService.plan.next(false);
        }
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
                element.setAttribute('style', 'margin-left: 0px;');
            } else {
                element.setAttribute('style', 'margin-left: 200px;');
            }
        }
    }
}
