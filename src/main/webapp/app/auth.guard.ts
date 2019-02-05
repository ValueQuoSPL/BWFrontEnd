import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServerProvider, LoginService } from './core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _Auth: LoginService, private _route: Router) {}

    canActivate(): boolean {
        if (this._Auth.isLoggedIn()) {
            return true;
        } else {
            this._route.navigate(['/']);
            return false;
        }
    }
}
