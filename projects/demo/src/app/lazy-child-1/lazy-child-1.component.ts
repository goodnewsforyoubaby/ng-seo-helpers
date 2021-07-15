import { Component } from '@angular/core';
import { SeoHelper } from '../../../../ng-meta-helper/src/lib/types';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-lazy-child-1',
  templateUrl: './lazy-child-1.component.html',
  styleUrls: ['./lazy-child-1.component.css'],
})
export class LazyChild1Component implements SeoHelper {
  updateTags() {
    return of(null).pipe(
      delay(50000),
      map(() => {
        return {
          meta: {
            name: { 'some:name': 'value of some:name of LazyChild1Component', 'some:name2': 'value of some:name2 of LazyChild1Component' },
            property: { 'some:property': 'value of some:property of LazyChild1Component' },
          },
          link: {
            canonical: 'canonical from LazyChild1Component',
          },
        };
      })
    );
  }
}
