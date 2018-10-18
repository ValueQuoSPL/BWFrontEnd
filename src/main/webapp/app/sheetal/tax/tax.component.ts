import { Component, OnInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {
  modalRef: NgbModalRef;

  constructor(
    private principal: Principal,
    private loginModalService: LoginModalService
  ) {}

  ngOnInit() {}
  isAuthenticated() {
    return this.principal.isAuthenticated();
  }
  login() {
    this.modalRef = this.loginModalService.open();
  }
}
