import { Component, AfterViewInit, Renderer, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { PromoCodeService } from './promo-code.service';
import { BehaviorSubject } from 'rxjs';
import { PromoCodeManageService } from 'app/admin';
import { JhiAlertService } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

class PromoCodeModel {
    id;
    plan;
    promocode;
    expiryDate: Date;
    discount: number;
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
    promoModel: PromoCodeModel = new PromoCodeModel();

    dbDate: any;
    nowDate: any;

    constructor(
        private promoCodeService: PromoCodeService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        public activeModal: NgbActiveModal,
        private managePromoService: PromoCodeManageService,
        private alertService: JhiAlertService,
        private cd: ChangeDetectorRef
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#promocode'), 'focus', []);
        this.loadAll();
        this.cd.detectChanges();
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
                this.promoModel.id = element.id;
                this.promoModel.plan = element.plan;
                this.promoModel.discount = +element.discount;
                this.promoModel.expiryDate = element.expiryDate;
                this.promoModel.promocode = element.promocode;

                const db = new Date(element.expiryDate);
                const d = db.getDate();
                const m = db.getMonth();
                const y = db.getFullYear();
                this.dbDate = new Date(y, m, d);

                const dd = this.currentDate.getDate();
                const mm = this.currentDate.getMonth();
                const yy = this.currentDate.getFullYear();
                this.nowDate = new Date(yy, mm, dd);

                if (this.dbDate >= this.nowDate) {
                    this.discount = element.discount;
                    this.expired = false;
                    found = 1;
                } else {
                    this.valid = true;
                    this.expired = true;
                }
                break;
            } else {
                this.valid = false;
                this.expired = false;

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
        this.promoCodeService.changeMessage(this.promoModel);
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
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
