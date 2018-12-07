import { GoalselectService } from './goalselect.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnInit } from '../../../../../../node_modules/@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';
import { CookieService } from 'ngx-cookie';
import { LoginService } from 'app/core';

@Injectable()
export class GoalResolveService implements OnInit, Resolve<any> {
    account: any;
    uid: any;
    ac: any;
    constructor(
        private goalselectService: GoalselectService,
        private commonService: CommonSidebarService,
        private loginService: LoginService,
        private router: Router
    ) {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
        });
    }
    ngOnInit() {
        this.commonService.account.subscribe(account => {
            this.account = account;
            this.uid = this.account.id;
        });
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let id: any = route.paramMap.get('id');
        id = id / 1993;
        this.ac = this.loginService.getCookie();

        if (this.ac) {
            return this.goalselectService.getGoal(id);
        } else {
            this.router.navigate(['']);
            return null;
        }
    }
}
