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
    parentData: any;
    parentid: any;
    parentData1: any;
    id: any;

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
        private familyprofileService: FamilyprofileService
    ) {
        this.credentials = {};
    }

    ngOnInit() {
        console.log('login oninit');
        this.admin = null;

        // this.principal.getAuthenticationState().subscribe(identity => {
        //     console.log('oninit getAuthenticationState()');
        //     if (identity) {
        //         console.log('oninit identity', identity);
        //         this.route = identity.authorities[0];
        //         console.log('oninit route', this.route);
        //         if (identity.authorities[1]) {
        //             this.admin = identity.authorities[1];
        //         } else {
        //             this.admin = null;
        //         }
        // this.routing();
    }
    // });
    // }

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
        this.id = this.account.id;
        console.log('login getUserid');
        console.log('in checkParentSvc.....');
        this.familyprofileService.checkParentSvc(this.id).subscribe(res => {
            this.parentData = res;
            console.log('in checkParent() parent data is', this.parentData);
            this.parentid = this.parentData.uid;
            console.log(' checkParent() parentid', this.parentid);
        });
        console.log('out checkParentSvc.....');
        console.log('in getParentData().....');
        this.familyprofileService.getParentData(this.parentid).subscribe(resp => {
            this.parentData1 = resp;
            console.log('in getdata() ParentData1 ', this.parentData1);
            this.commonSidebarService.account.next(this.parentData1);
            this.loginService.deleteCookie('1');
            console.log('after delete cookie value ', this.loginService.getCookie());
            this.loginService.putCookie('1', this.parentData1);
            console.log('cookie value ', this.loginService.getCookie());
            // this.getCookie();
        });
        console.log('out getParentData().....');
        this.account = this.loginService.getCookie();
        console.log(' in userid account data', this.account);
        if (this.account) {
            this.uid = this.account.id;
            this.checkExpiryTrial();
            this.CheckPlanSelected();
            this.checkExpiryDate();
        }
    }
    checkParent() {
        console.log('in checkParent() id is', this.id);
        this.account = this.loginService.getCookie();
        this.id = this.account.id;
        this.familyprofileService.checkParentSvc(this.id).subscribe(res => {
            this.parentData = res;
            console.log('in checkParent() parent data is', this.parentData);
            this.parentid = this.parentData.uid;
            console.log(' checkParent() parentid', this.parentid);
        });
        this.getdata();
    }
    getdata() {
        console.log('in getdata() parentid', this.parentid);
        this.familyprofileService.getParentData(this.parentid).subscribe(resp => {
            this.parentData1 = resp;
            console.log('in getdata() ParentData1 ', this.parentData1);
            this.commonSidebarService.account.next(this.parentData1);
            this.loginService.putCookie('1', this.parentData1);
            console.log('cookie value ', this.loginService.getCookie());
            // this.getCookie();
        });
        this.getUserid();
    }

    checkExpiryTrial() {
        console.log(' 1...in  checkExpiryTrial()');
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
        console.log('in 3....checkExpiryDate()');
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
        console.log('out 3....checkExpiryDate()');
    }

    CheckPlanSelected() {
        console.log(' 2...in  CheckPlanSelected()');
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
        console.log(' 2...out  CheckPlanSelected()');
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
        console.log('login()');
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                console.log('login() then');
                this.authenticationError = false;
                this.activeModal.dismiss('login success');

                this.checkParent();
                this.getUserid();

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                console.log('redirect is ', redirect);
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
