import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlanService {
    plan = new ReplaySubject(0);
    planInfo = new ReplaySubject(0);
    isPaid = new BehaviorSubject(false);
    user = new ReplaySubject(0);
    constructor() {}
}
