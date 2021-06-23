import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyChild1RoutingModule } from './lazy-child-1-routing.module';
import { LazyChild1Component } from './lazy-child-1.component';

@NgModule({
  declarations: [LazyChild1Component],
  imports: [CommonModule, LazyChild1RoutingModule],
})
export class LazyChild1Module {}
