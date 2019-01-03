import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Health, PrevHealth } from 'app/pratik/spending/spending.model';
import { HealthService } from 'app/pratik/spending/spending.service';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { LoginService } from 'app/core';

@Component({
    selector: 'jhi-health',
    templateUrl: './health.component.html',
    styleUrls: ['../spending.component.css']
})
export class HealthComponent implements OnInit {
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
    tempHealthArray: any = [];
    dynamicHealth: any = [];
    health: Health = new Health();
    prevHealth: PrevHealth = new PrevHealth();
    healthDate = new FormControl(new Date());

    PolicyTypeArray = [
        { name: 'Child Policy' },
        { name: 'Retirement Policy' },
        { name: 'Saving Policy' },
        { name: 'Investment Policy' },
        { name: 'Term Policy' }
    ];
    PremiumTypeArray = [{ name: 'Single' }, { name: 'Monthly' }, { name: 'Quarterly' }, { name: 'Half Yearly' }, { name: 'Yearly' }];
    account: any;
    isFieldChanged: boolean;
    update: boolean;
    constructor(
        private healthService: HealthService,
        private modalService: NgbModal,
        private commonService: CommonSidebarService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.getUserid();
    }

    getUserid() {
        this.account = this.loginService.getCookie();
        if (this.account) {
            this.uid = this.account.id;
            this.onGetHealth();
        }
    }

