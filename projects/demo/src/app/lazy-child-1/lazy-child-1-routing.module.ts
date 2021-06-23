import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyChild1Component } from './lazy-child-1.component';

const routes: Routes = [
  {
    path: '',
    component: LazyChild1Component,
    children: [
      {
        path: 'lazy-child-2',
        loadChildren: () => import('../lazy-child-2/lazy-child-2.module').then((m) => m.LazyChild2Module),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyChild1RoutingModule {}
