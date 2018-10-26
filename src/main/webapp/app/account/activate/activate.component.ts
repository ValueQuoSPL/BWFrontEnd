import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { ActivateService } from 'app/account/activate/activate.service';
import { LoginModalService } from 'app/core';

import { MyloginService } from 'app/account/mobile-otp/mylogin.service';
import { Mylogin } from 'app/account/mobile-otp/mylogin.model';

@Component({
    selector: 'jhi-activate',
    templateUrl: './activate.component.html'
})
export class ActivateComponent implements OnInit {
    error: string;
    success: string;
    final: boolean;
    modalRef: NgbModalRef;
    key;
    mylogin: Mylogin = new Mylogin();
    validnumber = 'false';
    isVerify = 'false';
    VerifyButtonClicked = 'false';

    constructor(
        private activateService: ActivateService,
        private loginModalService: LoginModalService,
        private route: ActivatedRoute,
        private myloginService: MyloginService,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.key = params['key'];
        });
    }

    login() {
        this.modalRef = this.loginModalService.open();
        this.router.navigate(['/']);
    }

    submit(): void {
        this.validnumber = 'true';
        this.myloginService.submit(this.mylogin).subscribe(data => {
            alert('OTP sent to your Mobile Successfully');
        });
    }

    verify() {
        this.VerifyButtonClicked = 'true';
        if (this.mylogin.otp === this.mylogin.verifyotp) {
            this.isVerify = 'true';
        } else {
            this.isVerify = 'false';
        }
    }

    AfterOtpValidation() {
        this.activateService.get(this.key).subscribe(
            () => {
                this.error = null;
                this.success = 'OK';
                this.AddUserMobile();
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );
        this.final = true;
    }

    AddUserMobile() {
        if (this.success) {
            // update user with mobile no.
        }
    }
}
