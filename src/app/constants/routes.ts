import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'play',
    loadComponent: () =>
      import('../pages/play/play.page').then((m) => m.PlayPage),
  },
  {
    path: 'scores',
    loadComponent: () =>
      import('../pages/scores/scores.page').then((m) => m.ScoresPage),
  },
];
