import { Component, OnInit } from '@angular/core';
import { Principal, AccountService } from 'app/core';
import { Router } from '@angular/router';
import { RiskService } from 'app/risk/risk.service';
import { MedicalInsurance } from 'app/risk/risk.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-medical-insurance',
  templateUrl: './medical-insurance.component.html'
})
export class MedicalInsuranceComponent implements OnInit {
  account: Account;
  medicalInsurance: MedicalInsurance = new MedicalInsurance();
  medicalArray = [];
  isSaving: any;
  save: any;
  clear: any;
  resetFieldValue: any;
  deleteFieldValue: any;
  closeResult: string;
  uid: any;
  result: any;
  tempId: any;
  riskmedical: any;

  constructor(
    private principal: Principal,
    private accountService: AccountService,
    private router: Router,
    private modalService: NgbModal,
    private riskService: RiskService
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
    });
    this.getUserid();
  }

  getUserid() {
    console.log('inside get uid');
    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          console.log('from life userid is : ', this.uid);
          this.onGetMedical();
        } else {
          console.log('cannot get user details check login ');
        }
      })
      .catch(err => {});
  }

  openMedical(lifeContent) {
    console.log('income modal open');

    this.modalService
      .open(lifeContent, { ariaLabelledBy: 'lifeModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.MedicalInsurance();
          // console.log('add income success');
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
  MedicalInsurance() {
    this.medicalInsurance.userid = this.uid;
    this.medicalArray.push({
      // id: this.id,
      hosp_type: this.medicalInsurance.hosp_type,
      room_type: this.medicalInsurance.room_type,
      family_members: this.medicalInsurance.family_members
    });
    this.riskService
      .SaveMedicalInsurance(this.medicalInsurance)
      .subscribe(data => {
        alert('Added new stocks details');
        this.onGetMedical();
      });
  }

  // deleteField(index, id) {}
  onGetMedical() {
    this.riskService.getMedicalInsurance(this.uid).subscribe(data => {
      this.riskmedical = data;
      console.log('riskmedical', this.riskmedical);
    });
  }
  opnMedical(id, lifeModal) {
    console.log('in medical');
    this.tempId = id;
    this.getid(this.tempId);
    this.modalService
      .open(lifeModal, { ariaLabelledBy: 'lifeModal' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.updateMedicalInsurance();
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  updateMedicalInsurance() {
    this.riskService
      .updateMedicalInsurance(this.medicalInsurance)
      .subscribe(data => {
        alert('data saved');
        this.onGetMedical();
      });
  }
  deleteField(index, id) {
    this.riskService.deleteMedicalInsurance(id).subscribe(data => {
      alert('deleted');
    });
    this.riskmedical.splice(index, 1);
  }
  getid(tempId) {
    console.log('in gitid');
    this.riskService.getid(tempId).subscribe(data => {
      this.result = data;
      console.log('getidresult', this.result);
      this.medicalInsurance.id = this.result.id;
      this.medicalInsurance.userid = this.result.userid;
      this.medicalInsurance.family_members = this.result.family_members;
      this.medicalInsurance.hosp_type = this.result.hosp_type;
      this.medicalInsurance.room_type = this.result.room_type;
    });
  }
}