    clear() {
        this.resource = '';
        this.amount = '';
        this.expense = '';

        this.health.ins_name = '';
        this.health.issuer = '';
        this.health.policy_name = '';
        this.health.policy_no = '';
        this.health.policy_term = '';
        this.health.premium = '';
        this.health.premium_mode = '';
        this.health.proposer_name = '';
        this.health.start_date = '';
        this.health.sum = '';
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
    // health insurance
    openHealth(healthModal) {
        this.clear();
        this.update = false;
        this.modalService.open(healthModal, { ariaLabelledBy: 'healthModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.AddHealth();
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    AddHealth() {
        this.dynamicHealth.push({
            insureName: this.health.ins_name,
            policyName: this.health.policy_name,
            premium: this.health.premium,
            premiumTerm: this.health.policy_term,
            sum: this.health.sum,
            poNo: this.health.policy_no,
            issuer: this.health.issuer,
            prName: this.health.proposer_name,
            sDate: this.healthDate.value,
            pMode: this.health.premium_mode,
            userid: this.uid
        });
        this.health.healthModelArray.pop();
        this.health.healthModelArray.push({
            iName: this.health.ins_name,
            pName: this.health.policy_name,
            premium: this.health.premium,
            pterm: this.health.policy_term,
            sum: this.health.sum,
            poNo: this.health.policy_no,
            issuer: this.health.issuer,
            prName: this.health.proposer_name,
            sDate: this.healthDate.value,
            pMode: this.health.premium_mode,
            userid: this.uid
        });
        this.onHealthSave();
        this.clear();
    }
    RemoveHealth(index, id) {
        const res = confirm('Are you sure?');
        if (res) {
            this.healthService.DeleteHealth(id).subscribe(responce => {});
            this.dynamicHealth.splice(index, 1);
        }
    }
    onHealthSave(): void {
        this.health.userid = this.uid;
        // this.health.healthModelArray = this.dynamicHealth;
        this.healthService.PostHealth(this.health.healthModelArray).subscribe(data => {
            this.onGetHealth();
        });
    }
    onGetHealth(): void {
        this.healthService.GetHealth(this.uid).subscribe((response: any[]) => {
            this.dynamicHealth = response;
        });
    }

    onEditHealth(id, healthModal) {
        this.update = true;
        this.isFieldChanged = false;
        this.fillModal(id);
        this.modalService.open(healthModal, { ariaLabelledBy: 'healthModal' }).result.then(
            result => {
                this.closeResult = `Closed with: ${result}`;
                this.fillhealthArray(id);
            },
            reason => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
        );
    }
    fillModal(id) {
        this.tempHealthArray = this.dynamicHealth;

        for (let i = 0; i < this.tempHealthArray.length; i++) {
            if (this.tempHealthArray[i].id === id) {
                this.health.ins_name = this.tempHealthArray[i].insureName;
                this.health.policy_name = this.tempHealthArray[i].policyName;
                this.health.premium = this.tempHealthArray[i].premium;
                this.health.policy_term = this.tempHealthArray[i].premiumTerm;
                this.health.issuer = this.tempHealthArray[i].issuer;
                this.health.start_date = this.tempHealthArray[i].date;
                this.health.proposer_name = this.tempHealthArray[i].premiumName;
                this.health.sum = this.tempHealthArray[i].sum;
                this.health.policy_no = this.tempHealthArray[i].policyNumber;
                this.health.premium_mode = this.tempHealthArray[i].policyMode;

                this.prevHealth.ins_name = this.tempHealthArray[i].insureName;
                this.prevHealth.policy_name = this.tempHealthArray[i].policyName;
                this.prevHealth.premium = this.tempHealthArray[i].premium;
                this.prevHealth.issuer = this.tempHealthArray[i].issuer;
                this.prevHealth.start_date = new FormControl(new Date(this.tempHealthArray[i].date));
                this.prevHealth.proposer_name = this.tempHealthArray[i].premiumName;
                this.prevHealth.sum = this.tempHealthArray[i].sum;
                this.prevHealth.policy_no = this.tempHealthArray[i].policyNumber;
                this.prevHealth.policy_term = this.tempHealthArray[i].premiumTerm;
                this.prevHealth.premium_mode = this.tempHealthArray[i].policyMode;
            }
        }
    }
    fillhealthArray(id) {
        for (let i = 0; i < this.dynamicHealth.length; i++) {
            if (this.dynamicHealth[i].id === id) {
                this.dynamicHealth[i].id = this.health.id;
                this.dynamicHealth[i].insureName = this.health.ins_name;
                this.dynamicHealth[i].policyName = this.health.policy_name;
                this.dynamicHealth[i].premium = this.health.premium;
                this.dynamicHealth[i].premiumTerm = this.health.policy_term;
                this.dynamicHealth[i].issuer = this.health.issuer;
                this.dynamicHealth[i].sDate = this.health.start_date;
                this.dynamicHealth[i].premiumName = this.health.proposer_name;
                this.dynamicHealth[i].sum = this.health.sum;
                this.dynamicHealth[i].policyNumber = this.health.policy_no;
                this.dynamicHealth[i].policyMode = this.health.premium_mode;
            }
        }
        this.Updatehealth(id);
    }
    Updatehealth(id) {
        this.health.id = id;
        this.health.userid = this.uid;
        this.healthService.PutHealth(this.health, this.uid).subscribe(res => {
            this.clear();
        });
    }
    ChangeDetector(event, from) {
        if (from === 'number') {
            if (this.prevHealth.policy_no !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'issuer') {
            if (this.prevHealth.issuer !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'insured') {
            if (this.prevHealth.ins_name !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'proposer') {
            if (this.prevHealth.proposer_name !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'date') {
            const prevdate = new Date(this.prevHealth.start_date.value);
            prevdate.setHours(0);
            prevdate.setMinutes(0);
            prevdate.setSeconds(0);

            const newdate = new Date(this.healthDate.value);
            newdate.setHours(0);
            newdate.setMinutes(0);
            newdate.setSeconds(0);

            // tslint:disable-next-line:triple-equals
            if (prevdate !== newdate) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'term') {
            if (this.prevHealth.policy_term !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'mode') {
            if (this.prevHealth.premium_mode !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'policy') {
            if (this.prevHealth.policy_name !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'sum') {
            if (this.prevHealth.sum !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'premium') {
            if (this.prevHealth.premium !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        } else if (from === 'premiumterm') {
            if (this.prevHealth.policy_term !== event) {
                this.isFieldChanged = true;
            } else {
                this.isFieldChanged = false;
            }
        }
    }
}
