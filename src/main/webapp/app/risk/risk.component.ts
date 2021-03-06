import { LoginService } from 'app/core/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-risk',
    templateUrl: './risk.component.html'
})
export class RiskComponent implements OnInit {
    account: Account;
    step = 0;
    modalRef: NgbModalRef;
    panelLifeState = false;
    panelMedicleState = false;
    loginData: any;
    LoggedIn: any;

    constructor(
        private principal: Principal,
        private loginService: LoginService,
        private loginModalService: LoginModalService,
        private router: Router
    ) {}

    ngOnInit() {
        console.log('calling account');

        this.principal.identity().then(account => {
            this.account = account;
        });
        this.checkLogIn();
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    gotoLife() {
        this.router.navigate(['life']);
    }
    gotoMedical() {
        this.router.navigate(['medical']);
    }
    checkLogIn() {
        this.loginData = this.loginService.getCookie();
        if (this.loginData) {
            this.LoggedIn = true;
        } else {
            this.router.navigate(['/']);
        }
    }
}
