import { LoginService } from 'app/core/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModalService, Principal } from 'app/core';
import { Myprofile } from 'app/family/family.modal';
import { FamilyserviceService } from 'app/family/familyservice.service';
import { Familyprofile, Assumption } from 'app/family/family.modal';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'jhi-family',
    templateUrl: './family.component.html',
    styleUrls: []
})
export class FamilyComponent implements OnInit {
    panelMyprofileState = false;
    panelFamilyprofileState = false;
    servers: any;
    modalRef: NgbModalRef;
    notLogIn = false;
    account2: any;
    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private loginService: LoginService,
        private router: Router
    ) {}

    ngOnInit() {
        this.checkLogIn();
    }
    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    // saveDetail(): void {
    //     this.MyProfile.push({
    //         fname: this.myProfile.fname,
    //         mname: this.myProfile.mname,
    //         lname: this.myProfile.lname,
    //         dob: this.myProfile.dob,
    //         gender: this.myProfile.gender,
    //         maritalstatus: this.myProfile.maritalstatus,
    //         mobile: this.myProfile.mobile,
    //         almobile: this.myProfile.almobile,
    //         occupation: this.myProfile.occupation,
    //         company: this.myProfile.company,
    //         howknow: this.myProfile.howknow,
    //         address: this.myProfile.address,
    //         email: this.myProfile.email,
    //         pan: this.myProfile.pan,
    //         country: this.myProfile.country,
    //         state: this.myProfile.state,
    //         city: this.myProfile.city,
    //         pin: this.myProfile.pin
    //     }),
    //         this.familyservice.saveDetails(this.MyProfile).subscribe();
    // }
    // saveFPdetail(): void {
    //     this.FamilyProfile.push({
    //         relationship: this.familyProfile.relationship,
    //         fname: this.familyProfile.fsname,
    //         mname: this.familyProfile.mname,
    //         lname: this.familyProfile.lname,
    //         email: this.familyProfile.email,
    //         dob: this.familyProfile.dob,
    //         phonenum: this.familyProfile.phonenum,
    //         occup: this.familyProfile.occup,
    //         check: this.familyProfile.check
    //     });
    //     this.familyservice.saveFPdetail(this.FamilyProfile).subscribe(data => {
    //         alert('Data saved successfully');
    //     });
    // }
    // saveAssumption(): void {
    //     this.Assumption.push({
    //         BRrateOfReturn: this.assumption.BRrateOfReturn,
    //         BRinflation: this.assumption.BRinflation,
    //         BRrealRateOfReturn: this.assumption.BRrealRateOfReturn,
    //         ARrateOfReturn: this.assumption.ARrateOfReturn,
    //         ARinflation: this.assumption.ARinflation,
    //         ARrealRateOfReturn: this.assumption.ARrealRateOfReturn,
    //         SurplusPercentInvest: this.assumption.SurplusPercentInvest,
    //         SurplusPercentInsurance: this.assumption.SurplusPercentInsurance,
    //         AgeOfRetirement: this.assumption.AgeOfRetirement,
    //         LifeExpentancy: this.assumption.LifeExpentancy
    //     });
    //     this.familyservice.saveAssumption(this.Assumption).subscribe(data => {
    //         alert('Data saved successfully');
    //     });
    // }
    login() {
        this.modalRef = this.loginModalService.open();
    }
    checkLogIn() {
        this.account2 = this.loginService.getCookie();
        if (this.account2) {
            this.notLogIn = true;
        } else {
            // this.notLogIn = false;
            this.router.navigate(['/main']);
        }
    }
}
