import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './premier/home/home.component';
import { LoaderComponent } from './premier/loader/loader.component';
import { ClientFinancesComponent } from './premier/client-finances/client-finances.component';
import { ProductsComponent } from './premier/client-finances/products/products.component';
import { ClientFileComponent } from './premier/client-finances/client-file/client-file.component';
import { InterviewComponent } from './premier/interview/interview.component';
const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'loading/finance-health', component: LoaderComponent },
  { path: 'loading/edras', component: LoaderComponent },
  { path: 'client-finances', component: ClientFinancesComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'client-file', component: ClientFileComponent }
    ]
  },
  { path: 'interview', component: InterviewComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
