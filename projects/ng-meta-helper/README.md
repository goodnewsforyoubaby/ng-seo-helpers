# Ng-Meta-Helpers

#### Automatic update of title, description and link of meta tags through a router. The implementation takes place in the comopent's code, so the data can be asynchronous (Observable, Promise)

#### Install via NPM

```shell
npm install --save ng-meta-helper
```

Import the NgMetaHelperModule to AppModule with RouterModule

```ts
import { NgMetaHelperModule } from "ng-meta-helper";

@NgModule({
  declarations: [AppComponent, StaticChild1Component],
  imports: [BrowserModule, RoutingModule.forRoot({...}), NgMetaHelperModule.config()],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Use in component, linking to routing.
Add the updateTags () method to the component and implements SeoHelper interface

```ts
export class ChildComponent implements SeoHelper {
  updateTags() {
    return this.http.get("api/user/info").pipe(
      map((userInfo) => {
        return {
          title: `Hello! This is my site. ${userInfo.name}`,
          meta: {
            name: { description: "best site" },
            property: { "og:title": "best site of the world" },
          },
          link: {
            canonical: `https://mysite.com/user/${userInfo.name}`,
          },
        };
      })
    );
  }
}
```

#### SeoHelper interface :

```ts
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
```
