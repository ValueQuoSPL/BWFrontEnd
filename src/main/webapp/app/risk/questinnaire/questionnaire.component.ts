import { Component, OnInit } from '@angular/core';
import { Principal } from 'app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-questionnaire',
    templateUrl: './questionnaire.component.html'
})
export class QuestionnaireComponent implements OnInit {
    account: Account;

    constructor(private principal: Principal, private router: Router) {}

    ngOnInit() {
        console.log('calling account');

        this.principal.identity().then(account => {
            this.account = account;
        });
    }
}
