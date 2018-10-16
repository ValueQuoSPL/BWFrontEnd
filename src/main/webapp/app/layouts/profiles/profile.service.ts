import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SERVER_API_URL } from 'app/app.constants';
import { ProfileInfo } from './profile-info.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private infoUrl = SERVER_API_URL + 'management/info';
    private profileInfo: Promise<ProfileInfo>;

    constructor(private http: HttpClient) {}

    getProfileInfo(): Promise<ProfileInfo> {
        if (!this.profileInfo) {
            this.profileInfo = this.http.get<ProfileInfo>(this.infoUrl, { observe: 'response' })
                .pipe(map((res: HttpResponse<ProfileInfo>) => {
                    const data = res.body;
                    console.log('profile response', data);

                    const pi = new ProfileInfo();
                    pi.activeProfiles = data.activeProfiles;
                    console.log('active', pi.activeProfiles);

                    pi.ribbonEnv = data.ribbonEnv;
                    pi.inProduction = data.activeProfiles.includes('prod') ;
                    pi.swaggerEnabled = data.activeProfiles.includes('swagger');
                    console.log('swagger', pi.swaggerEnabled);

                    return pi;
                })).toPromise();
        }
        return this.profileInfo;
    }

    // getProfileInfo() {
    //         return this.http.get(this.infoUrl, { observe: 'response' })
    //             .pipe(map(res => {
    //                 const data = res.body;
    //                 console.log('profile response', res);

    //     })).toPromise();
    // }

    // getNewProfileInfo(): Promise<ProfileInfo> {
    //     if (!this.profileInfo) {
    //         this.profileInfo = this.http
    //             .get<ProfileInfo>(this.infoUrl, { observe: 'response' })
    //             .pipe(map((res: HttpResponse<ProfileInfo>) => {
    //                     const data = res.body;
    //                     const pi = new ProfileInfo();
    //                     pi.activeProfiles = data['activeProfiles'];
    //                     const displayRibbonOnProfiles = data['display-ribbon-on-profiles'].split(',');
    //                     if (pi.activeProfiles) {
    //                         const ribbonProfiles = displayRibbonOnProfiles.filter(profile => pi.activeProfiles.includes(profile));
    //                         if (ribbonProfiles.length !== 0) {
    //                             pi.ribbonEnv = ribbonProfiles[0];
    //                         }
    //                         pi.inProduction = pi.activeProfiles.includes('prod');
    //                         pi.swaggerEnabled = pi.activeProfiles.includes('swagger');
    //                     }
    //                     return pi;
    //                 })).toPromise();
    //     }
    //     return this.profileInfo;
    // }
}
