import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../../css/fa/css/all.css']
})
@Injectable()
export class SidebarComponent implements OnInit, AfterViewInit {
  inProduction: boolean;
  isNavbarCollapsed: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  isLogin = false;
  account: Account;
  isMobile;

  constructor(
    private principal: Principal,
    private loginModalService: LoginModalService,
    private deviceService: DeviceDetectorService) {
      this.epicFunction();
    }

    epicFunction() {
      this.isMobile = this.deviceService.isMobile();
    }

  ngOnInit() {
    this.principal.identity().then(account => {
      this.account = account;
    });
  }

  ngAfterViewInit() {
    if (this.isMobile) {
      const x =  document.getElementById('main-menu');
      // x.style.width = '10px';
    }
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  showSidebar() {
    // console.log('inside sidebar');
    const x =  document.getElementById('main-menu').classList.toggle('expanded');
    // const x = document.getElementById('main-menu');
    // x.style.width = '-250px';
    // if (this.isMobile) {
    //   const z =  document.getElementById('main-menu');
    //   z.style.width = '250px';
    // }
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  Login() {
    // console.log(this.modalRef);
    this.modalRef = this.loginModalService.open();
    // console.log(this.modalRef);
  }
}
