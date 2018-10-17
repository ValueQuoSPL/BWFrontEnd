import { log } from 'util';
import { Component, ViewChild, OnInit } from '@angular/core';
// import { StockComponent } from 'app/my-assets/stocks/stocks.component';
// import { StockService } from 'app/my-assets/stocks/stocks.service';
// import { MutualfundService } from 'app/my-assets/mutual/mutual.service';
// import { AlternateService } from './alternate-investment/alternateinvest.service';
// import { CashService } from './cash/cash.service';
// import { ChitFundService } from './chit-funds/chitfund.service';
// import { PropertyService } from './property/property.service';
// import { FutureOptionService } from './future-option/futureoption.service';
// import { SavingSchemeService } from './saving-scheme/savingscheme.service';
import { Principal, LoginModalService } from 'app/core';
import { AccountService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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
    // private stockService: StockService,
    // private mutualfundService: MutualfundService,
    // private alternateservice: AlternateService,
    // private cashservice: CashService,
    // private chitfundservice: ChitFundService,
    // private propertyservice: PropertyService,
    // private futureoptionservice: FutureOptionService,
    // private savingSchemeService: SavingSchemeService,
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
        this.uid = this.user.id;
        // this.stock();
      });
  }
  // stock() {
  //   this.stockService.getStockById(this.uid).subscribe(res => {
  //     this.stockResponse = res;
  //     this.totalshareprice = 0;
  //     for (let j = 0; j < this.stockResponse.length; j++) {
  //       this.totalshareprice =
  //         +this.totalshareprice + +this.stockResponse[j].share_price;
  //     }
  //     this.mutual();
  //   });
  // }
  // mutual() {
  //   this.mutualfundService.getMutualFund(this.uid).subscribe(res => {
  //     this.mutualResponse = res;

  //     this.totalmutual = 0;
  //     for (let j = 0; j < this.mutualResponse.length; j++) {
  //       this.totalmutual =
  //         +this.totalmutual + +this.mutualResponse[j].currentvalue;
  //     }
  //     this.Savingscheme();
  //   });
  // }
  // Savingscheme() {
  //   this.savingSchemeService.getSavingScheme(this.uid).subscribe(res => {
  //     this.SavingResponse = res;
  //     this.totalSaving = 0;
  //     for (let j = 0; j < this.SavingResponse.length; j++) {
  //       this.totalSaving =
  //         +this.totalSaving + +this.SavingResponse[j].fund_value;
  //     }
  //     this.AlternateInvest();
  //   });
  // }
  // AlternateInvest() {
  //   this.alternateservice.getAltInvestmentByuid(this.uid).subscribe(res => {
  //     this.alternateInvestResponse = res;

  //     this.totalAltenateInvest = 0;
  //     for (let j = 0; j < this.alternateInvestResponse.length; j++) {
  //       this.totalAltenateInvest =
  //         +this.totalAltenateInvest +
  //         +this.alternateInvestResponse[j].market_value;
  //     }
  //     this.cash();
  //   });
  // }
  // cash() {
  //   this.cashservice.getCashDetailsByuid(this.uid).subscribe(res => {
  //     this.CashResponse = res;
  //     this.totalCash = 0;
  //     for (let j = 0; j < this.CashResponse.length; j++) {
  //       this.totalCash = +this.totalCash + +this.CashResponse[j].amount;
  //     }
  //     this.property();
  //   });
  // }
  // property() {
  //   this.propertyservice.getsavePropertyByuid(this.uid).subscribe(res => {
  //     this.propertyResponse = res;

  //     this.totalProperty = 0;
  //     for (let j = 0; j < this.propertyResponse.length; j++) {
  //       this.totalProperty =
  //         +this.totalProperty + +this.propertyResponse[j].current_m_value;
  //     }
  //     this.ChitFund();
  //   });
  // }
  // ChitFund() {
  //   this.mutualfundService.getMutualFund(this.uid).subscribe(res => {
  //     this.CashResponse = res;
  //     this.totalChitFund = 0;
  //     for (let j = 0; j < this.CashResponse.length; j++) {
  //       this.totalChitFund =
  //         +this.totalChitFund + +this.CashResponse[j].current_value;
  //     }
  //     this.futureOption();
  //   });
  // }
  // futureOption() {
  //   this.mutualfundService.getMutualFund(this.uid).subscribe(res => {
  //     this.futureOptionResponse = res;

  //     this.totalFutureOption = 0;
  //     for (let j = 0; j < this.futureOptionResponse.length; j++) {
  //       this.totalFutureOption =
  //         +this.totalFutureOption +
  //         +this.futureOptionResponse[j].no_of_contracts;
  //     }
  //   });
  // }
  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  login() {
    this.modalRef = this.loginModalService.open();
  }
}
