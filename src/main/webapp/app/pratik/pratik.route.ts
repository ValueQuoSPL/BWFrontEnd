import { Routes } from '@angular/router';

import { SpendRoute, subRoute, IncomeRoute } from 'app/pratik';
// howRoute
const PRATIK_ROUTES = [SpendRoute, subRoute, IncomeRoute];

export const pratikState: Routes = [
  {
    path: '',
    children: PRATIK_ROUTES
  }
];
