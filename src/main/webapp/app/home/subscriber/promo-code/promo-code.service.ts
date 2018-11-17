import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PromoCodeService {
    private messageSource = new BehaviorSubject(0);
    currentMessage = this.messageSource.asObservable();

    constructor() {}

    apply(promocode) {
        if (promocode === 'buckswise') {
            return true;
        } else {
            return false;
        }
    }

    changeMessage(message) {
        this.messageSource.next(message);
    }
}
