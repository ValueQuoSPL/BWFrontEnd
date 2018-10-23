import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Register } from 'app/account/register/register.service';
import { EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared';

import { UserMgmtComponent } from 'app/admin';
import { User, UserService, LoginModalService } from 'app/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;
    submitEvent = false;
    userMailOtp;
    systemMailOtp;
    VerifyButtonClicked = false;
    isVerify = false;

    userMgmt: UserMgmtComponent;
    users: User[];
    param;

    constructor(
        private loginModalService: LoginModalService,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};

        this.param = this.router.url;
        if (this.param === '/register') {
            this.registerService.isRegisterPage.next(true);
        } else {
            this.registerService.isRegisterPage.next(false);
        }
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }
    resolved(captchaResponse: string) {
        this.registerAccount.gcaptcha = captchaResponse;
    }

    register() {
        const resp = grecaptcha.getResponse();
        const x = resp.length;
        if (x === 0) {
            document.getElementById('g-recaptcha-error').innerHTML = '<span style = "color:red;">Please Verify the Captcha</span>';
        } else {
            this.registerAccount.gcaptcha = resp;
            this.submitEvent = true;
            if (this.registerAccount.password !== this.confirmPassword) {
                this.doNotMatch = 'ERROR';
            } else {
                this.doNotMatch = null;
                this.error = null;
                this.errorUserExists = null;
                this.errorEmailExists = null;
                this.registerAccount.langKey = 'en';
                this.registerService.save(this.registerAccount).subscribe(
                    () => {
                        this.success = true;
                    },
                    response => {
                        // console.log('err occured 3', response.error.errorKey);
                        this.processError(response);
                    }
                );
            }
        }
    }

    private processError(response: HttpErrorResponse) {
        this.success = null;
        // if ( response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE ) {
        if (response.error.errorKey === 'userexists') {
            this.errorUserExists = 'ERROR';
            // } else if ( response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE ) {
        } else if (response.error.errorKey === 'emailexists') {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
            // this.success = true;
        }
    }

    verify() {
        this.router.navigate(['activate'], {
            queryParams: { key: this.userMailOtp }
        });
    }
    findUser() {
        this.loadAll();
        for (const user of this.users) {
            if (user.email === this.registerAccount.email) {
                console.log('user found ', user.email);
                // this.userMgmt.setActive(user, true);
            }
        }
    }

    loadAll() {
        this.registerService.getUsers().subscribe(data => (this.users = data));
        this.userMgmt.loadAll();
    }
    onSuccess(data, headers) {
        this.users = data;
    }
    onError(error) {
        console.log('ERROR: getting user data ', error);
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }
}
