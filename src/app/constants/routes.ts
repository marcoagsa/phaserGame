import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'login',
    loadComponent: () =>
      import('../pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'resetpassword',
    loadComponent: () =>
      import('../pages/auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
];
