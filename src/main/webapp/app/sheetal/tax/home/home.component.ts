import { Component, OnInit } from '@angular/core';
import { Home } from 'app/sheetal/tax/home/home.model';
import { HomeService } from 'app/sheetal/tax/home/home.service';
import { AccountService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonSidebarService } from '../../../pratik/common/sidebar.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {
    id;
    user: any;
    uid: any;
    eightydout: any = [];
    home: Home = new Home();
    homeout: any;
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

    constructor(private modalService: NgbModal, private homeService: HomeService, public commonService: CommonSidebarService) {}

    ngOnInit() {
        // for Home
        this.FetchID();
        this.changesSaved = true;
    }
    FetchID() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.home.uid = this.account.id;
            this.onHomeGet();
        });
    }
    // Home reset
    resetHome() {
        this.home.hoamloan = '';
        this.home.prncpalloan = '';
        this.home.rentclm = '';
        this.home.remintrst = '';
        this.home.rentclmgg = '';
    }
    onHomeSave() {
        this.homeService.save(this.home).subscribe(responce => {
            this.onHomeGet();
        });
        this.valid = true;
    }
    updateHome() {
        this.homeService.PutHome(this.home).subscribe(data => {
            this.changesSaved = true;
        });
    }

    onHomeGet() {
        this.homeService.gethome(this.uid).subscribe(res => {
            this.homeout = res;
            if (this.homeout.length === 0) {
                this.valid = false;
            } else {
                this.valid = true;
            }
        });
    }
    onEditHomeField(nameField, homeEditContent) {
        this.nameField = nameField;
        if (nameField === 'Housing Loan') {
            this.nameField = 'Amount';
            this.editField = this.homeout[0].hoamloan;
        } else if (nameField === 'Pricipal Loan') {
            this.nameField = 'Amount';
            this.editField = this.homeout[0].prncpalloan;
        } else if (nameField === 'Rent Claimed') {
            this.nameField = 'Amount';
            this.editField = this.homeout[0].rentclm;
        } else if (nameField === 'Remaining Interest') {
            this.nameField = 'Amount';
            this.editField = this.homeout[0].remintrst;
        } else if (nameField === 'Mentioned the Rent claimed') {
            this.nameField = 'Amount';
            this.editField = this.homeout[0].rentclmgg;
        }
        {
            this.prevValue = this.editField;
            this.modalService.open(homeEditContent, { ariaLabelledBy: 'homeEditContent' }).result.then(
                result => {
                    this.closeResult = `Closed with: ${result}`;
                    this.FillEditHome(nameField);
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
    FillEditHome(nameField) {
        if (nameField === 'Housing Loan') {
            this.home.hoamloan = this.editField;
            this.homeout[0].hoamloan = this.home.hoamloan;
        } else if (nameField === 'Pricipal Loan') {
            this.home.prncpalloan = this.editField;
            this.homeout[0].prncpalloan = this.home.prncpalloan;
        } else if (nameField === 'Rent Claimed') {
            this.home.rentclm = this.editField;
            this.homeout[0].rentclm = this.home.rentclm;
        } else if (nameField === 'Remaining Interest') {
            this.home.remintrst = this.editField;
            this.homeout[0].remintrst = this.home.remintrst;
        } else if (nameField === 'Mentioned the Rent claimed') {
            this.home.rentclmgg = this.editField;
            this.homeout[0].rentclmgg = this.home.rentclmgg;
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
