import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpendingRouteGuardService {
    GuardSource = new ReplaySubject(0);
    accordion = new ReplaySubject(0);

    constructor() {}
}
