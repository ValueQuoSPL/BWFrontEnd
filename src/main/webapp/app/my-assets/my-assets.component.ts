import { log } from 'util';
// import { StockComponent } from 'app/my-assets/stocks/stocks.component';
import { Component, ViewChild, OnInit } from '@angular/core';
// import { StockService } from 'app/my-assets/stocks/stocks.service';
// import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
// import { AlternateService } from 'app/my-assets/alternate-investment/alternateinvest.service';
// import { CashService } from 'app/my-assets/cash/cash.service';
// import { ChitFundService } from 'app/my-assets/chit-funds/chitfund.service';
// import { PropertyService } from 'app/my-assets/property/property.service';
// import { FutureOptionService } from 'app/my-assets/future-option/futureoption.service';
// import { SavingSchemeService } from 'app/my-assets/saving-scheme/savingscheme.service';
import { AccountService, LoginModalService, Principal } from 'app/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { SpendingRouteGuardService } from 'app/pratik/common/spending-route-guard.service';

@Component({
    selector: 'jhi-myassets',
    templateUrl: './my-assets.component.html',
    styleUrls: []
})
export class MyAssetsComponent {
    // uid: any;
    // user: any;
    // stockResponse: any = [];
    // mutualResponse: any = [];
    // totalshareprice: any;
    // totalmutual: any;
    // SavingResponse: any = [];
    // ChitResponse: any = [];
    // totalSaving: number;
    // alternateInvestResponse: any = [];
    // totalAltenateInvest: number;
    // CashResponse: any = [];
    // totalCash: any;
    // propertyResponse: any = [];
    // totalProperty: number;
    // totalChitFund: any;
    // futureOptionResponse: any = [];
    // totalFutureOption: number;
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
    constructor(
        // private stockService: StockService,
        // private mutualfundService: MutualfundService,
        // private alternateservice: AlternateService,
        // private cashservice: CashService,
        // private chitfundservice: ChitFundService,
        // private propertyservice: PropertyService,
        // private futureoptionservice: FutureOptionService,
        // private savingSchemeService: SavingSchemeService,
        // private account: AccountService,
        private principal: Principal,
        private loginModalService: LoginModalService
    ) {}

    // ngOnInit() {
    //     this.assetAccordService.assetacord.subscribe(route => {
    //         this.commonState = route;
    //         this.panelState(this.commonState);
    //     });
    // }
    // panelState(route) {
    //     if (route === 'stock') {
    //        this. panelOpenState = false;
    //        this.panelStockState = true;
    //        this.panelMutualState = false;
    //        this.panelSavingState = false;
    //        this.panelAlterState = false;
    //        this.panelCashState = false;
    //        this.panelPropertyState = false;
    //        this.panelChitState = false;
    //        this.panelFutureState = false;
    //     } else if (route === 'mutual') {
    //         this. panelOpenState = false;
    //        this.panelStockState = false;
    //        this.panelMutualState = true;
    //        this.panelSavingState = false;
    //        this.panelAlterState = false;
    //        this.panelCashState = false;
    //        this.panelPropertyState = false;
    //        this.panelChitState = false;
    //        this.panelFutureState = false;
    //     } else if (route === 'saving') {
    //         this. panelOpenState = false;
    //        this.panelStockState = false;
    //        this.panelMutualState = false;
    //        this.panelSavingState = true;
    //        this.panelAlterState = false;
    //        this.panelCashState = false;
    //        this.panelPropertyState = false;
    //        this.panelChitState = false;
    //        this.panelFutureState = false;
    //     } else if (route === 'altinvest') {
    //         this. panelOpenState = false;
    //        this.panelStockState = false;
    //        this.panelMutualState = false;
    //        this.panelSavingState = false;
    //        this.panelAlterState = true;
    //        this.panelCashState = false;
    //        this.panelPropertyState = false;
    //        this.panelChitState = false;
    //        this.panelFutureState = false;
    //     } else if (route === 'cash') {
    //         this. panelOpenState = false;
    //        this.panelStockState = false;
    //        this.panelMutualState = false;
    //        this.panelSavingState = false;
    //        this.panelAlterState = false;
    //        this.panelCashState = true;
    //        this.panelPropertyState = false;
    //        this.panelChitState = false;
    //        this.panelFutureState = false;
    //     } else if (route === 'property') {
    //         this. panelOpenState = false;
    //         this.panelStockState = false;
    //         this.panelMutualState = false;
    //         this.panelSavingState = false;
    //         this.panelAlterState = false;
    //         this.panelCashState = false;
    //         this.panelPropertyState = true;
    //         this.panelChitState = false;
    //         this.panelFutureState = false;
    //     } else if (route === 'chit') {
    //         this. panelOpenState = false;
    //         this.panelStockState = false;
    //         this.panelMutualState = false;
    //         this.panelSavingState = false;
    //         this.panelAlterState = false;
    //         this.panelCashState = false;
    //         this.panelPropertyState = false;
    //         this.panelChitState = true;
    //         this.panelFutureState = false;
    //     } else if (route === 'future') {
    //         this. panelOpenState = false;
    //         this.panelStockState = false;
    //         this.panelMutualState = false;
    //         this.panelSavingState = false;
    //         this.panelAlterState = false;
    //         this.panelCashState = false;
    //         this.panelPropertyState = false;
    //         this.panelChitState = false;
    //         this.panelFutureState = true;
    //     }
    // }

