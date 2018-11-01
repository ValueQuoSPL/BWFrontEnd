import { Component, OnInit } from '@angular/core';
import { Eightyd } from 'app/sheetal/tax/eightyd/eightyd.model';
import { EightydService } from 'app/sheetal/tax/eightyd/eightyd.service';
import { AccountService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonSidebarService } from '../../../pratik/common/sidebar.service';

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
    globalflag: boolean;
    prevValue;
    account: any;
    isFieldChange = false;
    universalflag: boolean;

    constructor(private modalService: NgbModal, private eightydService: EightydService, public commonService: CommonSidebarService) {}

    ngOnInit() {
        this.FetchID();
        this.changesSaved = true;
    }
    FetchID() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.eightyd.uid = this.account.id;
            this.onEightydGet(this.uid);
        });
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
        this.eightyd.medself = '';
        this.eightyd.medparents = '';
        this.eightyd.healthcheck = '';
    }

    onEightydGet(uid) {
        console.log('in eightyd get ts uid', this.uid);
        this.eightydService.geteightyd(this.uid).subscribe(res => {
            console.log('eightyd res', res);
            this.eightydout = res;
            if (this.eightydout.length === 0) {
                this.valid = false;
            } else {
                this.valid = true;
            }
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
        {
            this.prevValue = this.editField;
            this.modalService.open(eightydEditContent, { ariaLabelledBy: 'eightydEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditEightyd(nameField);
                },
                reason => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                }
            );
        }
    }
    DetectChange(event) {
        if (this.prevValue === event || this.prevValue === null) {
            this.globalflag = false;
            this.isFieldChange = false;
        } else {
            this.globalflag = true;
            this.isFieldChange = true;
        }
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

    FindValue(event) {
        if (this.prevValue === event || this.prevValue === null) {
            this.universalflag = false;
            this.isFieldChange = false;
        } else {
            this.universalflag = true;
            this.isFieldChange = true;
        }
    }
}
