import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
];
