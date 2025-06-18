import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) 
  },
  { 
    path: 'signup', 
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  
  },
  { 
    path: 'tab1', 
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule) 
  },
  { 
    path: '', 
    redirectTo: 'tab1', 
    pathMatch: 'full'  
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletPageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then(m => m.BookingPageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then(m => m.ConfirmationPageModule),
    canActivate: [AuthGuard]  
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then(m => m.HelpPageModule),
    canActivate: [AuthGuard]  
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
