import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './premier/home/home.component';
import { LoaderComponent } from './premier/loader/loader.component';
import { ClientSearchComponent } from './premier/client-search/client-search.component';
import { ClientFinancesComponent } from './premier/client-finances/client-finances.component';
import { ProductsComponent } from './premier/client-finances/products/products.component';
import { FinancialCheckUpComponent } from './premier/client-finances/financial-check-up/financial-check-up.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'loading/finance-health', component: LoaderComponent },
  { path: 'loading/edras', component: LoaderComponent },
  { path: 'clients-search', component: ClientSearchComponent },
  { path: 'client-finances', component: ClientFinancesComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'financial-check-up', component: FinancialCheckUpComponent }
  ] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
