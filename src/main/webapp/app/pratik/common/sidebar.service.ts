import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonSidebarService {
    sidebarSource = new ReplaySubject(0);
    constructor() {}
}
