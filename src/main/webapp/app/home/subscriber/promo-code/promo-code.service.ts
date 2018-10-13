import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PromoCodeService {
  private messageSource = new BehaviorSubject(0);
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  apply(promocode) {
    // console.log('applying Promo-Code', promocode);
    if (promocode === 'buckswise') {
      return true;
    } else {
      return false;
    }
  }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }
}
