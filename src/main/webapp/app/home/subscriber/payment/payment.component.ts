import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'app/home/subscriber/payment/payment.model';
import { PaymentService } from 'app/home/subscriber/payment/payment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-payment',
  templateUrl: './payment.component.html',
  styles: []
})
export class PaymentComponent implements OnInit {
  user: User = new User();
  amount: any;
  // element: any;
  sUrl = 'http://localhost:8080/api/success';
  fUrl = 'http://localhost:8080/Fail';
  public paymentDetail: any = [];

  @Input() offer;

  constructor(
    private paymentService: PaymentService,
    private http: HttpClient
  ) {}

  submitUser() {
    // console.log(this.user);
    this.user.sUrl = this.sUrl;
    this.user.fUrl = this.fUrl;
    this.paymentService.submitUser(this.user).subscribe(data => {
      // console.log('response of submit');
      this.paymentDetail.push(data);
    });
  }

  ngOnInit() {
    // console.log(this.offer);
    const paymoney = this.offer.payable;
    this.amount = paymoney.toString();
    this.user.amount = this.amount;
    this.user.productInfo = this.offer.plan;
  }
}
