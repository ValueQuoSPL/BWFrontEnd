import { LoginService } from 'app/core/login/login.service';
import { Component, OnInit } from '@angular/core';
import { LoginModalService, Principal } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-myassets',
    templateUrl: './my-assets.component.html',
    styleUrls: []
})
export class MyAssetsComponent implements OnInit {
    modalRef: NgbModalRef;
    panelOpenState = false;
    panelStockState = false;
    panelMutualState = false;
    panelSavingState = false;
    panelAlterState = false;
    panelCashState = false;
    panelPropertyState = false;
    panelChitState = false;
    panelFutureState = false;
    commonState: any;
    account2: any;
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
        this.account2 = this.loginService.getCookie();
        if (this.account2) {
            this.LoggedIn = true;
        } else {
            // this.notLogIn = false;
            this.router.navigate(['/']);
        }
    }
}
