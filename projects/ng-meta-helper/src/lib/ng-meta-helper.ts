import { ChildrenOutletContexts, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { MetaConf, SeoTags } from './types';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
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
        tap(() => this.removeElements()),
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        switchMap<RouterEvent, Promise<SeoTags[]>>(() => {
          const components = this.getActivatedComponents();
          const tags = this.getSeoTags(components);
          return Promise.all(this.promisifySeoTags(tags));
        }),
        map((tags: SeoTags[]) => this.mergeSeoTags(tags))
      )
      .subscribe((tags: SeoTags) => this.createElements(tags));
  }

  private getActivatedComponents(): any[] {
    const components: any[] = [];
    let context = this.outletCtx.getContext('primary');
    while (context != null) {
      const { outlet } = context;
      if (outlet?.isActivated) {
        components.push(outlet.component!);
      }
      context = context.children.getContext('primary');
    }
    return components;
  }

  private getSeoTags(components: any[]): Array<SeoTags | Promise<SeoTags> | Observable<SeoTags>> {
    return components.reduce((acc: Array<SeoTags | Promise<SeoTags> | Observable<SeoTags>>, component: any) => {
      const tags = component.updateTags?.();
      if (tags != null) acc.push(tags);
      return acc;
    }, []);
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
      if (tag instanceof Observable) return firstValueFrom(tag);
      return Promise.resolve(tag);
    });
  }

  private addLinkElement(rel: string, href: string): HTMLLinkElement {
    const elements = Array.from(this.document.querySelectorAll<HTMLLinkElement>(`[rel=${rel}]`));
    let target = elements.find((el) => el.getAttribute('href') === href);
    if (target == null) {
      target = this.renderer.createElement('link') as HTMLLinkElement;
      this.renderer.setAttribute(target, 'rel', rel);
      this.renderer.setAttribute(target, 'href', href);
      this.renderer.appendChild(this.document.head, target);
    }
    return target;
  }
}
