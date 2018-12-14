import { Component, AfterViewInit, Renderer, ElementRef, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { SuccessService } from 'app/success/success.service';
import { AccountService, Principal } from 'app/core';
import { PlanService } from 'app/pratik/common/plan.service';
import { CookieService } from 'ngx-cookie';
import { UserPlanService } from 'app/home/subscriber/userplan.service';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements OnInit, AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    flag = false;
    uid;
    isPlan;
    isPayment;

    PaymentArray: any = [];
    route: any;
    admin: any;
    account: any;
    checkData: any = [];

    constructor(
        private stateStorageService: StateStorageService,
        private renderer: Renderer,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private elementRef: ElementRef,
        private router: Router,
        public activeModal: NgbActiveModal,
        private commonService: CommonSidebarService,
        private paymentCheck: SuccessService,
        private accountService: AccountService,
        private planService: PlanService,
        private principal: Principal,
        private _cookieService: CookieService,
        private userPlanService: UserPlanService
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        this.admin = null;

        this.principal.getAuthenticationState().subscribe(identity => {
            if (identity) {
                this.route = identity.authorities[0];
                if (identity.authorities[1]) {
                    this.admin = identity.authorities[1];
                } else {
                    this.admin = null;
                }
                // this.routing();
            }
        });
    }

    ngAfterViewInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

    getUserid() {
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.uid = this.account.id;
            this.CheckPlanSelected();
            this.checkExpiryDate();
        }
    }

    checkExpiryDate() {
        let date;
        let plan;
        this.userPlanService.GetUserPlan(this.uid).subscribe(data => {
            this.checkData = data;
            this.checkData.forEach(element => {
                date = new Date(element.expiryDate);
                plan = element.plan;
            });

            if (plan) {
                if (new Date() === date) {
                    this.router.navigate(['/subscription']);
                } else {
                    this.router.navigate(['/dashboard']);
                }
            } else {
                // alert('You have not subscribed for any plan. Please Subscribe before proceeding.');
            }
        });
    }

    CheckPlanSelected() {
        this.paymentCheck.getTransactionData(this.uid, 'login').subscribe(paymentData => {
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
            this.routing();
        } else {
            this.isPayment = false;
            this.planService.plan.next(false);
            this.routing();
        }
    }

    routing() {
        if (this.isPayment) {
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/subscription']);
        }

        const url = this.router.url;

        if (url === '/subscriber/WISE') {
            this.router.navigate(['/subscriber/WISE']);
        }
        if (url === '/subscriber/WISER') {
            this.router.navigate(['/subscriber/WISER']);
        }
        if (url === '/subscriber/WISEST') {
            this.router.navigate(['/subscriber/WISEST']);
        }

        if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
            this.router.navigate(['/subscription']);
        }

        if (this.route === 'ROLE_ADVISOR') {
            this.router.navigate(['/advisor']);
        }
        if (this.admin === 'ROLE_ADMIN') {
            this.router.navigate(['/dashboard']);
        }
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                this.activeModal.dismiss('login success');

                this.getUserid();

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

    // toggle() {
    //     // let flag = false;
    //     this.flag = !this.flag;
    //     // this.main.toggleSide(this.flag);
    //     // this.sidebar.showSidebar();
    // }

    register() {
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
