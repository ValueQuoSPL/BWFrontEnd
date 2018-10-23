import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { Principal, LoginModalService } from 'app/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.css']
})
export class JhiMainComponent implements OnInit, AfterViewInit {
    account: Account;
    modalRef: NgbModalRef;
    deviceInfo = null;
    isMobile;
    isTablet;
    isDesktop;
    globalElement: HTMLElement;
    toggleFlag: any;
    push;
    pull;
    flag = false;

    @ViewChild('toggleClass') toggle: ElementRef;
    // tslint:disable-next-line:max-line-length
    constructor(
        private titleService: Title,
        private router: Router,
        private loginModalService: LoginModalService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private commonSidebarService: CommonSidebarService,
        private renderer: Renderer,
        private element: ElementRef,
        private deviceService: DeviceDetectorService
    ) {
        this.epicFunction();
    }

    epicFunction() {
        // this.deviceInfo = this.deviceService.getDeviceInfo();
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
        this.isDesktop = this.deviceService.isDesktop();
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'Buckswise';
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

    ngAfterViewInit() {
        console.log('setting after view init');
        // document.getElementById('toggle').style.marginLeft = '200px';
        // element.setAttribute('style', 'margin-left: 200px;');
        // this.toggle.nativeElement.style.marginLeft = '200px';
        // const element = document.getElementById('toggle');
        // console.log('get element by Id', element);
        // console.log('element ref', this.element.nativeElement);
        // console.log('view child', this.toggle);
        // console.log('toggle', this.element.nativeElement.querySelector('toggleClass'));
        // this.renderer.setElementStyle(
        //     this.element.nativeElement.querySelector('#toggle'), 'margin-left: 200px;', []);

        if (!this.isMobile) {
            this.flag = true;
        }
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        const flag = this.principal.isAuthenticated();
        // if (flag === true) {
        //     this.toggleSide(true);
        // }
        return flag;
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    toggleSide(flag) {
        const element = document.getElementById('toggle');
        if (!this.isMobile) {
            if (flag) {
                element.setAttribute('style', 'margin-left: 0px;');
            } else {
                element.setAttribute('style', 'margin-left: 200px;');
            }
        }
    }
}
