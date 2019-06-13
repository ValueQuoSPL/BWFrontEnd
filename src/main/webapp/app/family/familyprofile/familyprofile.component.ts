import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer, ElementRef, AfterViewInit } from '@angular/core';
import { FamilyprofileService } from 'app/family/familyprofile/familyprofile.service';
import { FamilyProfile } from 'app/family/familyprofile/familyprofile.model';
import { CommonSidebarService } from '../../pratik/common/sidebar.service';
import { Register } from 'app/account/register/register.service';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared';
import { User, Principal, UserService, LoginModalService } from 'app/core';
import { Fpc } from 'app/family/familyprofile/fp.model';
import { ActivateService } from 'app/account/activate/activate.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { ITEMS_PER_PAGE } from 'app/shared';
import { PasswordResetInitService } from 'app/account/password-reset/init/password-reset-init.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-familyprofile',
    templateUrl: './familyprofile.component.html',
    styleUrls: []
})
export class FamilyprofileComponent implements OnInit, AfterViewInit {
    [x: string]: any;
    familyProfile: FamilyProfile = new FamilyProfile();
    fo: Fpc = new Fpc();
    output: any = [];
    user: any;
    uid: string;
    isValid: boolean;
    show = true;
    earncheck = 'notearning';
    unchecked = false;
    users: User[];

    account: any;
    // date = new FormControl(new Date());
    commonid: any;
    Addmember = false;
    addbutton = true;
    date: any;
    conformkey: boolean;
    temppsw: string;
    possible: any;
    login: string;
    conditionalEmail: false;

    // isChecked: false; // added by ranjan
    // isActivated = true;

    routeData: any;
    predicate: any;
    queryCount: any;
    links: any;
    totalItems: any;
    familyaccess = ' No';
    checkaccesstype = 'Full';
    active = true;
    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: string;

    userid;
    registerAccount: any;
    confirmPassword: string;
    password: string;
    useraggree: string;
    isCheck: Boolean = false;
    doNotMatch: string;

    errorEmailExists: string;
    isEmail: boolean = false;
    errorUserExists: string;

    submitEvent = false;
    userMailOtp;
    systemMailOtp;
    VerifyButtonClicked = false;
    isVerify = false;
    emailExt: string;
    act = true;

    itemsPerPage: any;
    page: number;

    constructor(
        private activateService: ActivateService,
        private passwordResetInitService: PasswordResetInitService,
        private registerService: Register,
        private Familypro: FamilyprofileService,
        public commonService: CommonSidebarService,
        private datePipe: DatePipe,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private userService: UserService,
        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private modalService: NgbModal,
        private activatedRoute: ActivatedRoute
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.FetchId();
        this.resetAccount = {};
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
        if (this.isEmail) {
        } else if (!this.isEmail) {
            this.familyProfile.uid = this.uid;
            this.familyProfile.earncheck = this.earncheck;
            this.familyProfile.familyaccess = this.familyaccess;
            // this.email = this.familyProfile.email;

            this.makeid();
            this.register();

            this.Familypro.save(this.familyProfile).subscribe(data => {
                this.getFamilyProfilebyid();
            });
        }
    }

    checkEmail() {
        // console.log(this.familyProfile.email);
        this.Familypro.emailExist(this.familyProfile.email).subscribe(
            () => {
                console.log('email not exist');
                this.isEmail = false;
            },
            response => {
                if (response.error.text === this.familyProfile.email) {
                    this.isEmail = true;
                } else {
                    this.isEmail = false;
                }
            }
        );
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        // if ( response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE ) {
        if (response.error.errorKey === 'userexists') {
            this.errorUserExists = 'ERROR';
            console.log(this.errorEmailExists);
            // } else if ( response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE ) {
        } else if (response.error.errorKey === 'emailexists') {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
            // this.success = true;
        }
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
        this.unchecked = true;
    }
    familyaccessfunction(event: any) {
        this.familyaccess = 'Yes';
        this.conditionalEmail = event.checked;
        console.log(this.conditionalEmail);
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
            // this.date = this.output.dateOfBirth;
            // const finalDate = this.datePipe.transform(this.date, 'd/M/yy');
            // this.familyProfile.dateOfBirth = new Date(finalDate);
            this.date = this.output.dateOfBirth;
            const finalDate = this.datePipe.transform(this.date, 'd/M/yy');
            this.familyProfile.dateOfBirth = new Date(finalDate);
            this.familyProfile.email = this.output.email;
            this.familyProfile.phonenumber = this.output.phonenumber;
            this.familyProfile.uid = this.uid;
            this.show = false;
            this.unchecked = true;
            // added by ranjan.............................
            this.familyProfile.accesstype = this.output.accesstype;
            this.familyProfile.familyaccess = this.output.familyaccess;
        });
    }
    // update Method to Update Info of Familyprofile

    update() {
        if (this.isEmail) {
        } else if (!this.isEmail) {
            this.isEmail = false;
            this.familyProfile.id = this.commonid;
            console.log('family access', this.familyProfile);
            this.Familypro.updateProfile(this.familyProfile).subscribe(responce => {
                this.getFamilyProfilebyid();
            });
        }
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
        // added by ranjan.............................
        this.familyProfile.accesstype = '';
        this.familyProfile.familyaccess = '';
    }
    AddNewMember() {
        this.resetValue();
        this.isValid = false;
        this.show = true;
    }
    // added by ranjan.............................
    register() {
        this.fo.password = this.temppsw;
        this.fo.login = this.familyProfile.email;
        this.fo.email = this.familyProfile.email;
        this.fo.firstName = this.familyProfile.firstname;
        this.fo.lastName = this.familyProfile.lastname;
        this.fo.mobile = this.familyProfile.phonenumber;
        this.fo.langKey = 'en';
        this.fo.useraggree = 'yes';
        this.Familypro.postDetailsForAccess(this.fo).subscribe(data => {
            if (data) {
                this.requestReset();
            }
        });
        alert('User Id and Password reset email has been send to your family member');
    }
    AfterOtpValidation(): any {
        throw new Error('Method not implemented.');
    }

    makeid() {
        this.temppsw = '';
        this.possible = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789@';

        for (let i = 0; i < 8; i++) {
            this.temppsw += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
        }

        return this.temppsw;
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#email'), 'focus', []);
    }

    requestReset() {
        this.error = null;
        this.errorEmailNotExists = null;
        this.resetAccount.email = this.familyProfile.email;

        this.passwordResetInitService.Familyaccesssave(this.resetAccount.email).subscribe(
            () => {
                this.success = 'OK';
            },
            response => {
                this.success = null;
                if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
                    this.errorEmailNotExists = 'ERROR';
                } else {
                    this.error = 'ERROR';
                }
            }
        );
    }
}
