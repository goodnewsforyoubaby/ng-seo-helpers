import { ChildrenOutletContexts, NavigationEnd, Router } from '@angular/router';
import { MetaConf, SeoHelper, SeoTags } from './types';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { merge } from './utils';

export class NgMetaHelper {
  private elements: Array<HTMLMetaElement | HTMLLinkElement> = [];

  constructor(
    router: Router,
    private outletCtx: ChildrenOutletContexts,
    private meta: Meta,
    private title: Title,
    private renderer: Renderer2,
    private document: Document,
    conf: MetaConf
  ) {
    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        tap(() => this.removeElements()),
        switchMap(() => {
          const components = this.getActivatedComponents();
          const tags = this.getSeoTags(components);
          return Promise.all(this.promisifySeoTags(tags));
        }),
        map((tags) => this.mergeSeoTags(tags))
      )
      .subscribe((tags) => this.createElements(tags));
  }

  private getActivatedComponents(): SeoHelper[] {
    const components = [];
    let context = this.outletCtx.getContext('primary');
    while (context != null) {
      if (context.outlet?.isActivated) {
        components.push(context.outlet.component!);
      }
      context = context.children.getContext('primary');
    }
    return components;
  }

  private getSeoTags(components: SeoHelper[]): Array<SeoTags | Promise<SeoTags> | Observable<SeoTags>> {
    return components.reduce((acc, component) => {
      const tags = component.createOrUpdateSeoTags?.();
      if (tags != null) acc.push(tags);
      return acc;
    }, [] as Array<SeoTags | Promise<SeoTags> | Observable<SeoTags>>);
  }

  private mergeSeoTags(tags: SeoTags[]): SeoTags {
    return tags.reduce<SeoTags>((acc, item) => merge(acc, item), {});
  }

  private createElements(tage: SeoTags) {
    if (tage.title) {
      this.title.setTitle(tage.title);
    }
    if (tage.meta) {
      this.elements.push(...this.meta.addTags(this.prepareMetaTags(tage.meta)));
    }
    if (tage.link) {
      for (const [rel, href] of Object.entries(tage.link)) {
        if (href == null) continue;
        this.elements.push(this.addLinkElement(rel, href));
      }
    }
  }

  private removeElements() {
    this.elements.forEach((e) => e.remove());
    this.elements.length = 0;
  }

  private prepareMetaTags(meta: SeoTags['meta']): MetaDefinition[] {
    if (meta == null) return [];
    const result: MetaDefinition[] = [];
    for (const [metaKey, metaVal] of Object.entries(meta)) {
      if (metaVal == null) continue;
      for (const [key, content] of Object.entries(metaVal)) {
        if (content == null) continue;
        result.push({ [metaKey]: key, content });
      }
    }
    return result;
  }

  private promisifySeoTags(tags: Array<SeoTags | Promise<SeoTags> | Observable<SeoTags>>): Array<Promise<SeoTags>> {
    return tags.map((tag) => {
      if (tag instanceof Promise) return tag;
      if (tag instanceof Observable) return tag.toPromise();
      return Promise.resolve(tag);
    });
  }

  private addLinkElement(rel: string, href: string): HTMLLinkElement {
    const element = this.renderer.createElement('link') as HTMLLinkElement;
    this.renderer.setAttribute(element, 'rel', rel);
    this.renderer.setAttribute(element, 'href', href);
    this.renderer.appendChild(this.document.head, element);
    return element;
  }
}
