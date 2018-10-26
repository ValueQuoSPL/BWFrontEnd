import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    plan = new ReplaySubject(0);
    planInfo = new ReplaySubject(0);
    isSubscribed = new ReplaySubject(0);
    constructor() {}
}
