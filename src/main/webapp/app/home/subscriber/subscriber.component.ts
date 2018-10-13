import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Account, LoginModalService, Principal } from 'app/core';
import { PromoCodeModalService } from 'app/home/subscriber/promo-code/promo-code-modal.service';
import { PromoCodeService } from 'app/home/subscriber/promo-code';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

class Offer {
  payable;
  plan;
}

@Component({
  selector: 'jhi-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['subscriber.css']
})
export class SubscriberComponent implements OnInit {
  account: Account;
  modalRef: NgbModalRef;
  payment: boolean;
  applied = false;
  closeResult: string;
  clicked: boolean;
  promocode: any;
  promocodeError: boolean;
  offer: Offer = new Offer();
  message;
  payable = 0;
  oldAmount;
  pay;
  plan;

  constructor(
    private zone: NgZone,
    private router: Router,
    private principal: Principal,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager,
    private promoCodeService: PromoCodeService,
    private loginModalService: LoginModalService,
    private promoCodeModalService: PromoCodeModalService
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
    this.promoCodeService.currentMessage.subscribe(message =>
      this.zone.run(() => {
        // <== added
        this.calculate(message);
        console.log('change detection');
      })
    );
    const plan = this.route.snapshot.params['plan'];
    this.plan = plan;
    this.offer.plan = plan;

    if (this.plan === 'FREE') {
      this.payable = 0;
      this.oldAmount = this.payable;
      this.offer.payable = this.payable;
    } else if (this.plan === 'WISER') {
      this.payable = 1000;
      this.oldAmount = this.payable;
      this.offer.payable = this.payable;
    } else if (this.plan === 'WISEST') {
      this.payable = 2000;
      this.oldAmount = this.payable;
      this.offer.payable = this.payable;
    }

    console.log('init', this.applied);
  }

  calculate(discount) {
    let pay = this.payable;
    const oldAmount = this.payable;
    let off = discount;
    off = off / 100;
    pay = pay * off;
    this.pay = pay;
    this.payable = this.payable - pay;
    this.offer.payable = this.payable;

    if (this.payable !== oldAmount) {
      console.log('payable', this.payable);
      console.log('old amount', oldAmount);

      this.applied = true;
      console.log('calculate changed', this.applied);
    } else {
      this.applied = false;
      console.log('calculate not changed', this.applied);
    }
  }

  goToPayment() {
    this.payment = true;
  }

  apply() {
    this.modalRef = this.promoCodeModalService.open();
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.principal.identity().then(account => {
        this.account = account;
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
}
