import { Routes } from '@angular/router';
import { MainLoyautComponent } from './main/main-loyaut/main-loyaut.component';

export const routes: Routes = [
  { path: 'main', component: MainLoyautComponent },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-dashboard/admin-dashboard.component').then(
        (c) => c.AdminDashboardComponent
      ),
  },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
];