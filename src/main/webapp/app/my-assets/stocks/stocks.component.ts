import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Stocks } from 'app/my-assets/stocks/stocks.modal';
import { StockService } from 'app/my-assets/stocks/stocks.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReplaySubject } from 'rxjs';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';
import { DocumentComponent } from 'app/document/document.component';
import { MatDialog } from '@angular/material';

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
    account: any;
    totalshareprice: any;
    data = new ReplaySubject(0);
    price: any;

    constructor(
        private stockService: StockService,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        public commonService: CommonSidebarService,
        private dialog: MatDialog
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

    FetchId() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
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
        this.modalService.open(stocksModal, { ariaLabelledBy: 'stocksModal' }).result.then(
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
        this.modalService.open(editStocksModal, { ariaLabelledBy: 'editStocksModal' }).result.then(
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
            this.totalshareprice = 0;
            for (let j = 0; j < this.out.length; j++) {
                // tslint:disable-next-line:no-shadowed-variable
                const element = this.out[j];
                const no_of_shares = element.no_of_shares;
                const sum = no_of_shares * element.share_price;
                element.totalshareprice = sum;
            }
        });
    }
    saveStocks() {
        this.stocks.userid = this.uid;
        this.stockService.SaveStocks(this.stocks).subscribe(data => {
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
            this.stocks.userid = this.uid;
        });
    }
    update(commonid) {
        this.stocks.id = this.commonid;
        this.stockService.UpdateStock(this.stocks).subscribe(data => {
            this.getStockById(this.uid);
        });
    }
    delete(commonid) {
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            this.stocks.id = this.commonid;
            this.stockService.DeleteStock(this.stocks.id).subscribe(data => {
                this.getStockById(this.uid);
            });
        } else {
            this.getStockById(this.uid);
        }
    }

    openDialog(id, type): void {
        console.log(type);
        const dialogRef = this.dialog.open(DocumentComponent, {
            data: { tid: id, Type: type }
        });

        dialogRef.afterClosed().subscribe(result => {});
    }
}
