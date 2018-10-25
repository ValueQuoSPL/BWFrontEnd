import { Routes } from '@angular/router';

import { SpendRoute, IncomeRoute } from 'app/pratik';
// howRoute
const PRATIK_ROUTES = [SpendRoute, IncomeRoute];

export const pratikState: Routes = [
    {
        path: '',
        children: PRATIK_ROUTES
    }
];
