import { inject, ModuleWithProviders, NgModule, Renderer2, RendererFactory2, provideAppInitializer } from '@angular/core';
import { ChildrenOutletContexts, Router, RouterModule } from '@angular/router';
import { MetaConf } from './types';
import { NgMetaHelper } from './ng-meta-helper';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@NgModule({
  imports: [RouterModule],
})
export class NgMetaHelperModule {
  static config(conf: MetaConf = { debug: false }): ModuleWithProviders<NgMetaHelperModule> {
    return {
      ngModule: NgMetaHelperModule,
      providers: [
        provideAppInitializer(() => {
        const initializerFn = (() => {
            const router = inject<Router>(Router);
            const outletCtx = inject<ChildrenOutletContexts>(ChildrenOutletContexts);
            const meta = inject<Meta>(Meta);
            const title = inject<Title>(Title);
            const doc = inject<Document>(DOCUMENT);
            const rendererFactory = inject<RendererFactory2>(RendererFactory2);
            const renderer = rendererFactory.createRenderer(doc, null);
            return () => Promise.resolve(new NgMetaHelper(router, outletCtx, meta, title, renderer, doc, conf));
          })();
        return initializerFn();
      }),
      ],
    };
  }
}
