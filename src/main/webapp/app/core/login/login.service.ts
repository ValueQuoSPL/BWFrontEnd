import { Injectable } from '@angular/core';

import { Principal } from 'app/core/auth/principal.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { CookieService } from 'ngx-cookie';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { UserIdleService } from 'angular-user-idle';
import { PlanService } from 'app/pratik/common/plan.service';
import { FamilyprofileService } from 'app/family/familyprofile/familyprofile.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    account: any;
    expiry = new Date();
    options = { expires: this.expiry };
    id: any;
    all: any;
    single: any;
    parentData: any;
    parentData1: any;
    parentid: any;
    parentData2: any;
    parentid1: any = 3;

    constructor(
        private principal: Principal,
        private authServerProvider: AuthServerProvider,
        private _cookieService: CookieService,
        private sc: CommonSidebarService,
        private planService: PlanService,
        private familyprofileService: FamilyprofileService
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};
        console.log(cb);

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        this.account = account;
                        // this.sc.account.next(this.account);
                        this.id = this.account.id;
                        console.log('id is', this.id);
                        console.log('log in user data is', this.account);
                        this.putCookie('1', this.account);
                        this.getCookie();
                        resolve(data);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        // console.log('login service logout');

        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
        this.deleteCookie('1');
    }

    getCookie() {
        //    this.all = this._cookieService.getAll();
        this.single = this._cookieService.getObject('1');
        return this.single;
    }

    // Checking Token
    isLoggedIn() {
        const details = this._cookieService.getObject('1');
        if (details) {
            return true;
        } else {
            return false;
        }
    }

    putCookie(key, data) {
        this.expiry = new Date();
        this.expiry.setMinutes(this.expiry.getMinutes() + 1440);
        this.options.expires = this.expiry;

        return this._cookieService.putObject(key, data, this.options);
    }

    deleteCookie(key: string) {
        return this._cookieService.remove(key);
    }

    checkParent() {
        console.log('in checkParent() id is', this.id);
        this.familyprofileService.checkParentSvc(this.id).subscribe(res => {
            this.parentData = res;
            console.log('in checkParent() parent data is', this.parentData);
            this.parentid = this.parentData.uid;
            console.log(' checkParent() parentid', this.parentid);
        });
        this.familyprofileService.getParentData(this.parentid1).subscribe(resp => {
            this.parentData1 = resp;
            console.log('in getdata() ParentData1 ', this.parentData1);
            this.sc.account.next(this.parentData1);
            this.putCookie('1', this.parentData1);
            console.log('cookie value ', this.getCookie());
            // this.getCookie();
        });
    }
    //     getdata() {
    //         console.log('in getdata() parentid1', this.parentid1);
    //         this.familyprofileService.getParentData(this.parentid1).subscribe( resp => {
    //             this.parentData1 = resp;
    //             console.log('in getdata() ParentData1 ', this.parentData1);
    //                      this.sc.account.next(this.parentData1);
    //                     this.putCookie('1', this.parentData1);
    //                     console.log('cookie value ', this.getCookie());
    //                     // this.getCookie();
    //     });
    // }
}
