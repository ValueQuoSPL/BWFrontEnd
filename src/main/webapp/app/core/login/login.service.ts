import { Injectable } from '@angular/core';

import { Principal } from 'app/core/auth/principal.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { CookieService } from 'ngx-cookie';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { UserIdleService } from 'angular-user-idle';

@Injectable({ providedIn: 'root' })
export class LoginService {
    account: any;
    expiry = new Date();
    options = { expires: this.expiry };
    id: any;
    all: any;
    single: any;

    constructor(
        private principal: Principal,
        private authServerProvider: AuthServerProvider,
        private _cookieService: CookieService,
        private sc: CommonSidebarService,
        private userIdle: UserIdleService
    ) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        this.account = account;

                        this.sc.account.next(this.account);
                        this.startWatching();

                        this.id = this.account.id;
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

    startWatching() {
        this.userIdle.startWatching();
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
        this.deleteCookie('1');
    }

    getCookie() {
        //    this.all = this._cookieService.getAll();
        this.single = this._cookieService.getObject('1');
        return this.single;
    }

    putCookie(key, data) {
        this.expiry = new Date();
        this.expiry.setMinutes(this.expiry.getMinutes() + 10);
        this.options.expires = this.expiry;

        return this._cookieService.putObject(key, data, this.options);
    }

    deleteCookie(key: string) {
        return this._cookieService.remove(key);
    }
}
