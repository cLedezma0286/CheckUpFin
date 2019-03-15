import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './modules/home/home.component';
import { LoaderComponent } from './modules/loader/loader.component';
import { ClientFinancesComponent } from './modules/client-finances/client-finances.component';
import { ClientSearchComponent } from './modules/client-search/client-search.component';
import { DashboardComponent } from './modules/client-finances/client-file/dashboard/dashboard.component';
import { FinancialHealthComponent } from './modules/client-finances/client-file/financial-health/financial-health.component';
import { NotesAndAgreementsComponent } from './modules/client-finances/client-file/notes-and-agreements/notes-and-agreements.component';
import { ProductsComponent } from './modules/client-finances/products/products.component';
import { ClientFileComponent } from './modules/client-finances/client-file/client-file.component';
import { InterviewComponent } from './modules/interview/interview.component';
import { NextCheckupComponent } from './modules/next-checkup/next-checkup.component'

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'loading/finance-health', component: LoaderComponent },
  { path: 'loading/edras', component: LoaderComponent },
  { path: 'client-search', component: ClientSearchComponent },
  { path: 'interview', component: InterviewComponent },
  { path: 'financial-health', component: FinancialHealthComponent },
  { path: 'next-checkup', component: NextCheckupComponent },
  { path: 'client-finances', component: ClientFinancesComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'client-file', component: ClientFileComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'financial-health', component: FinancialHealthComponent },
          { path: 'notes-and-agreements', component: NotesAndAgreementsComponent }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });