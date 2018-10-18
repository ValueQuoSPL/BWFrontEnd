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

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  login() {
    this.modalRef = this.loginModalService.open();
  }
}
