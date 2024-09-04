import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { loginGuard } from './core/guards/login/login.guard';
import { checkIfLoggedinGuard } from './core/guards/login/check-if-loggedin.guard';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [loginGuard]
     },
     {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        canActivate: [loginGuard]
     },
     {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [loginGuard]
     },
     {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [loginGuard]
     },
     {
        path: 'add-friend',
        loadComponent: () => import('./pages/search-for-friends-dialog/search-for-friends-dialog.component').then(m => m.SearchForFriendsDialogComponent),
        canActivate: [loginGuard]
     },
     {
        path: 'view-friend-requests',
        loadComponent: () => import('./pages/view-friend-requests/view-friend-requests.component').then(m => m.ViewFriendRequestsComponent),
        canActivate: [loginGuard]
     },
     { path: '**', pathMatch: 'full',  component: PagenotfoundComponent }, 
     
];
