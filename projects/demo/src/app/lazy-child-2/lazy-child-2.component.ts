import { Component } from '@angular/core';
import { SeoHelper } from '../../../../ng-meta-helper/src/lib/types';

@Component({
    selector: 'app-lazy-child-1',
    templateUrl: './lazy-child-2.component.html',
    styleUrls: ['./lazy-child-2.component.css'],
    standalone: false
})
export class LazyChild2Component implements SeoHelper {
  updateTags() {
    return {
      meta: {
        name: { 'some:name': 'value of some:name of LazyChild2Component' },
        property: { 'some:property': 'value of some:property of LazyChild2Component' },
      },
      link: {
        canonical: 'canonical from LazyChild2Component',
      },
    };
  }
}
