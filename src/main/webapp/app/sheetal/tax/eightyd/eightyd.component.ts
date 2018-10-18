import { Component, OnInit } from '@angular/core';
import { Eightyd } from './eightyd.model';
import { EightydService } from './eightyd.service';
import { AccountService } from 'app/core';
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-eightyd',
  templateUrl: './eightyd.component.html',
  styles: []
})
export class EightydComponent implements OnInit {
  user: any;
  uid: any;
  eightydout: any = [];
  eightyd: Eightyd = new Eightyd();
  valid = true;
  modalRef: NgbModalRef;
  nameField: any;
  editField;
  closeResult: string;
  changesSaved: boolean;
  dataChanged: boolean;

  constructor(
    private modalService: NgbModal,
    private eightydService: EightydService,
    private account: AccountService
  ) {}

  ngOnInit() {
    this.eightyd.medself = 0;
    this.eightyd.medparents = 0;
    this.eightyd.healthcheck = 0;
    this.FetchID();
    this.changesSaved = true;
  }
  onEightydSave() {
    this.eightydService.save(this.eightyd).subscribe(
      responce => {
        console.log(responce), this.onEightydGet(this.uid);
        // alert("data update successfully");
      },
      error => console.log(error)
    );
    this.valid = true;
  }
  updateEightyd() {
    console.log(' in update method eightyd', this.eightyd);
    this.eightydService.PutEightyd(this.eightyd).subscribe(data => {
      alert('Your data update');
      this.changesSaved = true;
    });
  }
  resetEightyd() {
    this.eightyd.medself = 0;
    this.eightyd.medparents = 0;
    this.eightyd.healthcheck = 0;
  }

  onEightydGet(uid) {
    console.log('in eightyd get ts uid', this.uid);
    this.eightydService.geteightyd(this.uid).subscribe(res => {
      console.log('eightyd res', res);
      this.eightydout = res;
      for (let index = 0; index < this.eightydout.length; index++) {
        const element = this.eightydout[index];
        this.eightyd.medself = element.medself;
        this.eightyd.medparents = element.medparents;
        this.eightyd.healthcheck = element.healthcheck;
        this.eightyd.id = element.id;
      }
      if (this.eightydout.length === 0) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    });
  }

  FetchID(): Promise<any> {
    return this.account
      .get()
      .toPromise()
      .then(response => {
        this.user = response.body;
        console.log('user info', this.user);
        this.eightyd.uid = this.user.id;
        console.log('uid is', this.eightyd.uid);
        this.uid = this.eightyd.uid;
        this.onEightydGet(this.uid);
      });
  }

  onEditStaticField(nameField, eightydEditContent) {
    console.log('inside edit eightyd');
    this.nameField = nameField;
    console.log('inside edit eightyd', nameField);
    if (nameField === 'Medical Insurance for Self') {
      this.nameField = 'Amount of Medical for self';
      this.editField = this.eightydout[0].medself;
    } else if (nameField === 'Medical Insurance for Parents ') {
      this.nameField = 'Amount of Medical for Parents';
      this.editField = this.eightydout[0].medparents;
    } else if (nameField === 'Preventive Health Checkup') {
      this.nameField = 'Amount of Preventive health checkup';
      this.editField = this.eightydout[0].healthcheck;
    }
    this.modalService
      .open(eightydEditContent, { ariaLabelledBy: 'eightydEditContent' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
          this.FillEditEightyd(nameField);
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  FillEditEightyd(nameField) {
    console.log('inside fill edit eightyd');
    if (nameField === 'Medical Insurance for Self') {
      this.eightyd.medself = this.editField;
      this.eightydout[0].medself = this.eightyd.medself;
    } else if (nameField === 'Medical Insurance for Parents') {
      this.eightyd.medparents = this.editField;
      this.eightydout[0].medparents = this.eightyd.medparents;
    } else if (nameField === 'Preventive Health Checkup') {
      this.eightyd.healthcheck = this.editField;
      this.eightydout[0].healthcheck = this.eightyd.healthcheck;
    }
  }
}
