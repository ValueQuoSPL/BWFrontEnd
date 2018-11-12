import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        // this.principal.identity('home').then(account => {
        //   this.account = account;
        // });
        // this.registerAuthenticationSuccess();
    }

    // registerAuthenticationSuccess() {
    //     // this.eventManager.subscribe('authenticationSuccess', message => {
    //     //   this.principal.identity('after login home').then(account => {
    //     //     this.account = account;
    //     //   });
    //     // });
    // }

    // isAuthenticated() {
    // console.log('home -> authenticate');

    //     return this.principal.isAuthenticated();
    // }

    // login() {
    //     this.modalRef = this.loginModalService.open();
    // }
}
