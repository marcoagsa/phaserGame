import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutPageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'scores',
        loadChildren: () =>
          import('./scores/scores.module').then((m) => m.ScoresPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/about',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/about',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
