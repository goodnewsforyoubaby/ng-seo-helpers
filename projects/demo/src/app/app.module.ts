import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMetaHelperModule } from 'ng-meta-helper';
import { StaticChild1Component } from './static-child-1/static-child-1.component';

@NgModule({
  declarations: [AppComponent, StaticChild1Component],
  imports: [BrowserModule, AppRoutingModule, NgMetaHelperModule.config()],
  bootstrap: [AppComponent],
})
export class AppModule {}
