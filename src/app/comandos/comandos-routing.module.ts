import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComandosPage } from './comandos.page';

const routes: Routes = [
  {
    path: '',
    component: ComandosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComandosPageRoutingModule {}
