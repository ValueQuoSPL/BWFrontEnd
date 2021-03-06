import { Component, OnInit } from '@angular/core';
import { Gross } from 'app/sheetal/tax/gross/gross.model';
import { GrossService } from 'app/sheetal/tax/gross/gross.service';
import { AccountService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonSidebarService } from '../../../pratik/common/sidebar.service';

@Component({
    selector: 'jhi-gross',
    templateUrl: './gross.component.html',
    styles: []
})
export class GrossComponent implements OnInit {
    user: any;
    uid: any;
    output: any = [];
    gross: Gross = new Gross();
    grossout: any;
    valid = false;
    modalRef: NgbModalRef;
    nameField: any;
    editField;
    closeResult: string;
    changesSaved: boolean;
    dataChanged: boolean;
    dynamicgross: any;
    updateout: any = [];
    universalflag: boolean;
    globalflag: boolean;
    prevValue;
    isFieldChange = false;
    account: any;

    constructor(private modalService: NgbModal, private grossService: GrossService, public commonService: CommonSidebarService) {}

    ngOnInit() {
        this.FetchID();
        this.changesSaved = true;
    }
    FetchID() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.gross.uid = this.account.id;
            this.onGrossGet(this.uid);
        });
    }
    // Gross Reset
    resetGross() {
        this.gross.bsalary = '';
        this.gross.da = '';
        this.gross.hra = '';
        this.gross.conveyance = '';
        this.gross.childedu = '';
        this.gross.medical = '';
        this.gross.lta = '';
        this.gross.otherallown = '';
        this.gross.bonus = '';
        this.gross.rentincome = '';
        this.gross.saving = '';
        this.gross.bonds = '';
        this.gross.conveyanceother = '';
    }
    onGrossGet(uid) {
        this.grossService.getgross(this.uid).subscribe(res => {
            this.output = res;
            if (this.output.length === 0) {
                this.valid = false;
            } else {
                this.valid = true;
            }
        });
    }
    onGrossSave() {
        this.grossService.save(this.gross).subscribe(responce => {
            // alert("data update successfully");
        });
        this.valid = true;
    }
    updateGross() {
        this.grossService.PutGross(this.gross).subscribe(data => {
            alert('Your data update');
            this.changesSaved = true;
        });
    }
    onEditGrossField(nameField, grossEditContent) {
        this.nameField = nameField;
        if (nameField === 'bsalary') {
            this.nameField = 'Amount';
            this.editField = this.output[0].bsalary;
        } else if (nameField === 'da') {
            this.nameField = 'Amount';
            this.editField = this.output[0].da;
        } else if (nameField === 'hra') {
            this.nameField = 'Amount';
            this.editField = this.output[0].hra;
        } else if (nameField === 'convey') {
            this.nameField = 'Amount';
            this.editField = this.output[0].conveyance;
        } else if (nameField === 'ce') {
            this.nameField = 'Amount';
            this.editField = this.output[0].childedu;
        } else if (nameField === 'med') {
            this.nameField = 'Amount';
            this.editField = this.output[0].medical;
        } else if (nameField === 'lta') {
            this.nameField = 'Amount';
            this.editField = this.output[0].lta;
        } else if (nameField === 'oa') {
            this.nameField = 'Amount';
            this.editField = this.output[0].otherallown;
        } else if (nameField === 'bonus') {
            this.nameField = 'Amount';
            this.editField = this.output[0].bonus;
        } else if (nameField === 'rent') {
            this.nameField = 'Amount';
            this.editField = this.output[0].rentincome;
        } else if (nameField === 'saving') {
            this.nameField = 'Amount';
            this.editField = this.output[0].saving;
        } else if (nameField === 'bonds') {
            this.nameField = 'Amount';
            this.editField = this.output[0].bonds;
        } else if (nameField === 'conveyance') {
            this.nameField = 'Amount';
            this.editField = this.output[0].conveyanceother;
        }
        this.prevValue = this.editField;
        {
            this.modalService.open(grossEditContent, { ariaLabelledBy: 'grossEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditGross(nameField);
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
    FillEditGross(nameField) {
        if (nameField === 'bsalary') {
            this.gross.bsalary = this.editField;
            this.output[0].bsalary = this.gross.bsalary;
        } else if (nameField === 'da') {
            this.gross.da = this.editField;
            this.output[0].da = this.gross.da;
        } else if (nameField === 'hra') {
            this.gross.hra = this.editField;
            this.output[0].hra = this.gross.hra;
        } else if (nameField === 'convey') {
            this.gross.conveyance = this.editField;
            this.output[0].conveyance = this.gross.conveyance;
        } else if (nameField === 'ce') {
            this.gross.childedu = this.editField;
            this.output[0].childedu = this.gross.childedu;
        } else if (nameField === 'med') {
            this.gross.medical = this.editField;
            this.output[0].medical = this.gross.medical;
        } else if (nameField === 'lta') {
            this.gross.lta = this.editField;
            this.output[0].lta = this.gross.lta;
        } else if (nameField === 'oa') {
            this.gross.otherallown = this.editField;
            this.output[0].otherallown = this.gross.otherallown;
        } else if (nameField === 'bonus') {
            this.gross.bonus = this.editField;
            this.output[0].bonus = this.gross.bonus;
        } else if (nameField === 'rent') {
            this.gross.rentincome = this.editField;
            this.output[0].rentincome = this.gross.rentincome;
            // this.editField = '';
        } else if (nameField === 'saving') {
            this.gross.saving = this.editField;
            this.output[0].saving = this.gross.saving;
        } else if (nameField === 'bonds') {
            this.gross.bonds = this.editField;
            this.output[0].bonds = this.gross.bonds;
        } else if (nameField === 'conveyance') {
            this.gross.conveyanceother = this.editField;
            this.output[0].conveyanceother = this.gross.conveyanceother;
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
