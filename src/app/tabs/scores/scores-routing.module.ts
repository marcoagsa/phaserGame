import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoresPage } from './scores.page';

const routes: Routes = [
  {
    path: '',
    component: ScoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoresPageRoutingModule {}
