import { TestBed } from '@angular/core/testing';

import { NgMetaHelper } from './ng-meta-helper';

describe('NgMetaHelperService', () => {
  let service: NgMetaHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMetaHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
