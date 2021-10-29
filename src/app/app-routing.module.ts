import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'visits',
    loadChildren: () => import('./pages/visits/visits.module').then( m => m.VisitsPageModule)
  },
  {
    path: 'add-client',
    loadChildren: () => import('./pages/add-client/add-client.module').then( m => m.AddClientPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'work-report',
    loadChildren: () => import('./pages/work-report/work-report.module').then( m => m.WorkReportPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shared-modal',
    loadChildren: () => import('./pages/shared-modal/shared-modal.module').then( m => m.SharedModalPageModule)
  },
  {
    path: 'request-list',
    loadChildren: () => import('./pages/request-list/request-list.module').then( m => m.RequestListPageModule)
  },
  {
    path: 'repayment/:id',
    loadChildren: () => import('./pages/repayment/repayment.module').then( m => m.RepaymentPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./pages/detail/detail.module').then( m => m.DetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
