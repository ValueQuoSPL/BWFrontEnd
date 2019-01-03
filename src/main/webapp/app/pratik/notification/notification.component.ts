import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/observable/interval';
import { NavbarComponent } from 'app/layouts';
import { PlanService } from '../common/plan.service';
import { NotificationService } from './notification.service';
import { NotifierService } from 'angular-notifier';
import { LoginService } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-notification',
    templateUrl: './notification.component.html',
    styles: []
})
export class NotificationComponent implements OnInit {
    counter = 0;
    data: string;
    notification: any;
    account: any;
    authority: any;
    uid: any;
    isAdmin: boolean;
    // emit value in sequence every 1 second
    // source = interval(1000);
    timer: number;

    constructor(
        private notifyService: NotificationService,
        private notifier: NotifierService,
        private loginService: LoginService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        // output: 0,1,2,3,4,5....
        // this.source.subscribe(val => {
        // this.timer = val;
        // });

        this.notifyService.showNotifier.subscribe(data => {});

        // this.getUserID();
        this.registerAuthenticationSuccess();
    }

    notify() {
        this.counter++;
        this.data = `hello this is your notification no. ${this.counter}`;
        this.notifyService.showNotification('success', this.data);
    }

    clear() {
        this.counter = 0;
        this.notifyService.onClearNotify();
    }

    getUserID() {}

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.account = this.loginService.getCookie();

            if (this.account) {
                this.uid = this.account.id;

                if (this.account.authorities[1]) {
                    this.authority = this.account.authorities[1];

                    if (this.authority === 'ROLE_ADMIN') {
                        this.isAdmin = true;
                    }
                }

                if (!this.isAdmin) {
                    this.checkNotification();
                }
            }
        });
    }

    checkNotification() {
        // this.notifyService.getNotification(this.uid).subscribe(data => {
        // });
    }
}
