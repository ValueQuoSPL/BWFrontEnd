import { Injectable } from '@angular/core';

import { Principal } from 'app/core/auth/principal.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    account: any;
    constructor(private principal: Principal, private authServerProvider: AuthServerProvider, private _cookieService: CookieService) {}

    login(credentials, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        this.account = account;
                        const id: string = this.account.id;
                        console.log(id);

                        this.putCookie('1', this.account);
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
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
        this.deleteCookie('1');
    }

    getCookie() {
        const all: {} = this._cookieService.getAll();
        console.log(all);

        return this._cookieService.get('1');
    }

    putCookie(key: string, data) {
        return this._cookieService.set(key, data);
    }

    deleteCookie(key: string) {
        return this._cookieService.delete(key);
    }
}
