import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { PromoCodeService } from './promo-code.service';
import { BehaviorSubject } from 'rxjs';
import { PromoCodeManageService } from 'app/admin';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

class PromoCodeModel {
  id;
  plan;
  promocode;
  expiryDate;
  discount;
}

@Component({
  selector: 'jhi-promo-code',
  templateUrl: './promo-code.html'
})
export class PromoCodeComponent implements AfterViewInit {
  promocodeError: boolean;
  promocode: string;
  credentials: any;
  clicked;
  dynamicPromo: any = [];
  currentDate = new Date();
  expired: boolean;
  valid: boolean;
  discount: number;
  amount: number;

  constructor(
    private promoCodeService: PromoCodeService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    public activeModal: NgbActiveModal,
    private managePromoService: PromoCodeManageService,
    private alertService: JhiAlertService
  ) {
    this.credentials = {};
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement.querySelector('#promocode'),
      'focus',
      []
    );
    this.loadAll();
  }

  cancel() {
    this.credentials = null;
    this.activeModal.dismiss('cancel');
  }

  apply() {
    this.promocodeError = false;

    this.clicked = true;
    const response = this.validate();

    if (response) {
      this.promocodeError = true;
      this.activeModal.dismiss('promocode success');
      this.sendMessage();
    } else {
      this.promocode = null;
      this.promocodeError = true;
    }
  }

  validate() {
    let found = 0;
    for (let index = 0; index < this.dynamicPromo.length; index++) {
      const element = this.dynamicPromo[index];

      if (element.promocode === this.promocode) {
        this.valid = true;

        if (element.expiryDate < this.currentDate.toJSON()) {
          console.log('expired');
          this.valid = true;
          this.expired = true;
        } else {
          console.log('not expired');
          this.discount = element.discount;
          this.expired = false;
          found = 1;
        }
        break;
      } else {
        this.valid = false;
        this.expired = false;
        console.log('not found');
        console.log('valid', this.valid);
        found = 0;
      }
    }
    this.currentDate = new Date();

    if (found === 1) {
      this.valid = true;
      return true;
    } else {
      return false;
    }
  }

  sendMessage() {
    this.promoCodeService.changeMessage(this.discount);
  }

  loadAll() {
    this.managePromoService
      .get()
      .subscribe(
        (res: HttpResponse<PromoCodeModel[]>) => this.onSuccess(res.body),
        (res: HttpResponse<any>) => this.onError(res.body)
      );
  }

  private onSuccess(data) {
    this.dynamicPromo = data;
    console.log(this.dynamicPromo);
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }
}
