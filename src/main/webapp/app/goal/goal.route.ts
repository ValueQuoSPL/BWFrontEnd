// // import { Routes } from '@angular/router';

// // import {
// //     goalSelectRoute

// // } from './';

// // const GOAL_ROUTES = [
// //     goalSelectRoute
// // ];

// // export const goalState: Routes = [{
// //     path: '',
// //     children: GOAL_ROUTES
// // }];
import { Route } from '@angular/router';

import { GoalComponent } from 'app/goal';
// import { GoalSelectComponent } from './Goal-select/goalselect.component';

export const goalRoot: Route = {
    path: 'goal',
    component: GoalComponent,
    data: {
        authorities: [],
        pageTitle: 'goal.title'
    }
};
// import { Routes } from '@angular/router';

// import {
//     goalSelectRoute, GoalComponent,
//     } from './';

// const ACCOUNT_ROUTES = [
//     goalSelectRoute,
//     ];

// export const accountState: Routes = [{
//     path: 'goal',
//     component: GoalComponent,
//     children: ACCOUNT_ROUTES
// }];
