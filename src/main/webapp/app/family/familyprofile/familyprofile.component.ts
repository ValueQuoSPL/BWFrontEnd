import { DatePipe } from '@angular/common';
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
    // date = new FormControl(new Date());
    commonid: any;
    Addmember = false;
    addbutton = true;
    date: any;
    conformkey: boolean;
    constructor(private Familypro: FamilyprofileService, public commonService: CommonSidebarService, private datePipe: DatePipe) {}

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
            this.Addmember = true;
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
    editDetail(id) {
        this.commonid = id;
        this.Familypro.updateProfileById(this.commonid).subscribe(res => {
            this.output = res;
            this.isValid = false;
            this.familyProfile.relationship = this.output.relationship;
            this.familyProfile.firstname = this.output.firstname;
            this.familyProfile.middlename = this.output.middlename;
            this.familyProfile.lastname = this.output.lastname;
            this.date = this.output.dateOfBirth;
            const finalDate = this.datePipe.transform(this.date, 'd/M/yy');
            this.familyProfile.dateOfBirth = new Date(finalDate);
            this.familyProfile.dateOfBirth = this.output.dateOfBirth;
            this.familyProfile.email = this.output.email;
            this.familyProfile.phonenumber = this.output.phonenumber;
            this.familyProfile.uid = this.uid;
            this.show = false;
        });
    }
    // update Method to Update Info of Familyprofile

    update() {
        this.familyProfile.id = this.commonid;
        this.Familypro.updateProfile(this.familyProfile).subscribe(responce => {
            this.getFamilyProfilebyid();
        });
    }
    formpage() {
        this.isValid = false;
    }
    viewpage() {
        this.isValid = true;
        this.getFamilyProfilebyid();
    }
    deletefamilyProfile(id) {
        this.commonid = id;
        this.conformkey = confirm('Are you sure you Want to permanently delete this item?');
        if (this.conformkey === true) {
            console.log(this.commonid);
            this.familyProfile.id = this.commonid;
            this.Familypro.DeleteFamilyProfile(this.familyProfile.id).subscribe(data => {
                this.getFamilyProfilebyid();
            });
        } else {
            this.getFamilyProfilebyid();
        }
    }
    resetValue() {
        this.familyProfile.relationship = '';
        this.familyProfile.firstname = '';
        this.familyProfile.firstname = '';
        this.familyProfile.firstname = '';
        this.familyProfile.firstname = '';
        this.familyProfile.middlename = '';
        this.familyProfile.lastname = '';
        this.familyProfile.dateOfBirth = null;
        this.familyProfile.email = '';
        this.familyProfile.phonenumber = null;
        this.familyProfile.uid = '';
        this.familyProfile.id = '';
    }
    AddNewMember() {
        this.resetValue();
        this.isValid = false;
        this.show = true;
    }
}
