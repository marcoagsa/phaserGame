import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    loadChildren: () => [
      {
        path: 'about',
        loadComponent: () =>
          import('./tabs/about/about.page').then((m) => m.AboutPage),
      },
      {
        path: 'play',
        loadComponent: () =>
          import('./tabs/play/play.page').then((m) => m.PlayPage),
      },
      {
        path: 'scores',
        loadComponent: () =>
          import('./tabs/scores/scores.page').then((m) => m.ScoresPage),
      },
      {
        path: '',
        redirectTo: './tabs/about',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
