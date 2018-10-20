import { AccountService, LoginModalService, Principal } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { SpendingRouteGuardService } from '../common/spending-route-guard.service';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'jhi-spending',
    templateUrl: './spending.component.html',
    styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {
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

    // for material dialog
    panelOpenState = false;
    animal: string;
    name: string;

    account: Account;
    globalflag: any;
    dataChanged: any;
    changesSaved: any;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private routeGuard: SpendingRouteGuardService
    ) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.routeGuard.GuardSource.subscribe(flag => {
            this.dataChanged = flag;
        });
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
}
