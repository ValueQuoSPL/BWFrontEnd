import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/core';
import { GeneralService } from 'app/pratik/spending/spending.service';
import { General } from 'app/pratik/spending/spending.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'jhi-general',
  templateUrl: './general.component.html',
  styleUrls: ['../spending.component.css']
})
export class GeneralComponent implements OnInit {
  uid;
  amount;
  expense;
  resource;
  nameField;
  editField;
  closeResult;
  totalUtility;
  premium_mode;
  loadUtility: boolean;
  dataChanged: boolean;
  changesSaved: boolean;
  isUtilityData: boolean;
  UtilityArray: any = [];
  tempGeneralArray: any = [];
  dynamicGeneral: any = [];
  general: General = new General();
  generalDate = new FormControl(new Date());

  PolicyTypeArray = [
    { name: 'Child Policy' },
    { name: 'Retirement Policy' },
    { name: 'Saving Policy' },
    { name: 'Investment Policy' },
    { name: 'Term Policy' }
  ];
  PremiumTypeArray = [
    { name: 'Single' },
    { name: 'Monthly' },
    { name: 'Quarterly' },
    { name: 'Half Yearly' },
    { name: 'Yearly' }
  ];

  constructor(
    private generalService: GeneralService,
    private principal: Principal,
    private modalService: NgbModal,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    // console.log('inside general Init()');
    this.getUserid();
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          // console.log('from general userid is : ', this.uid);
          this.onGetGeneral();
        } else {
          // console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  clear() {
    this.resource = '';
    this.amount = '';
    this.expense = '';

    this.general.generalModelArray = '';
    this.general.ins_obj = '';
    this.general.issuer = '';
    this.general.policy_name = '';
    this.general.policy_no = '';
    this.general.policy_term = '';
    this.general.premium = '';
    this.general.proposer_name = '';
    this.general.start_date = '';
    this.general.sum = '';
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
  // general insurance
  openGeneral(generalModal) {
    this.modalService
      .open(generalModal, { ariaLabelledBy: 'generalModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.AddGeneral();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  AddGeneral() {
    this.dynamicGeneral.push({
      insureName: this.general.ins_obj,
      policyName: this.general.policy_name,
      premium: this.general.premium,
      issuer: this.general.issuer,
      premiumTerm: this.general.policy_term,
      policyDate: this.generalDate.value,
      sum: this.general.sum,
      policyNumber: this.general.policy_no,
      premiumName: this.general.proposer_name,
      userid: this.uid
    });
    // console.log(this.general.generalModelArray);
    // waits(1000);
    // this.general.generalModelArray.pop();
    this.general.generalModelArray.push({
      iName: this.general.ins_obj,
      pName: this.general.policy_name,
      premium: this.general.premium,
      issuer: this.general.issuer,
      pterm: this.general.policy_term,
      pdate: this.generalDate.value,
      sum: this.general.sum,
      poNo: this.general.policy_no,
      prName: this.general.proposer_name,
      userid: this.uid
    });
    this.onGeneralSave();
    this.clear();
  }
  RemoveGeneral(index, id) {
    const res = confirm('Are you sure?');
    if (res) {
      this.generalService.DeleteGeneral(id).subscribe(responce => {
        // //// console.log(responce);
      });
      this.dynamicGeneral.splice(index, 1);
    }
  }

  onGeneralSave(): void {
    this.general.userid = this.uid;
    this.generalService
      .PostGeneral(this.general.generalModelArray)
      .subscribe(data => {
        // console.log(this.general.generalModelArray);
        this.general.generalModelArray = [];
        // this.general.generalModelArray.pop();
        // console.log(this.general.generalModelArray);
        alert('General Insurance saved');
        this.onGetGeneral();
      });
    //// console.log('in general save');
  }
  onGetGeneral(): void {
    this.generalService.GetGeneral(this.uid).subscribe((response: any[]) => {
      // console.log(response);
      this.dynamicGeneral = response;
      // console.log(this.dynamicGeneral);
    });
    //// console.log('getGeneral() success');
  }

  onEditGeneral(id, generalModal) {
    // console.log('edit');
    this.fillModal(id);
    // console.log('modal', generalModal);
    this.modalService
      .open(generalModal, { ariaLabelledBy: 'generalModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.fillgeneralArray(id);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  fillModal(id) {
    // console.log('fill');
    this.tempGeneralArray = this.dynamicGeneral;
    for (let i = 0; i < this.tempGeneralArray.length; i++) {
      if (this.tempGeneralArray[i].id === id) {
        this.general.policy_name = this.tempGeneralArray[i].policyName;
        this.general.premium = this.tempGeneralArray[i].premium;
        this.general.policy_term = this.tempGeneralArray[i].premiumTerm;
        this.general.issuer = this.tempGeneralArray[i].issuer;
        this.general.start_date = this.tempGeneralArray[i].policyDate;
        this.general.proposer_name = this.tempGeneralArray[i].premiumName;
        this.general.sum = this.tempGeneralArray[i].sum;
        this.general.policy_no = this.tempGeneralArray[i].policyNumber;
        this.general.premium_mode = this.tempGeneralArray[i].policyMode;
        this.general.ins_obj = this.tempGeneralArray[i].insureName;
      }
    }
  }
  fillgeneralArray(id) {
    for (let i = 0; i < this.dynamicGeneral.length; i++) {
      if (this.dynamicGeneral[i].id === id) {
        this.dynamicGeneral[i].id = this.general.id;
        this.dynamicGeneral[i].policyName = this.general.policy_name;
        this.dynamicGeneral[i].premium = this.general.premium;
        this.dynamicGeneral[i].premiumTerm = this.general.policy_term;
        this.dynamicGeneral[i].issuer = this.general.issuer;
        this.dynamicGeneral[i].policyDate = this.general.start_date;
        this.dynamicGeneral[i].premiumName = this.general.proposer_name;
        this.dynamicGeneral[i].sum = this.general.sum;
        this.dynamicGeneral[i].policyNumber = this.general.policy_no;
        this.dynamicGeneral[i].policyMode = this.general.premium_mode;
        this.dynamicGeneral[i].insureName = this.general.ins_obj;
      }
    }
    this.Updategeneral(id);
  }
  Updategeneral(id) {
    this.general.id = id;
    this.general.userid = this.uid;
    this.generalService.PutGeneral(this.general, this.uid).subscribe(res => {
      this.clear();
      alert('Your data saved');
    });
  }
}
