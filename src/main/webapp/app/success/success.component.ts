import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SuccessService } from 'app/success/success.service';
import { AccountService, Principal, LoginModalService, LoginService } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';
import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { PromoCodeService } from 'app/home/subscriber/promo-code';
import { PlanService } from 'app/pratik/common/plan.service';

class UserPlan {
    uid;
    plan;
    paid;
    discount;
    promocode;
    applyDate;
    expiryDate;
}

@Component({
    selector: 'jhi-success',
    templateUrl: './success.component.html',
    styles: []
})
export class SuccessComponent implements OnInit, AfterViewInit {
    last: any;
    result: any = [];
    uid: any;
    userid: any;
    account: Account;
    user: UserPlan = new UserPlan();
    isSubscribed = false;
    userPlan;
    promoCode;
    discount: number;
    fullAccess: boolean;
    usernew: any;

    constructor(
        private successService: SuccessService,
        private accountService: AccountService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private router: Router,
        private userPlanService: UserPlanService,
        private promoCodeService: PromoCodeService,
        private planService: PlanService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });

        this.planService.user.subscribe(user => {
            this.usernew = user;
        });

        this.registerAuthenticationSuccess();
    }
    ngAfterViewInit() {}

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
                this.userid = this.account.id;
                console.log('registerAuthenticationSuccess()', this.userid);
            });
        });
        this.getUserid();
    }

    getUserid() {
        return this.accountService
            .get()
            .toPromise()
            .then(response => {
                const account = response.body;
                if (account) {
                    this.uid = account.id;
                    console.log('getUserid()', this.uid);
                    this.successService.getTransactionData(this.uid, 'success').subscribe(data => {
                        this.result = data;
                        this.last = this.result.pop();

                        if (this.last.status === 'success') {
                            this.updateUserPlan();
                            this.planService.isPaid.next(true);
                        }
                    });
                    // this.get();
                } else {
                }
            })
            .catch(err => {});
    }

    updateUserPlan() {
        this.userPlanService.UpdateUserPlan(this.usernew).subscribe();
    }

    GoDashBoard() {
        this.router.navigate(['dashboard']);
    }

    // get() {
    //     this.userPlanService.GetUserPlan(this.uid).subscribe(response => {
    //         this.userPlan = response;
    //         if (this.userPlan.length !== 0) {
    //             this.isSubscribed = true;
    //         } else {
    //             this.isSubscribed = false;
    //         }
    //     });
    // }
}
