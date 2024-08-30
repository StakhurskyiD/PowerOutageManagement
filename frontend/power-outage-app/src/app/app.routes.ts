// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLoyautComponent } from './main/main-loyaut/main-loyaut.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  { path: 'main', component: MainLoyautComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // Redirect root to the main page
];
