import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/home/subscriber/payment/payment.model';
import { PaymentService } from 'app/home/subscriber/payment/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-payment',
    templateUrl: './payment.component.html',
    styles: []
})
export class PaymentComponent implements OnInit {
    user: User = new User();
    amount: any;
    disablePaymentButton = true;
    sUrl = 'https://148.72.206.127:8443/api/success';
    fUrl = 'https://148.72.206.127:8443/api/success';
    public paymentDetail: any = [];

    @Input() offer;
    plan: any;
    payable: number;
    oldAmount: number;

    constructor(private paymentService: PaymentService, private route: ActivatedRoute) {}

    submitUser() {
        this.user.sUrl = this.sUrl;
        this.user.fUrl = this.fUrl;
        this.paymentService.submitUser(this.user).subscribe(data => {
            this.paymentDetail.push(data);
            this.disablePaymentButton = false;
        });
    }

    backForEdit() {
        this.disablePaymentButton = true;
    }

    ngOnInit() {
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
