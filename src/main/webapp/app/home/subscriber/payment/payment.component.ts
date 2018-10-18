import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/home/subscriber/payment/payment.model';
import { PaymentService } from 'app/home/subscriber/payment/payment.service';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styles: []
})
export class PaymentComponent implements OnInit {
  user: User = new User();
  amount: any;
  disablePaymentButton = true;
  sUrl = 'http://localhost:8080/api/success';
  fUrl = 'http://localhost:8080/api/success';
  public paymentDetail: any = [];

  @Input() offer;

  constructor(
    private paymentService: PaymentService,
  ) {}

  submitUser() {
    this.user.sUrl = this.sUrl;
    this.user.fUrl = this.fUrl;
    this.paymentService.submitUser(this.user).subscribe(data => {
      this.paymentDetail.push(data);
      this.disablePaymentButton = false;
    });
  }

  ngOnInit() {
    const paymoney = this.offer.payable;
    this.amount = paymoney.toString();
    this.user.amount = this.amount;
    this.user.productInfo = this.offer.plan;
  }
}
