import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    deviceInfo = null;
    isMobile;
    isTablet;
    isDesktop;

    // tslint:disable-next-line:max-line-length
    constructor(private titleService: Title, private router: Router, private loginModalService: LoginModalService, private principal: Principal, private eventManager: JhiEventManager,
        private deviceService: DeviceDetectorService) {
        this.epicFunction();
    }

    epicFunction() {
        // this.deviceInfo = this.deviceService.getDeviceInfo();
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
        this.isDesktop = this.deviceService.isDesktop();
      }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string =
            routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'buckswiseFrontEndApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });

        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    toggleSide(flag) {

        const element = document.getElementById('toggle');
        if (!this.isMobile) {
            if (flag) {
                element.setAttribute('style', 'margin-left: 250px;');
            } else {
                element.setAttribute('style', 'margin-left: 0px;');
            }
        }
    }
}
