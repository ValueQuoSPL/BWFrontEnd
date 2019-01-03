import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

class Notify {
    type: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    // notifyNavbar = new Subject();
    clearNotify = new Subject();
    showNotifier = new Subject();

    obj = new Notify();

    constructor(private notifier: NotifierService, private http: HttpClient) {}

    onClearNotify() {
        this.clearNotify.next(0);
    }

    showNotification(type: string, message: string): void {
        // this.obj.type = type;
        // this.obj.message = message;
        this.showNotifier.next(message);
        // this.notifier.notify(type, message);
    }

    getNotification(uid: number): any {
        const url = `${SERVER_API_URL}api/notifications/get/${uid}`;
        return this.http.get(url);
    }
}
