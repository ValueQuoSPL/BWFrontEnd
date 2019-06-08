import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonSidebarService {
    a: any;
    // sidebarSource = new ReplaySubject(0);
    // newlogin = new ReplaySubject(0);
    account = new ReplaySubject(this.a);
    logout = new ReplaySubject(0);
    Expiry = new ReplaySubject(0);
    allUserdata = new ReplaySubject(0);

    constructor() {}
}
