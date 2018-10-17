import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SuccessService } from 'app/success/success.service';
import { AccountService, Principal, LoginModalService } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-success',
  templateUrl: './success.component.html',
  styles: []
})
export class SuccessComponent implements OnInit, AfterViewInit {
  last: any;
  result: any = [];
  uid: any;
  userid: any;
  account: Account;
  constructor(
    private successService: SuccessService,
    private accountService: AccountService,
    private principal: Principal,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private router: Router
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }
  ngAfterViewInit() {}

  getUserid() {
    return this.accountService
      .get()
      .toPromise()
      .then(response => {
        const account = response.body;
        if (account) {
          this.uid = account.id;
          this.successService.getTransactionData(this.uid).subscribe(data => {
            this.result = data;
            this.last = this.result.pop();
          });
        } else {
        }
      })
      .catch(err => {});
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', message => {
      this.principal.identity().then(account => {
        this.account = account;
        this.userid = this.account.id;
      });
    });
    this.getUserid();
  }

  GoDashBoard() {
    this.router.navigate(['dashboard']);
  }
}
