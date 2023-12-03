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
        loadComponent: () =>
          import('./about/about.page').then((m) => m.AboutPage),
      },
      {
        path: 'play',
        loadComponent: () => import('./play/play.page').then((m) => m.PlayPage),
      },
      {
        path: 'scores',
        loadComponent: () =>
          import('./scores/scores.page').then((m) => m.ScoresPage),
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
