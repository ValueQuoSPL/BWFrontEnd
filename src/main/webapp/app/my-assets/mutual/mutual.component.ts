import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MutualFund } from 'app/my-assets/mutual/mutual.modal';
import { MutualfundService } from './mutual.service';

@Component({
  selector: 'jhi-mutualfund',
  templateUrl: './mutual.component.html',
  styles: []
})
export class MutualComponent implements OnInit {
  user: any;
  uid: any;
  output: any;
  getdata: any;
  commonid: any;
  conformkey: any;
  closeResult: any;
  mutualfund: MutualFund = new MutualFund();
  isSaving;

  constructor(
    private account: AccountService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    public mutualFundService: MutualfundService
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
        this.mutualfund.userid = this.user.id;
        this.uid = this.mutualfund.userid;
        this.getMutualFundByUid(this.uid);
      });
  }

  openMutual(mutualModel) {
    this.resetFieldValue();
    this.modalService
      .open(mutualModel, { ariaLabelledBy: 'mutualModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.saveMutual();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openEditMutual(editMutualModal, id) {
    this.commonid = id;
    this.getMutualFundByid(this.commonid);
    this.modalService
      .open(editMutualModal, { ariaLabelledBy: 'editMutualModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.update();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
  saveMutual(): void {
    this.mutualfund.userid = this.uid;
    this.mutualFundService.SubmitUser(this.mutualfund).subscribe(data => {
      this.getMutualFundByUid(this.uid);
    });
  }
  getMutualFundByUid(uid) {
    this.mutualFundService.getMutualFund(this.uid).subscribe(res => {
      this.output = res;
    });
  }
  getMutualFundByid(commonid) {
    this.mutualFundService.getMutualFundByid(this.commonid).subscribe(res => {
      this.getdata = res;

      this.mutualfund.id = this.getdata[0].id;
      this.mutualfund.mfscheme = this.getdata[0].mfscheme;
      this.mutualfund.folionumber = this.getdata[0].folionumber;
      this.mutualfund.holdingdays = this.getdata[0].holdingdays;
      this.mutualfund.purchesprice = this.getdata[0].purchesprice;
      this.mutualfund.currentvalue = this.getdata[0].currentvalue;
      this.mutualfund.gainloss = this.getdata[0].gainloss;
      this.mutualfund.absolutereturn = this.getdata[0].absolutereturn;
      this.mutualfund.cagr = this.getdata[0].cagr;
      this.mutualfund.userid = this.getdata[0].userid;
    });
  }
  opendeleteStocks(id) {
    this.commonid = id;
    this.delete(this.commonid);
  }
  update() {
    this.mutualfund.id = this.commonid;
    this.mutualFundService.UpdateMutualFund(this.mutualfund).subscribe(data => {
      alert('Added new mutualfund details');
      this.getMutualFundByUid(this.uid);
    });
  }
  delete(commonid) {
    this.conformkey = confirm('really Want to delete?');
    if (this.conformkey === true) {
      this.mutualfund.id = this.commonid;
      this.mutualFundService
        .DeleteMutualFund(this.mutualfund.id)
        .subscribe(data => {
          confirm('delete mutualfund details');
          this.getMutualFundByUid(this.uid);
        });
    } else {
      this.getMutualFundByUid(this.uid);
    }
  }
  resetFieldValue() {
    this.mutualfund.id = null;
    this.mutualfund.mfscheme = '';
    this.mutualfund.folionumber = '';
    this.mutualfund.holdingdays = null;
    this.mutualfund.purchesprice = null;
    this.mutualfund.currentvalue = null;
    this.mutualfund.gainloss = null;
    this.mutualfund.absolutereturn = null;
    this.mutualfund.cagr = null;
  }
}
