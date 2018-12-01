import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/home/subscriber/payment/payment.model';
import { PaymentService } from 'app/home/subscriber/payment/payment.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService, Principal } from 'app/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'jhi-payment',
    templateUrl: './payment.component.html',
    styles: []
})
export class PaymentComponent implements OnInit {
    user: User = new User();
    amount: any;
    disablePaymentButton1 = false;
    disablePaymentButton2 = true;
    sUrl = 'https://www.buckswise.com:8443/api/success';
    //sUrl = 'http://www.buckswise.com:8080/api/success';
    fUrl = 'https://www.buckswise.com:8443/api/success';
    //fUrl = 'http://www.buckswise.com:8080/api/success';
    public paymentDetail: any = [];

    @Input() offer;
    plan: any;
    payable: number;
    oldAmount: number;
    settingsAccount: any;

    constructor(
        private paymentService: PaymentService,
        private route: ActivatedRoute,
        private account: AccountService,
        private principal: Principal
    ) {}

    submitUser() {
        this.user.sUrl = this.sUrl;
        this.user.fUrl = this.fUrl;
        this.paymentService.submitUser(this.user).subscribe(data => {
            this.paymentDetail = data;
            console.log(this.paymentDetail);
        });
        this.disablePaymentButton1 = true;
        this.disablePaymentButton2 = false;
        this.AddUserMobile();
    }

    goBack() {
        this.disablePaymentButton2 = true;
        this.disablePaymentButton1 = false;
    }

    AddUserMobile() {
        console.log('calling account');

        this.settingsAccount.mobile = this.user.phone;
        this.account.save(this.settingsAccount).subscribe(() => {
            this.principal.identity(true).then(account => {
                this.settingsAccount = this.copyAccount(account);
            });
        });
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            mobile: account.mobile,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    ngOnInit() {
        console.log('calling account');

        this.principal.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
        });

        const plan = this.route.snapshot.params['plan'];
        this.plan = plan;
        this.offer.plan = plan;

        if (this.plan === 'WISE') {
            this.payable = 999;
        } else if (this.plan === 'WISER') {
            this.payable = 1999;
        } else if (this.plan === 'WISEST') {
            this.payable = 3999;
        }

        const paymoney = this.offer.payable;
        this.amount = paymoney.toString();
        this.user.amount = this.amount;
        this.user.productInfo = this.offer.plan;
    }
}
