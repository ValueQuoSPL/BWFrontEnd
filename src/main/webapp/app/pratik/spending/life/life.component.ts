import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, Principal } from 'app/core';
import { FormControl } from '@angular/forms';
import { Life } from 'app/pratik/spending/spending.model';
import { LifeService } from 'app/pratik/spending/spending.service';

@Component({
    selector: 'jhi-life',
    templateUrl: './life.component.html',
    styleUrls: ['../spending.component.css']
})
export class LifeComponent implements OnInit {
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
    tempLifeArray: any = [];
    dynamicLifeArray: any = [];
    life: Life = new Life();

    lifeDate = new FormControl(new Date());

    PolicyTypeArray = [
        { name: 'Child Policy' },
        { name: 'Retirement Policy' },
        { name: 'Saving Policy' },
        { name: 'Investment Policy' },
        { name: 'Term Policy' }
    ];
    PremiumTypeArray = [{ name: 'Single' }, { name: 'Monthly' }, { name: 'Quarterly' }, { name: 'Half Yearly' }, { name: 'Yearly' }];
    isLifeData: boolean;
    constructor(
        private lifeService: LifeService,
        private principal: Principal,
        private modalService: NgbModal,
        private accountService: AccountService
    ) {}

    ngOnInit() {
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
                    this.onGetLife();
                } else {
                }
            })
            .catch(err => {});
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';

        this.life.ins_name = '';
        this.life.issuer = '';
        this.life.policy_name = '';
        this.life.policy_term = '';
        this.life.premium = '';
        this.life.premium_mode = '';
        this.life.premium_term = '';
        this.life.proposer_name = '';
        this.life.start_date = '';
        this.life.sum = '';
        this.life.type = '';
        this.life.policynumber = '';
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
    // life insurance
    openLife(lifeModal) {
        this.modalService.open(lifeModal, { ariaLabelledBy: 'lifeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddLifeInsurance();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    AddLifeInsurance() {
        this.dynamicLifeArray.push({
            iName: this.life.type,
            issuer: this.life.issuer,
            ins_name: this.life.ins_name,
            prName: this.life.proposer_name,
            sDate: this.lifeDate.value,
            pterm: this.life.policy_term,
            pMode: this.life.premium_mode,
            pName: this.life.policy_name,
            sum: this.life.sum,
            policynumber: this.life.policynumber,
            premium: this.life.premium,
            term: this.life.premium_term,
            userid: this.uid
        });
        this.life.lifeModelArray.pop();
        this.life.lifeModelArray.push({
            iName: this.life.type,
            issuer: this.life.issuer,
            ins_name: this.life.ins_name,
            prName: this.life.proposer_name,
            sDate: this.lifeDate.value,
            pterm: this.life.policy_term,
            pMode: this.life.premium_mode,
            pName: this.life.policy_name,
            sum: this.life.sum,
            policynumber: this.life.policynumber,
            premium: this.life.premium,
            term: this.life.premium_term,
            userid: this.uid
        });
        this.onLifeSave();
        this.clear();
    }
    onLifeSave(): void {
        this.life.userid = this.uid;

        this.lifeService.PostLife(this.life.lifeModelArray).subscribe(data => {
            this.onGetLife();
        });
    }
    onGetLife(): void {
        this.lifeService.GetLife(this.uid).subscribe((response: any[]) => {
            this.dynamicLifeArray = response;

            if (this.dynamicLifeArray.length === 0) {
                this.isLifeData = false;
            } else {
                this.isLifeData = true;
            }
        });
    }
    RemoveLifeInsurance(index, id) {
        const res = confirm('Are you Sure?');

        if (res) {
            this.lifeService.DeleteLife(id).subscribe(responce => {});
            this.dynamicLifeArray.splice(index, 1);
        }
    }
    onEditLife(id, lifeModal) {
        this.fillModal(id);
        this.modalService.open(lifeModal, { ariaLabelledBy: 'lifeModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.fillLifeArray(id);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    fillModal(id) {
        this.tempLifeArray = this.dynamicLifeArray;
        for (let i = 0; i < this.tempLifeArray.length; i++) {
            if (this.tempLifeArray[i].id === id) {
                this.life.type = this.tempLifeArray[i].name;
                this.life.ins_name = this.tempLifeArray[i].insuranceName;
                this.life.policy_name = this.tempLifeArray[i].pName;
                this.life.premium = this.tempLifeArray[i].premium;
                this.life.policy_term = this.tempLifeArray[i].pterm;
                this.life.issuer = this.tempLifeArray[i].issuer;
                this.life.start_date = this.tempLifeArray[i].sDate;
                this.life.proposer_name = this.tempLifeArray[i].premiumName;
                this.life.sum = this.tempLifeArray[i].sum;
                this.life.policynumber = this.tempLifeArray[i].policynumber;
                this.life.premium_term = this.tempLifeArray[i].term;
                this.life.premium_mode = this.tempLifeArray[i].pMode;
            }
        }
    }
    fillLifeArray(id) {
        for (let i = 0; i < this.dynamicLifeArray.length; i++) {
            if (this.dynamicLifeArray[i].id === id) {
                this.dynamicLifeArray[i].id = this.life.id;
                this.dynamicLifeArray[i].name = this.life.type;
                this.dynamicLifeArray[i].insuranceName = this.life.ins_name;
                this.dynamicLifeArray[i].pName = this.life.policy_name;
                this.dynamicLifeArray[i].premium = this.life.premium;
                this.dynamicLifeArray[i].pterm = this.life.policy_term;
                this.dynamicLifeArray[i].issuer = this.life.issuer;
                this.dynamicLifeArray[i].sDate = this.life.start_date;
                this.dynamicLifeArray[i].premiumName = this.life.proposer_name;
                this.dynamicLifeArray[i].sum = this.life.sum;
                this.dynamicLifeArray[i].policynumber = this.life.policynumber;
                this.dynamicLifeArray[i].term = this.life.premium_term;
                this.dynamicLifeArray[i].pMode = this.life.premium_mode;
            }
        }
        this.Updatelife(id);
    }
    Updatelife(id) {
        this.life.id = id;
        this.life.userid = this.uid;

        this.lifeService.PutLife(this.life, this.uid).subscribe(res => {
            this.clear();
        });
    }
}
