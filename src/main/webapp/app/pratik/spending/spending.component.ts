import { LoginModalService, Principal, LoginService } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SpendingRouteGuardService } from 'app/pratik/common/spending-route-guard.service';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'app/pratik/common/can-deactivate-guard.service';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'jhi-spending',
    templateUrl: './spending.component.html',
    styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit, CanComponentDeactivate {
    resource: any;
    amount: any;
    expense;
    demoarr;
    i;
    closeResult: string;
    step = 0;
    uid;
    resource_react = new FormControl('');
    amount_react = new FormControl('');

    modalRef: NgbModalRef;
    // for accordian state
    panelUtilityState = false;
    panelHouseholdState = false;
    panelLoanState = false;
    panelInsState = false;
    panelHealthState = false;
    panelGeneralState = false;
    panelCreditState = false;
    panelTravelState = false;
    panelMiscState = false;
    panelLifeState = false;

    // for material dialog
    panelOpenState = false;
    animal: string;
    name: string;

    account: Account;
    globalflag: any;
    dataChanged: any;
    changesSaved: any;

    commonState: any;
    utilityState = false;
    houseState = false;
    loanState: boolean;
    insState: boolean;
    creditState: boolean;
    travelState: boolean;
    miscState: boolean;
    loginData: any;
    LoggedIn: any;

    constructor(
        private router: Router,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private routeGuard: SpendingRouteGuardService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.routeGuard.GuardSource.subscribe(flag => {
            this.dataChanged = flag;
        });
        this.routeGuard.accordion.subscribe(route => {
            this.commonState = route;
            this.panelState(this.commonState);
        });
        this.checkLogIn();
    }

    panelState(route) {
        if (route === 'utility') {
            this.utilityState = true;
            this.houseState = false;
            this.loanState = false;
            this.insState = false;
            this.creditState = false;
            this.travelState = false;
            this.miscState = false;
        } else if (route === 'house') {
            this.utilityState = false;
            this.houseState = true;
            this.loanState = false;
            this.insState = false;
            this.creditState = false;
            this.travelState = false;
            this.miscState = false;
        } else if (route === 'loan') {
            this.utilityState = false;
            this.houseState = false;
            this.loanState = true;
            this.insState = false;
            this.creditState = false;
            this.travelState = false;
            this.miscState = false;
        } else if (route === 'insurance') {
            this.utilityState = false;
            this.houseState = false;
            this.loanState = false;
            this.insState = true;
            this.creditState = false;
            this.travelState = false;
            this.miscState = false;
        } else if (route === 'credit') {
            this.utilityState = false;
            this.houseState = false;
            this.loanState = false;
            this.insState = false;
            this.creditState = true;
            this.travelState = false;
            this.miscState = false;
        } else if (route === 'travel') {
            this.utilityState = false;
            this.houseState = false;
            this.loanState = false;
            this.insState = false;
            this.creditState = false;
            this.travelState = true;
            this.miscState = false;
        } else if (route === 'misc') {
            this.utilityState = false;
            this.houseState = false;
            this.loanState = false;
            this.insState = false;
            this.creditState = false;
            this.travelState = false;
            this.miscState = true;
        }
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.dataChanged) {
            return confirm(
                'Do you want to leave this page Before changes saved ? ' +
                    '<Cancel> to cancel leaving and click Update to save changes or <OK> to leave page'
            );
        } else {
            return true;
        }
    }

    utility() {
        this.router.navigate(['spend/utility']);
    }
    household() {
        this.router.navigate(['spend/household']);
    }
    loan() {
        this.router.navigate(['spend/loan']);
    }
    health() {
        this.router.navigate(['spend/health']);
    }
    life() {
        this.router.navigate(['spend/life']);
    }
    general() {
        this.router.navigate(['spend/general']);
    }
    checkLogIn() {
        this.loginData = this.loginService.getCookie();
        if (this.loginData) {
            this.LoggedIn = true;
        } else {
            // this.notLogIn = false;
            this.router.navigate(['/']);
        }
    }
}
