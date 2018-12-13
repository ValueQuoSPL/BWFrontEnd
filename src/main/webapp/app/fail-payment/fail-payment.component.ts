import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';
import { Principal } from 'app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-fail-payment',
    templateUrl: './fail-payment.component.html',
    styles: []
})
export class FailPaymentComponent implements OnInit {
    account: any;
    userid: any;

    constructor(private eventManager: JhiEventManager, private principal: Principal, private route: Router) {}

    ngOnInit() {
        this.registerAuthenticationFail();
    }

    registerAuthenticationFail() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
                this.userid = this.account.id;
            });
        });
    }
    gotoSubscription() {
        this.route.navigate(['subscription']);
    }
}
