import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal, LoginService } from 'app/core';
import { Credit } from 'app/pratik/spending/spending.model';
import { CreditService } from 'app/pratik/spending/spending.service';
import { DocumentComponent } from 'app/document/document.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'jhi-credit',
    templateUrl: './credit.component.html',
    styleUrls: ['../spending.component.css']
})
export class CreditComponent implements OnInit {
    uid;
    amount;
    expense;
    resource;
    nameField;
    editField;
    closeResult;
    totalUtility;
    loadUtility: boolean;
    dataChanged: boolean;
    changesSaved: boolean;
    isCreditData: boolean;
    UtilityArray: any = [];
    tempUtilityArray: any = [];
    dynamicCredit: any = [];
    tempDynamicCredit: any = [];
    credit: Credit = new Credit();
    _credit: any = [];

    CardTypeArray = [{ name: 'Gold' }, { name: 'Platinum' }, { name: 'Silver' }, { name: 'Titanium ' }];
    account: any;
    constructor(
        private creditService: CreditService,
        private principal: Principal,
        private modalService: NgbModal,
        private accountService: AccountService,
        private loginService: LoginService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.getUserid();
    }

    getUserid() {
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.uid = this.account.id;
        }
    }

    onGetCredit(): void {
        this.creditService.GetCredit(this.uid).subscribe((response: any[]) => {
            this.dynamicCredit = response;
            if (this.dynamicCredit.length === 0) {
                this.isCreditData = false;
            } else {
                this.isCreditData = true;
            }
        });
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';

        this.credit.balance = '';
        this.credit.balance = '';
        this.credit.issuer = '';
        this.credit.limit = '';
        this.credit.monthly_pay = '';
        this.credit.monthly_usage = '';
        this.credit.roi = '';
        this.credit.type = '';
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            this.clear();
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            this.clear();
            return 'by clicking on a backdrop';
        } else {
            this.clear();
            return `with: ${reason}`;
        }
    }

    // credit card
    openCredit(id, creditModal) {
        this.editCredit(id);
        this.modalService.open(creditModal, { ariaLabelledBy: 'creditModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.fillCredit(id);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }

    editCredit(id) {
        this._credit = this.dynamicCredit;
        for (let i = 0; i < this._credit.length; i++) {
            if (this._credit[i].id === id) {
                (this.credit.id = this._credit[i].id), (this.credit.balance = this._credit[i].balance);
                this.credit.issuer = this._credit[i].bank;
                this.credit.roi = this._credit[i].roi;
                this.credit.type = this._credit[i].type;
                this.credit.limit = this._credit[i].lt;
                this.credit.monthly_pay = this._credit[i].pay;
                this.credit.monthly_usage = this._credit[i].usage;
            }
        }
    }

    fillCredit(id) {
        for (let i = 0; i < this.dynamicCredit.length; i++) {
            if (this.dynamicCredit[i].id === id) {
                this.dynamicCredit[i].id = this.credit.id;
                this.dynamicCredit[i].bank = this.credit.issuer;
                this.dynamicCredit[i].balance = this.credit.balance;
                this.dynamicCredit[i].type = this.credit.type;
                this.dynamicCredit[i].roi = this.credit.roi;
                this.dynamicCredit[i].lt = this.credit.limit;
                this.dynamicCredit[i].pay = this.credit.monthly_pay;
                this.dynamicCredit[i].usage = this.credit.monthly_usage;
            }
        }
        this.updateCredit(id);
    }
    // update credit
    updateCredit(id) {
        this.creditService.update(this.dynamicCredit[id], this.uid).subscribe(data => {
            this.clear();
        });
    }

    // for Add button
    opnCredit(creditModal) {
        this.clear();

        // this.editCredit(id);
        this.modalService.open(creditModal, { ariaLabelledBy: 'creditModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddCredit();
            },
            reason => {
                this.clear();
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    AddCredit() {
        this.tempDynamicCredit.pop();
        this.tempDynamicCredit.push({
            limit: this.credit.limit,
            monthly_usage: this.credit.monthly_usage,
            monthly_pay: this.credit.monthly_pay,
            type: this.credit.type,
            bank: this.credit.issuer,
            roi: this.credit.roi,
            balance: this.credit.balance,
            userid: this.uid
        });
        this.onCreditSave();
        this.clear();
    }

    onCreditSave(): void {
        this.credit.userid = this.uid;
        this.isCreditData = true;
        this.credit.creditModelArray = this.tempDynamicCredit;
        this.creditService.PutCredit(this.credit.creditModelArray).subscribe(() => {
            this.clear();
            this.onGetCredit();
        });
    }
    RemoveCredit(index, id) {
        this.creditService.DeleteCredit(id).subscribe(responce => {});
        this.dynamicCredit.splice(index, 1);
    }

    openDialog(id, type): void {
        console.log(type);
        const dialogRef = this.dialog.open(DocumentComponent, {
            data: { tid: id, Type: type }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed');
            //   this.animal = result;
        });
    }
}
