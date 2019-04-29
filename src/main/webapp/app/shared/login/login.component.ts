import { Component, AfterViewInit, Renderer, ElementRef, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { SuccessService } from 'app/success/success.service';
import { PlanService } from 'app/pratik/common/plan.service';
import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { Principal } from 'app/core';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { AppointmentManageService } from 'app/admin/appointment-manage/appointment-manage.service';
import { CookieService } from 'ngx-cookie';
import { FamilyprofileService } from 'app/family/familyprofile/familyprofile.service';

class Expire {
    id;
    uid;
    status;
}
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
    trialData: any = [];
    transac: any = [];
    date: any;
    expire: Expire = new Expire();
    isExpired: boolean;
    // id: any;

    // account1: any;
    // parentData: any;
    // parentData1: any;
    // parentid: any;
    constructor(
        private stateStorageService: StateStorageService,
        private renderer: Renderer,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private elementRef: ElementRef,
        private router: Router,
        public activeModal: NgbActiveModal,
        private paymentCheck: SuccessService,
        private planService: PlanService,
        private principal: Principal,
        private userPlanService: UserPlanService,
        private commonSidebarService: CommonSidebarService,
        private appointment: AppointmentManageService,
        private _cookieService: CookieService,
        private familyprofileService: FamilyprofileService
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
            this.checkExpiryTrial();
            this.CheckPlanSelected();
            // this.checkExpiryDate();
        }
    }

    checkExpiryTrial() {
        const formate = new Date().getTime();
        this.userPlanService.GetUserPlan(this.uid).subscribe(data => {
            this.trialData = data;
            this.trialData.forEach(element => {
                this.date = new Date(element.expiryDate).getTime();
                if (formate > this.date) {
                    this.planService.isPaid.next(false);
                    // start it publish that plan is Expired (check main, sidebar component)
                    this.commonSidebarService.Expiry.next(false);
                    this.isPayment = false;
                    this.isExpired = true;
                    // end here
                    this.router.navigate(['/subscription']);

                    // this.paymentCheck.getTransactionData(this.uid, 'login').subscribe(result => {
                    //     this.transac = result;
                    //     this.transac.forEach(ele => {
                    //         this.expire.id = ele.id;
                    //         this.expire.uid = ele.userid;
                    //         this.expire.status = 'expire_plan';
                    //     });
                    //     this.paymentCheck.saveTransaction(this.expire).subscribe();
                    //     this.userPlanService.data.next('expire');
                    //     // this.planService.isExpire.next(true);
                    //     this.router.navigate(['/subscription']);
                    // });
                }
            });
            this.trialData = data;
            if (this.trialData[0].uid === this.uid) {
                this.planService.isTrial.next(false);
            }
        });
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
                    if (this.isPayment) {
                        this.router.navigate(['/dashboard']);
                    }
                }
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

    // checking payment of user and make payment flag true else false
    CheckPayment() {
        let status;
        this.PaymentArray.forEach(element => {
            status = element.status;
        });
        if (status === 'success') {
            this.isPayment = true;
            // // console.log('payment', this.isPayment);
            this.planService.plan.next(true);
            this.routing();
        } else {
            this.isPayment = false;
            this.planService.plan.next(false);
            this.routing();
        }
    }
    // if user click on plan after login it redirect to that plan only
    routing() {
        // check payment if it success get into if condition
        if (this.isPayment) {
            // if not expire then redirect to dashboard
            if (!this.isExpired) {
                this.router.navigate(['/dashboard']);
            }
        } else {
            this.router.navigate(['/subscription']);
        }

        // take current url of page in browser
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
            if (this.isPayment) {
                // if not expire then redirect to dashboard
                if (!this.isExpired) {
                    // console.log('call dash');
                    this.router.navigate(['/dashboard']);
                }
            }
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
                // for cookies data swap
                // const account = this.loginService.getCookie();
                // this.id = account.id

                // this.familyprofileService.getFamilyProfile().subscribe(res => {
                //     console.log('below family service', res)
                //     this.parentData = res;
                //     this.parentid = 4;
                //     this.familyprofileService.getParentData(this.parentid).subscribe(resp => {
                //         this.parentData1 = resp;
                //         console.log('under getParentData ', this.parentData1);
                //         this.loginService.putCookie('1', this.parentData1);
                //         const account1 = this.loginService.getCookie();
                //         console.log(account1);
                //     });
                // });

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
