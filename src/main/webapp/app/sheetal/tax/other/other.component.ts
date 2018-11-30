import { Component, OnInit } from '@angular/core';
import { Other } from 'app/sheetal/tax/other/other.model';
import { OtherService } from 'app/sheetal/tax/other/other.service';
import { AccountService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonSidebarService } from '../../../pratik/common/sidebar.service';

@Component({
    selector: 'jhi-other',
    templateUrl: './other.component.html',
    styles: []
})
export class OtherComponent implements OnInit {
    id;
    user: any;
    uid: any;
    eightydout: any;
    other: Other = new Other();
    otherout: any = [];
    valid = true;
    modalRef: NgbModalRef;
    nameField: any;
    editField;
    closeResult: string;
    changesSaved: boolean;
    dataChanged: boolean;
    globalflag: boolean;
    prevValue;
    isFieldChange = false;
    universalflag: boolean;
    account: any;

    constructor(private modalService: NgbModal, private otherService: OtherService, public commonService: CommonSidebarService) {}

    ngOnInit() {
        // for other
        this.FetchID();
        this.changesSaved = true;
    }
    FetchID() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.other.uid = this.account.id;
            this.onOtherGet();
        });
    }
    // Other call function
    onOtherSave() {
        this.otherService.save(this.other).subscribe(
            responce => {
                console.log(responce), this.onOtherGet();
                // alert("data update successfully");
            },
            error => console.log(error)
        );
        this.valid = true;
    }
    updateOther() {
        this.otherService.PutOther(this.other).subscribe(data => {
            alert('Your data update');
            this.changesSaved = true;
        });
    }
    // Other Reset
    resetOther() {
        this.other.handicapped = '';
        this.other.medicaltreat = '';
        this.other.selfedu = '';
        this.other.nps = '';
        this.other.rgess = '';
        this.other.donation = '';
    }

    onOtherGet() {
        this.otherService.getother(this.uid).subscribe(res => {
            this.otherout = res;
            if (this.otherout.length === 0) {
                this.valid = false;
            } else {
                this.valid = true;
            }
        });
    }
    onEditOtherField(nameField, otherEditContent) {
        this.nameField = nameField;
        if (nameField === 'Medical Handicapped') {
            this.nameField = 'Amount';
            this.editField = this.otherout[0].handicapped;
        } else if (nameField === 'Medical Treatment') {
            this.nameField = 'Amount';
            this.editField = this.otherout[0].medicaltreat;
        } else if (nameField === 'Repayment') {
            this.nameField = 'Amount';
            this.editField = this.otherout[0].selfedu;
        } else if (nameField === 'nps') {
            this.nameField = 'Amount';
            this.editField = this.otherout[0].nps;
        } else if (nameField === 'rgess') {
            this.nameField = 'Amount';
            this.editField = this.otherout[0].rgess;
        } else if (nameField === 'donation') {
            this.nameField = 'Amount';
            this.editField = this.otherout[0].donation;
        }
        {
            this.prevValue = this.editField;
            this.modalService.open(otherEditContent, { ariaLabelledBy: 'otherEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditOther(nameField);
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
    FillEditOther(nameField) {
        if (nameField === 'Medical Handicapped') {
            this.other.handicapped = this.editField;
            this.otherout[0].handicapped = this.other.handicapped;
        } else if (nameField === 'Medical Treatment') {
            this.other.medicaltreat = this.editField;
            this.otherout[0].medicaltreat = this.other.medicaltreat;
        } else if (nameField === 'Repayment') {
            this.other.selfedu = this.editField;
            this.otherout[0].selfedu = this.other.selfedu;
        } else if (nameField === 'nps') {
            this.other.nps = this.editField;
            this.otherout[0].nps = this.other.nps;
        } else if (nameField === 'rgess') {
            this.other.rgess = this.editField;
            this.otherout[0].rgess = this.other.rgess;
        } else if (nameField === 'donation') {
            this.other.donation = this.editField;
            this.otherout[0].donation = this.other.donation;
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
