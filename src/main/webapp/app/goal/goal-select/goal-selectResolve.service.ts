import { GoalselectService } from './goalselect.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '../../../../../../node_modules/@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class GoalResolveService implements Resolve<any> {
    constructor(private goalselectService: GoalselectService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.goalselectService.getgoalbyid();
    }
}
