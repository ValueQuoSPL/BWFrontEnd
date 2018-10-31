import { Component, OnInit } from '@angular/core';
import { Home } from 'app/sheetal/tax/home/home.model';
import { HomeService } from 'app/sheetal/tax/home/home.service';
import { AccountService } from 'app/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

    constructor(private modalService: NgbModal, private homeService: HomeService, private account: AccountService) {}

    ngOnInit() {
        // for Home
        this.home.hoamloan = 0;
        this.home.prncpalloan = 0;
        this.home.rentclm = 0;
        this.home.remintrst = 0;
        this.home.rentclmgg = 0;
        this.FetchID();
        this.changesSaved = true;
    }
    // Home reset
    resetHome() {
        this.home.hoamloan = 0;
        this.home.prncpalloan = 0;
        this.home.rentclm = 0;
        this.home.remintrst = 0;
        this.home.rentclmgg = 0;
    }
    onHomeSave() {
        this.homeService.save(this.home).subscribe(
            responce => {
                console.log(responce), this.onHomeGet();
                // alert("data update successfully");
            },
            error => console.log(error)
        );
        this.valid = true;
    }
    updateHome() {
        console.log(' in update method other', this.home);
        this.homeService.PutHome(this.home).subscribe(data => {
            alert('Your data update');
            this.changesSaved = true;
        });
    }

    onHomeGet() {
        console.log('in homeget ts uid', this.uid);
        this.homeService.gethome(this.uid).subscribe(res => {
            console.log(res);
            this.homeout = res;
            console.log('eightyc data in homeResponse', this.homeout);
            for (let i = 0; i < this.homeout.length; i++) {
                const element = this.homeout[i];
                this.home.hoamloan = element.hoamloan;
                this.home.prncpalloan = element.prncpalloan;
                this.home.rentclm = element.rentclm;
                this.home.remintrst = element.remintrst;
                this.home.rentclmgg = element.rentclmgg;
                this.home.uid = element.uid;
                this.home.id = element.id;
                console.log('eightycResponse id', this.home.id);
            }
            if (this.homeout.length === 0) {
                this.valid = false;
                console.log('in if valid value', this.valid);
            } else {
                this.valid = true;
                console.log('in else valid value', this.valid);
            }
        });
    }
    FetchID(): Promise<any> {
        return this.account
            .get()
            .toPromise()
            .then(response => {
                this.user = response.body;
                this.home.uid = this.user.id;
                this.uid = this.home.uid;
                this.onHomeGet();
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
}
