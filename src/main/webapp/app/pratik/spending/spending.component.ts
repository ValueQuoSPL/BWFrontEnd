import { AccountService, LoginModalService, Principal } from 'app/core';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder} from '@angular/forms';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'jhi-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {

  resource: any;
  amount: any;
  expense;
  demoarr;
  i;
  closeResult: string;
  step = 0;
  uid;
  resource_react = new FormControl('');
  amount_react = new FormControl('');

  modalRef: NgbModalRef;

  // for material dialog
  panelOpenState = false;
  animal: string;
  name: string;

  account: Account;

  constructor(
    private principal: Principal,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log('inside spending Init()');
    this.principal.identity().then(account => {
      this.account = account;
    });

  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  clear() {
    this.resource = '';
    this.amount = '';
    this.expense = '';
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

}