    // FetchId(): Promise<any> {
    //     return this.account
    //         .get()
    //         .toPromise()
    //         .then(response => {
    //             this.user = response.body;
    //             this.uid = this.user.id;
    //             // this.stock();
    //         });
    // }
    // stock() {
    //     this.stockService.getStockById(this.uid).subscribe(res => {
    //         this.stockResponse = res;
    //         this.totalshareprice = 0;
    //         for (let j = 0; j < this.stockResponse.length; j++) {
    //             this.totalshareprice = +this.totalshareprice + +this.stockResponse[j].share_price;
    //         }
    //         this.mutual();
    //     });
    // }
    // mutual() {
    //     this.mutualfundService.getMutualFund(this.uid).subscribe(res => {
    //         this.mutualResponse = res;
    //         this.totalmutual = 0;
    //         for (let j = 0; j < this.mutualResponse.length; j++) {
    //             this.totalmutual = +this.totalmutual + +this.mutualResponse[j].currentvalue;
    //         }
    //         this.Savingscheme();
    //     });
    // }
    // Savingscheme() {
    //     this.savingSchemeService.getSavingScheme(this.uid).subscribe(res => {
    //         this.SavingResponse = res;
    //         this.totalSaving = 0;
    //         for (let j = 0; j < this.SavingResponse.length; j++) {
    //             this.totalSaving = +this.totalSaving + +this.SavingResponse[j].fund_value;
    //         }
    //         this.AlternateInvest();
    //     });
    // }
    // AlternateInvest() {
    //     this.alternateservice.getAltInvestmentByuid(this.uid).subscribe(res => {
    //         this.alternateInvestResponse = res;
    //         this.totalAltenateInvest = 0;
    //         for (let j = 0; j < this.alternateInvestResponse.length; j++) {
    //             this.totalAltenateInvest = +this.totalAltenateInvest + +this.alternateInvestResponse[j].market_value;
    //         }
    //         this.cash();
    //     });
    // }
    // cash() {
    //     this.cashservice.getCashDetailsByuid(this.uid).subscribe(res => {
    //         this.CashResponse = res;
    //         this.totalCash = 0;
    //         for (let j = 0; j < this.CashResponse.length; j++) {
    //             this.totalCash = +this.totalCash + +this.CashResponse[j].amount;
    //         }
    //         this.property();
    //     });
    // }
    // property() {
    //     this.propertyservice.getsavePropertyByuid(this.uid).subscribe(res => {
    //         this.propertyResponse = res;
    //         this.totalProperty = 0;
    //         for (let j = 0; j < this.propertyResponse.length; j++) {
    //             this.totalProperty = +this.totalProperty + +this.propertyResponse[j].current_m_value;
    //         }
    //         this.ChitFund();
    //     });
    // }
    // ChitFund() {
    //     this.chitfundservice.getChitByuid(this.uid).subscribe(res => {
    //         this.ChitResponse = res;
    //         this.totalChitFund = 0;
    //         for (let j = 0; j < this.ChitResponse.length; j++) {
    //             this.totalChitFund = +this.totalChitFund + +this.ChitResponse[j].current_value;
    //         }
    //         this.futureOption();
    //     });
    // }
    // futureOption() {
    //     this.futureoptionservice.getFAOByUid(this.uid).subscribe(res => {
    //         this.futureOptionResponse = res;
    //         this.totalFutureOption = 0;
    //         for (let j = 0; j < this.futureOptionResponse.length; j++) {
    //             this.totalFutureOption = +this.totalFutureOption + +this.futureOptionResponse[j].no_of_contracts;
    //         }
    //     });
    // }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
    login() {
        this.modalRef = this.loginModalService.open();
    }
}
