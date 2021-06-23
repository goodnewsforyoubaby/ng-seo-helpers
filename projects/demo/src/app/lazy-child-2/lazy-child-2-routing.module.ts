import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyChild2Component } from './lazy-child-2.component';

const routes: Routes = [
  {
    path: '',
    component: LazyChild2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyChild2RoutingModule {}
