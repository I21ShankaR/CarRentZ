import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'search',
    loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('../wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('../help/help.module').then( m => m.HelpPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
