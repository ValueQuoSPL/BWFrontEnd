import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { JhiMainComponent } from 'app/layouts';
import { SidebarComponent } from 'app/layouts/sidebar/sidebar.component';
import { CommonSidebarService } from 'app/pratik/common/sidebar.service';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    flag = false;

    constructor(
        private stateStorageService: StateStorageService,
        private renderer: Renderer,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private elementRef: ElementRef,
        private router: Router,
        public activeModal: NgbActiveModal,
        private commonSidebarService: CommonSidebarService
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        this.activeModal.dismiss('cancel');
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                this.activeModal.dismiss('login success');
                this.router.navigate(['/dashboard']);

                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['/dashboard']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
                // this.toggle();
                this.commonSidebarService.sidebarSource.next(true);
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

    // toggle() {
    //     // let flag = false;
    //     this.flag = !this.flag;
    //     // this.main.toggleSide(this.flag);
    //     // this.sidebar.showSidebar();
    // }

    register() {
        console.log('in register method');
        this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
