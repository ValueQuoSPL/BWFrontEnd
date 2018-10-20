import { log } from 'util';
// import { StockComponent } from 'app/my-assets/stocks/stocks.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
import { AlternateService } from './alternate-investment/alternateinvest.service';
import { CashService } from './cash/cash.service';
import { ChitFundService } from './chit-funds/chitfund.service';
import { PropertyService } from './property/property.service';
import { FutureOptionService } from './future-option/futureoption.service';
import { SavingSchemeService } from './saving-scheme/savingscheme.service';
import { AccountService, LoginModalService, Principal } from 'app/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-myassets',
    templateUrl: './my-assets.component.html',
    styleUrls: []
})
export class MyAssetsComponent implements OnInit {
    uid: any;
    user: any;
    stockResponse: any = [];
    mutualResponse: any = [];
    totalshareprice: any;
    totalmutual: any;
    SavingResponse: any = [];
    ChitResponse: any = [];
    totalSaving: number;
    alternateInvestResponse: any = [];
    totalAltenateInvest: number;
    CashResponse: any = [];
    totalCash: any;
    propertyResponse: any = [];
    totalProperty: number;
    totalChitFund: any;
    futureOptionResponse: any = [];
    totalFutureOption: number;
    modalRef: NgbModalRef;
    constructor(
        private stockService: StockService,
        private mutualfundService: MutualfundService,
        private alternateservice: AlternateService,
        private cashservice: CashService,
        private chitfundservice: ChitFundService,
        private propertyservice: PropertyService,
        private futureoptionservice: FutureOptionService,
        private savingSchemeService: SavingSchemeService,
        private account: AccountService,
        private principal: Principal,
        private loginModalService: LoginModalService
    ) {}

    ngOnInit() {
        this.FetchId();
    }

    FetchId(): Promise<any> {
        return this.account
            .get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                console.log('user info of userid', this.user);
                this.uid = this.user.id;
                this.stock();
            });
    }
    stock() {
        this.stockService.getStockById(this.uid).subscribe(res => {
            console.log('this is responce of stock in myasset', res);
            this.stockResponse = res;
            this.totalshareprice = 0;
            for (let j = 0; j < this.stockResponse.length; j++) {
                this.totalshareprice = +this.totalshareprice + +this.stockResponse[j].share_price;
                console.log('total share price is im my asset', this.totalshareprice);
            }
            this.mutual();
        });
    }
    mutual() {
        this.mutualfundService.getMutualFund(this.uid).subscribe(res => {
            this.mutualResponse = res;
            console.log('responce of getMutualFundByUid service', this.mutualResponse);
            this.totalmutual = 0;
            for (let j = 0; j < this.mutualResponse.length; j++) {
                this.totalmutual = +this.totalmutual + +this.mutualResponse[j].currentvalue;
                console.log('total share price is im my asset', this.totalmutual);
            }
            this.Savingscheme();
        });
    }
    Savingscheme() {
        this.savingSchemeService.getSavingScheme(this.uid).subscribe(res => {
            console.log('this is responce of SavingScheme', res);
            this.SavingResponse = res;
            this.totalSaving = 0;
            for (let j = 0; j < this.SavingResponse.length; j++) {
                this.totalSaving = +this.totalSaving + +this.SavingResponse[j].fund_value;
                console.log('total share price is im my asset', this.totalSaving);
            }
            this.AlternateInvest();
        });
    }
    AlternateInvest() {
        this.alternateservice.getAltInvestmentByuid(this.uid).subscribe(res => {
            console.log('this is responce of getAltInvestmentByuid', res);
            this.alternateInvestResponse = res;
            console.log('responce of getMutualFundByUid service', this.alternateInvestResponse);
            this.totalAltenateInvest = 0;
            for (let j = 0; j < this.alternateInvestResponse.length; j++) {
                this.totalAltenateInvest = +this.totalAltenateInvest + +this.alternateInvestResponse[j].market_value;
                console.log('total share price is im my asset', this.totalmutual);
            }
            this.cash();
        });
    }
    cash() {
        this.cashservice.getCashDetailsByuid(this.uid).subscribe(res => {
            console.log('this is responce of getCashDetailsByuid', res);
            this.CashResponse = res;
            console.log('responce of getMutualFundByUid service', this.CashResponse);
            this.totalCash = 0;
            for (let j = 0; j < this.CashResponse.length; j++) {
                this.totalCash = +this.totalCash + +this.CashResponse[j].amount;
                console.log('total share price is im my asset', this.totalCash);
            }
            this.property();
        });
    }
    property() {
        this.propertyservice.getsavePropertyByuid(this.uid).subscribe(res => {
            console.log('this is responce of getsavePropertyByuid', res);
            this.propertyResponse = res;
            console.log('responce of getMutualFundByUid service', this.propertyResponse);
            this.totalProperty = 0;
            for (let j = 0; j < this.propertyResponse.length; j++) {
                this.totalProperty = +this.totalProperty + +this.propertyResponse[j].current_m_value;
                console.log('total share price is im my asset', this.totalProperty);
            }
            this.ChitFund();
        });
    }
    ChitFund() {
        this.chitfundservice.getChitByuid(this.uid).subscribe(res => {
            this.ChitResponse = res;
            console.log('responce of getMutualFundByUid service', this.ChitResponse);
            this.totalChitFund = 0;
            for (let j = 0; j < this.ChitResponse.length; j++) {
                this.totalChitFund = +this.totalChitFund + +this.ChitResponse[j].current_value;
                console.log('total share price is im my asset', this.totalChitFund);
            }
            this.futureOption();
        });
    }
    futureOption() {
        this.futureoptionservice.getFAOByUid(this.uid).subscribe(res => {
            this.futureOptionResponse = res;
            console.log('responce of getMutualFundByUid service', this.futureOptionResponse);
            this.totalFutureOption = 0;
            for (let j = 0; j < this.futureOptionResponse.length; j++) {
                this.totalFutureOption = +this.totalFutureOption + +this.futureOptionResponse[j].no_of_contracts;
                console.log('total share price is im my asset', this.totalFutureOption);
            }
        });
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    login() {
        this.modalRef = this.loginModalService.open();
    }
}
