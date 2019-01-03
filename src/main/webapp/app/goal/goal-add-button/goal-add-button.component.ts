import { FutureOptionService } from 'app/my-assets/future-option/futureoption.service';
import { PropertyService } from 'app/my-assets/property/property.service';
import { ChitFundService } from 'app/my-assets/chit-funds/chitfund.service';
import { CashService } from 'app/my-assets/cash/cash.service';
import { AlternateService } from 'app/my-assets/alternate-investment/alternateinvest.service';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { SavingSchemeService } from 'app/my-assets/saving-scheme/savingscheme.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, LoginService } from 'app/core';

@Component({
    selector: 'jhi-goal-add-button',
    templateUrl: './goal-add-button.component.html',
    styles: []
})
export class GoalAddButtonComponent implements OnInit {
    assettype: any;
    out: Object;
    user: any;
    uid: any;
    dialogRef;
    account2: any;
    onNoClick() {
        this.dialogRef.close();
    }

    constructor(
        private ActiveModal: NgbActiveModal,
        private modalService: NgbModal,
        public dialog: MatDialog,
        private account: AccountService,
        public stockService: StockService,
        public mutualfundService: MutualfundService,
        public savingSchemeService: SavingSchemeService,
        public alternateService: AlternateService,
        public cashService: CashService,
        public chitFundService: ChitFundService,
        public propertyService: PropertyService,
        public futureOptionService: FutureOptionService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.FetchId();
    }
    openDialog(): void {
        this.dialogRef = this.dialog.open(GoalAddButtonComponent, {
            width: '550px'
            // data: {name: this.name, animal: this.animal}
        });
        this.dialogRef.afterClosed().subscribe(result => {
            // this.animal = result;
        });
    }
    //   onNoClick(){
    //   this.dialogRef.close();
    // }
    getAsset() {
        if (this.assettype === 'stocks') {
            this.getStockById(this.uid);
        } else if (this.assettype === 'mutual') {
            this.getMutualFundByUid(this.uid);
        }
        // if (this.assettype='ChitFund') {
        //   this.getChitByuid(this.uid);
        // }
        // if (this.assettype ='FutureandOption') {
        //   this.getFAOByUid(this.uid);
        // }
    }
    sub() {}

    getStockById(uid) {
        this.stockService.getStockById(this.uid).subscribe(res => {
            this.out = res;
        });
        // this.getMutualFundByUid(this.uid1);
    }
    getMutualFundByUid(uid) {
        this.mutualfundService.getMutualFund(this.uid).subscribe(res => {
            this.out = res;
        });
    }
    getSavingSchemeUid(uid) {
        this.savingSchemeService.getSavingScheme(this.uid).subscribe(res => {
            this.out = res;
        });
        // this.getAltInvestment(this.uid3);
    }
    getCashDetailsByuid(uid) {
        this.cashService.getCashDetailsByuid(this.uid).subscribe(res => {
            this.out = res;
        });
        // this.getsavePropertyByuid(this.uid5);
    }
    getChitByuid(uid) {
        this.chitFundService.getChitByuid(this.uid).subscribe(res => {
            this.out = res;
        });
        // this.getFAOByUid(this.uid7)
    }
    getsavePropertyByuid(uid) {
        this.propertyService.getsavePropertyByuid(this.uid).subscribe(res => {
            this.out = res;
        });
    }
    getFAOByUid(uid) {
        this.futureOptionService.getFAOByUid(this.uid).subscribe(res => {
            this.out = res;
        });
        // this.getSavingSchemeUid(this.uid);
    }
    FetchId() {
        this.account2 = this.loginService.getCookie();
        if (this.account2) {
            this.uid = this.account2.id;
        }
    }
}
