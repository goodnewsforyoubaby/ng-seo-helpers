import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaticChild1Component } from './static-child-1/static-child-1.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'static-child-1',
        component: StaticChild1Component,
      },
      {
        path: 'lazy-child-1',
        loadChildren: () => import('./lazy-child-1/lazy-child-1.module').then((m) => m.LazyChild1Module),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
