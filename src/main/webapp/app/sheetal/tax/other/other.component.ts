import { Component, OnInit } from '@angular/core';
import { Other } from 'app/sheetal/tax/other/other.model';
import { OtherService } from 'app/sheetal/tax/other/other.service';
import { AccountService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

    constructor(private modalService: NgbModal, private otherService: OtherService, private account: AccountService) {}

    ngOnInit() {
        // for other
        this.other.handicapped = 0;
        this.other.medicaltreat = 0;
        this.other.selfedu = 0;
        this.other.nps = 0;
        this.other.rgess = 0;
        this.other.donation = 0;
        this.FetchID();
        this.changesSaved = true;
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
        console.log(' in update method other', this.other);
        this.otherService.PutOther(this.other).subscribe(data => {
            alert('Your data update');
            this.changesSaved = true;
        });
    }
    // Other Reset
    resetOther() {
        this.other.handicapped = 0;
        this.other.medicaltreat = 0;
        this.other.selfedu = 0;
        this.other.nps = 0;
        this.other.rgess = 0;
        this.other.donation = 0;
    }

    onOtherGet() {
        console.log('in eightycget ts uid', this.uid);
        this.otherService.getother(this.uid).subscribe(res => {
            console.log(res);
            this.otherout = res;
            console.log('eightyc data in eightycResponse', this.otherout);
            for (let index = 0; index < this.otherout.length; index++) {
                const element = this.otherout[index];
                this.other.handicapped = element.handicapped;
                this.other.medicaltreat = element.medicaltreat;
                this.other.selfedu = element.selfedu;
                this.other.nps = element.nps;
                this.other.rgess = element.rgess;
                this.other.donation = element.donation;
                this.other.uid = element.uid;
                this.other.id = element.id;
                console.log('otherResponse id', this.other.id);
            }
            if (this.otherout.length === 0) {
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
                this.other.uid = this.user.id;
                this.uid = this.other.uid;
                this.onOtherGet();
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
        console.log('inside fill edit other');
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
}
