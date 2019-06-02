import { Router } from '@angular/router';
import { LoginService } from 'app/core/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-tax',
    templateUrl: './tax.component.html',
    styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
    modalRef: NgbModalRef;
    panelGrossState = false;
    panelEightyCState = false;
    panelEightyDState = false;
    panelHomeState = false;
    panelOtherState = false;
    loginData: any;
    LoggedIn: any;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private loginService: LoginService,
        private router: Router
    ) {}

    ngOnInit() {
        this.checkLogIn();
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    login() {
        this.modalRef = this.loginModalService.open();
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
