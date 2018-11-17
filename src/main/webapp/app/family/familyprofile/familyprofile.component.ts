import { Component, OnInit } from '@angular/core';
import { FamilyprofileService } from 'app/family/familyprofile/familyprofile.service';
import { FormControl } from '@angular/forms';
import { FamilyProfile } from 'app/family/familyprofile/familyprofile.model';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';

@Component({
    selector: 'jhi-familyprofile',
    templateUrl: './familyprofile.component.html',
    styleUrls: []
})
export class FamilyprofileComponent implements OnInit {
    familyProfile: FamilyProfile = new FamilyProfile();
    output: any = [];
    user: any;
    uid: string;
    isValid: boolean;
    show = true;
    earncheck = 'notearning';
    account: any;
    date = new FormControl(new Date());

    constructor(private Familypro: FamilyprofileService, public commonService: CommonSidebarService) {}

    ngOnInit() {
        this.FetchId();
    }
    // FetchIdMethod to to get Info Of Current Logged User
    FetchId() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
            this.getFamilyProfilebyid();
        });
    }
    // saveMethod to saveFamilyprofile
    saveFamilyProfile() {
        this.familyProfile.uid = this.uid;
        this.familyProfile.earncheck = this.earncheck;
        this.Familypro.save(this.familyProfile).subscribe(data => {
            this.getFamilyProfilebyid();
        });
    }
    getFamilyProfile() {
        this.Familypro.getFamilyProfile().subscribe(res => {
            this.output = res;
        });
    }
    // getFamilyProfilebyid Method to fetch Familyprofile info by UserId
    getFamilyProfilebyid() {
        this.Familypro.getFamilyProfileByUid(this.uid).subscribe(res => {
            this.output = res;
            // if (this.output[0].uid != null) {
            //     this.isValid = true;
            // } else {
            //     this.isValid = false;
            // }
            if (this.output.length === 0) {
                this.isValid = false;
            } else {
                this.isValid = true;
            }
        });
    }
    newFunction() {
        this.earncheck = 'Earning';
    }
    // editDetail Method to Edit Info of Familyprofile
    editDetail() {
        for (let index = 0; index < this.output.length; index++) {
            this.isValid = false;
            this.familyProfile.relationship = this.output[index].relationship;
            this.familyProfile.firstname = this.output[index].firstname;
            this.familyProfile.middlename = this.output[index].middlename;
            this.familyProfile.lastname = this.output[index].lastname;
            this.familyProfile.dateOfBirth = this.output[index].dateOfBirth;
            this.familyProfile.email = this.output[index].email;
            this.familyProfile.phonenumber = this.output[index].phonenumber;
            this.familyProfile.uid = this.uid;
            this.show = false;
        }
        // this.isValid = false;
        // this.familyProfile.relationship = this.output[0].relationship;
        // this.familyProfile.firstname = this.output[0].firstname;
        // this.familyProfile.middlename = this.output[0].middlename;
        // this.familyProfile.lastname = this.output[0].lastname;
        // this.familyProfile.dateOfBirth = this.output[0].dateOfBirth;
        // this.familyProfile.email = this.output[0].email;
        // this.familyProfile.phonenumber = this.output[0].phonenumber;
        // this.familyProfile.uid = this.uid;
        // this.show = false;
    }
    // update Method to Update Info of Familyprofile

    update() {
        this.Familypro.updateProfile(this.familyProfile).subscribe(responce => {
            this.getFamilyProfilebyid();
        });
    }
    formpage() {
        this.isValid = false;
    }
    viewpage() {
        this.isValid = true;
    }
}
