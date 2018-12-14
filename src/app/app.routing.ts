import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./premier/home/home.component";
import { LoaderComponent } from "./premier/loader/loader.component";
import { ClientSearchComponent } from "./premier/client-search/client-search.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'loading/financeHealth', component: LoaderComponent },
  { path: 'loading/EDRAS', component: LoaderComponent },
  { path: 'client-search', component: ClientSearchComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
