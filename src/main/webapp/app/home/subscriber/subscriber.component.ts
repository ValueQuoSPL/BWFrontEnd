import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone, AfterContentInit, DoCheck, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Account, LoginModalService, Principal, LoginService } from 'app/core';
import { PromoCodeModalService } from 'app/home/subscriber/promo-code/promo-code-modal.service';
import { PromoCodeService } from 'app/home/subscriber/promo-code';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserPlanService } from 'app/home/subscriber/userplan.service';
import { PromoCodeManageService } from 'app/admin';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { PlanService } from 'app/pratik/common/plan.service';

class Offer {
    payable;
    plan;
}

class UserPlan {
    id;
    uid;
    plan;
    paid;
    discount;
    promocode;
    applyDate;
    expiryDate;
}

@Component({
    selector: 'jhi-subscriber',
    templateUrl: './subscriber.component.html',
    styleUrls: ['subscriber.css']
})
export class SubscriberComponent implements OnInit {
    uid;
    account: any;
    modalRef: NgbModalRef;
    payment: boolean;
    applied = false;
    closeResult: string;
    clicked: boolean;
    promocode: any;
    promocodeError: boolean;
    offer: Offer = new Offer();
    user: UserPlan = new UserPlan();
    message;
    payable = 0;
    oldAmount;
    pay;
    plan;
    userPlan;
    promoCode;
    discount: number;
    dynamicPromo: any;

    isSubscribed = false;
    loggedIn = false;
    validity: number;
    fullAccess: boolean;

    constructor(
        private zone: NgZone,
        private router: Router,
        private principal: Principal,
        private route: ActivatedRoute,
        private subscriber: PlanService,
        public activeModal: NgbActiveModal,
        private loginService: LoginService,
        private eventManager: JhiEventManager,
        private userPlanService: UserPlanService,
        private promoCodeService: PromoCodeService,
        private loginModalService: LoginModalService,
        private promoCodeModalService: PromoCodeModalService,
        private commonservice: CommonSidebarService
    ) {}

    ngOnInit() {
        this.registerAuthenticationSuccess();

        this.loggedIn = false;

        this.account = this.loginService.getCookie();
        if (this.account) {
            this.uid = this.account.id;
            this.loggedIn = true;
        }

        this.commonservice.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
        });

        this.promoCodeService.currentMessage.subscribe(message => {
            this.dynamicPromo = message;
            this.discount = this.dynamicPromo.discount;
            if (this.discount > 0) {
                this.calculate(this.discount);
            }
        });

        const plan = this.route.snapshot.params['plan'];
        this.plan = plan;
        this.offer.plan = plan;

        if (this.plan === 'WISE') {
            this.payable = 999;
            this.oldAmount = this.payable;
            this.offer.payable = this.payable;
        } else if (this.plan === 'WISER') {
            this.payable = 1999;
            this.oldAmount = this.payable;
            this.offer.payable = this.payable;
        } else if (this.plan === 'WISEST') {
            this.payable = 3999;
            this.oldAmount = this.payable;
            this.offer.payable = this.payable;
        }
        this.get();
    }

    get() {
        this.userPlanService.GetUserPlan(this.uid).subscribe(response => {
            this.userPlan = response;
            if (this.userPlan.length !== 0) {
                this.isSubscribed = true;
                this.user.id = this.userPlan[0].id;
            } else {
                this.isSubscribed = false;
            }
        });
    }

    calculate(discount) {
        const oldAmount = this.payable;
        let pay = this.payable;
        let off = discount;
        off = off / 100;
        pay = Math.round(pay * off);
        this.pay = pay;
        this.payable = this.payable - pay;
        this.offer.payable = this.payable;

        if (this.payable !== oldAmount) {
            this.applied = true;
        } else {
            this.applied = false;
        }
    }

    goToPayment() {
        this.saveUserPlan();
        this.payment = true;
    }

    apply() {
        this.modalRef = this.promoCodeModalService.open();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
                this.loggedIn = true;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
    register() {
        this.router.navigate(['register']);
    }

    saveUserPlan() {
        this.fillUserPlanData();
        if (!this.isSubscribed) {
            this.userPlanService.SaveUserPlan(this.user).subscribe();
        } else {
            this.userPlanService.UpdateUserPlan(this.user).subscribe();
        }
    }

    fillUserPlanData() {
        this.user.uid = this.uid;
        this.user.applyDate = new Date();
        this.user.expiryDate = new Date();
        this.user.expiryDate.setFullYear(this.user.expiryDate.getFullYear() + 1);

        this.user.plan = null;
        this.user.discount = this.discount;
        this.user.paid = this.payable;
        this.user.promocode = this.dynamicPromo.promocode;
        this.subscriber.user.next(this.user);
    }
}
