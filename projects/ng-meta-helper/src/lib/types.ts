import { Observable } from 'rxjs';

export interface MetaConf {
  debug?: boolean;
}

export type SeoTags = {
  title?: string | null;
  meta?: {
    name?: Record<string, string | null>;
    property?: Record<string, string | null>;
  };
  link?: {
    canonical?: string | null;
    prev?: string | null;
    next?: string | null;
  };
};

export interface SeoHelper {
  updateTags(): SeoTags | Promise<SeoTags> | Observable<SeoTags>;
}
