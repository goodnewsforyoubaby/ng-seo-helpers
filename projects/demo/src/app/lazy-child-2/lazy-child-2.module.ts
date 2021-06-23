import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyChild2RoutingModule } from './lazy-child-2-routing.module';
import { LazyChild2Component } from './lazy-child-2.component';

@NgModule({
  declarations: [LazyChild2Component],
  imports: [CommonModule, LazyChild2RoutingModule],
})
export class LazyChild2Module {}
