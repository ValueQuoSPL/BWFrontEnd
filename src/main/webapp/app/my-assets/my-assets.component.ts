import { log } from 'util';
import { Component } from '@angular/core';
import { LoginModalService, Principal } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-myassets',
    templateUrl: './my-assets.component.html',
    styleUrls: []
})
export class MyAssetsComponent {
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
    constructor(private principal: Principal, private loginModalService: LoginModalService) {}

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    login() {
        this.modalRef = this.loginModalService.open();
    }
}
