import { Component, OnInit } from '@angular/core';
import { Stocks } from 'app/my-assets/stocks/stocks.modal';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { AccountService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import {MutualFundService} from './mutual.service';

@Component({
  selector: 'jhi-stock',
  templateUrl: './stocks.component.html',
  styles: []
})
export class StockComponent implements OnInit {
  user: any;
  closeResult: string;
  commonid: number;
  conformkey: boolean;
  uid: any;
  out: any;
  getid: any;
  stocks: Stocks = new Stocks();
  isSaving;
  totalshareprice: any;

  constructor(
    private stockService: StockService,
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.FetchId();
  }
  resetFieldValue() {
    this.stocks.company_name = '';
    this.stocks.id = null;
    this.stocks.investor_name = '';
    this.stocks.no_of_shares = null;
    this.stocks.notes = '';
    this.stocks.share_price = null;
  }
  FetchId(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        this.stocks.userid = this.user.id;
        this.uid = this.stocks.userid;
        this.getStockById(this.uid);
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // stocks
  openStocks(stocksModal) {
    this.resetFieldValue();
    this.modalService
      .open(stocksModal, { ariaLabelledBy: 'stocksModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveStocks();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditStocks(editStocksModal, id) {
    this.commonid = id;
    this.getStockId(this.commonid);
    this.modalService
      .open(editStocksModal, { ariaLabelledBy: 'editStocksModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.update(this.commonid);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  opendeleteStocks(id) {
    this.commonid = id;
    this.delete(this.commonid);
  }
  getStockById(uid) {
    this.stockService.getStockById(this.uid).subscribe(res => {
      this.out = res;

    });
  }
  saveStocks() {
    this.stockService.SaveStocks(this.stocks).subscribe(data => {
      alert('Added new stocks details');
      this.getStockById(this.uid);
    });
  }
  getStockId(commonid) {
    this.stockService.getStockId(this.commonid).subscribe(res => {
      this.getid = res;
      this.stocks.id = this.getid.id;
      this.stocks.company_name = this.getid.company_name;
      this.stocks.investor_name = this.getid.investor_name;
      this.stocks.no_of_shares = this.getid.no_of_shares;
      this.stocks.share_price = this.getid.share_price;
      this.stocks.notes = this.getid.notes;
    });
  }
  update(commonid) {
    this.stocks.id = this.commonid;
    this.stockService.UpdateStock(this.stocks).subscribe(data => {
      alert('Added new stocks details');
      this.getStockById(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm('really Want to delete?');
    if (this.conformkey === true) {
      this.stocks.id = this.commonid;
      this.stockService.DeleteStock(this.stocks.id).subscribe(data => {
        this.getStockById(this.uid);
      });
    } else {
      this.getStockById(this.uid);
    }
  }
}