import { Component, OnInit } from '@angular/core';
import { Eightyc } from 'app/sheetal/tax/eightyc/eightyc.model';
import { EightycService } from 'app/sheetal/tax/eightyc/eightyc.service';
import { AccountService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'jhi-eightyc',
    templateUrl: './eightyc.component.html',
    styles: []
})
export class EightycComponent implements OnInit {
    user: any;
    userID: any;
    valid = true;
    eightycResponse: any = [];
    eightyc: Eightyc = new Eightyc();
    uid: any;
    modalRef: NgbModalRef;
    nameField: any;
    editField;
    closeResult: string;
    changesSaved: boolean;
    dataChanged: boolean;
    eightycResponseput: any = [];

    constructor(private modalService: NgbModal, private eightycService: EightycService, private Accountservice: AccountService) {}

    ngOnInit() {
        this.FetchID();
        this.changesSaved = true;
    }

    FetchID(): Promise<any> {
        return this.Accountservice.get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                this.eightyc.uid = this.user.id;
                this.uid = this.eightyc.uid;
                this.onEightycGet(this.uid);
            });
    }

    // eightyc call function for post data
    onEightycSave() {
        this.eightycService.save(this.eightyc).subscribe(responce => {
            // alert("data update successfully");
        });
        this.valid = true;
    }
    // eightyc call function for update data
    updateEightyc() {
        this.eightycService.PutEightyc(this.eightyc).subscribe(data => {
            this.changesSaved = true;
        });
    }
    // // EightyC Reset
    resetEightyc() {
        this.eightyc.fixed = 0;
        this.eightyc.tution = 0;
        this.eightyc.nsc = 0;
        this.eightyc.nss = 0;
        this.eightyc.post = 0;
        this.eightyc.reinvest = 0;
        this.eightyc.licpremium = 0;
        this.eightyc.equity = 0;
        this.eightyc.pf = 0;
        this.eightyc.ppf = 0;
        this.eightyc.other = 0;
        this.eightyc.tutionfee = 0;
        this.eightyc.ulip = 0;
    }
    // eightyc call function for retreive data
    onEightycGet(uid) {
        this.eightycService.geteightyc(this.uid).subscribe(res => {
            this.eightycResponse = res;
            for (let index = 0; index < this.eightycResponse.length; index++) {
                const element = this.eightycResponse[index];
                this.eightyc.fixed = element.fixed;
                this.eightyc.tution = element.tution;
                this.eightyc.nsc = element.nsc;
                this.eightyc.nss = element.nss;
                this.eightyc.post = element.post;
                this.eightyc.reinvest = element.reinvest;
                this.eightyc.licpremium = element.licpremium;
                this.eightyc.equity = element.equity;
                this.eightyc.pf = element.pf;
                this.eightyc.ppf = element.ppf;
                this.eightyc.other = element.other;
                this.eightyc.ulip = element.ulip;
                this.eightyc.uid = element.uid;
                this.eightyc.id = element.id;
            }
            if (this.eightycResponse.length === 0) {
                this.valid = false;
            } else {
                this.valid = true;
            }
        });
    }
    onEditEightycField(nameField, eightycEditContent) {
        this.nameField = nameField;
        if (nameField === 'Fixed Deposit in Schedule Bank') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].fixed;
        } else if (nameField === 'Tution Fees') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].tution;
        } else if (nameField === 'Deposite in NSC') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].nsc;
        } else if (nameField === 'Deposite in NSS') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].nss;
        } else if (nameField === 'Post Office saving Scheme') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].post;
        } else if (nameField === 'Interest on NSC Reinvested') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].reinvest;
        } else if (nameField === 'Life Insurance Premium') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].licpremium;
        } else if (nameField === 'Equity linked Savings Scheme') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].equity;
        } else if (nameField === 'Provident Fund') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].pf;
        } else if (nameField === 'Public Provident Fund') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].ppf;
        } else if (nameField === 'Others') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].other;
        } else if (nameField === 'ULIP of UTI/LIC') {
            this.nameField = 'Amount';
            this.editField = this.eightycResponse[0].ulip;
        }
        this.modalService.open(eightycEditContent, { ariaLabelledBy: 'eightycEditContent' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.FillEditEightyc(nameField);
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
    FillEditEightyc(nameField) {
        if (nameField === 'Fixed Deposit in Schedule Bank') {
            this.eightyc.fixed = this.editField;
            this.eightycResponse[0].fixed = this.eightyc.fixed;
        } else if (nameField === 'Tution Fees') {
            this.eightyc.tution = this.editField;
            this.eightycResponse[0].tution = this.eightyc.tution;
        } else if (nameField === 'Deposite in NSC') {
            this.eightyc.nsc = this.editField;
            this.eightycResponse[0].nsc = this.eightyc.nsc;
        } else if (nameField === 'Deposite in NSS') {
            this.eightyc.nss = this.editField;
            this.eightycResponse[0].nss = this.eightyc.nss;
        } else if (nameField === 'Post Office saving Scheme') {
            this.eightyc.post = this.editField;
            this.eightycResponse[0].post = this.eightyc.post;
        } else if (nameField === 'Interest on NSC Reinvested') {
            this.eightyc.reinvest = this.editField;
            this.eightycResponse[0].reinvest = this.eightyc.reinvest;
        } else if (nameField === 'Life Insurance Premium') {
            this.eightyc.licpremium = this.editField;
            this.eightycResponse[0].licpremium = this.eightyc.licpremium;
        } else if (nameField === 'Equity linked Savings Scheme') {
            this.eightyc.equity = this.editField;
            this.eightycResponse[0].equity = this.eightyc.equity;
        } else if (nameField === 'Provident Fund') {
            this.eightyc.pf = this.editField;
            this.eightycResponse[0].pf = this.eightyc.pf;
        } else if (nameField === 'Public Provident Fund') {
            this.eightyc.ppf = this.editField;
            this.eightycResponse[0].ppf = this.eightyc.ppf;
        } else if (nameField === 'Others') {
            this.eightyc.other = this.editField;
            this.eightycResponse[0].other = this.eightyc.other;
        } else if (nameField === 'ULIP of UTI/LIC') {
            this.eightyc.ulip = this.editField;
            this.eightycResponse[0].ulip = this.eightyc.ulip;
        }
    }
}
