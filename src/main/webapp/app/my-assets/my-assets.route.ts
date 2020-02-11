import { MyAssetsComponent } from 'app/my-assets/my-assets.component';
import { Route } from '@angular/router';
import { StockComponent } from 'app/my-assets/stocks/stocks.component';
import { PropertyComponent } from 'app/my-assets/property/property.component';
import { SavingSchemeComponent } from 'app/my-assets/saving-scheme/savingscheme.component';
import { FutureOptionComponent } from 'app/my-assets/future-option/futureoption.component';
import { ChitFundComponent } from 'app/my-assets/chit-funds/chitfund.component';
import { CashComponent } from 'app/my-assets/cash/cash.component';
import { AlternativeComponent } from 'app/my-assets/alternate-investment/alternateinvest.component';
// import { MyAssetsComponent } from 'app/my-assets/my-assets.component';
import { MutualComponent } from 'app/my-assets/mutual/mutual.component';

export const myasstsRoute: Route = {
    path: '',
    component: MyAssetsComponent,
    children: [
        { outlet: 'stock', path: '', component: StockComponent },
        { outlet: 'mutual', path: '', component: MutualComponent },
        { outlet: 'saving', path: '', component: SavingSchemeComponent },
        { outlet: 'altinvest', path: '', component: AlternativeComponent },
        { outlet: 'cash', path: '', component: CashComponent },
        { outlet: 'property', path: '', component: PropertyComponent },
        { outlet: 'chit', path: '', component: ChitFundComponent },
        { outlet: 'future', path: '', component: FutureOptionComponent }
    ]
};
