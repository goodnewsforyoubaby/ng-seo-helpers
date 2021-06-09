import { TestBed } from '@angular/core/testing';

import { NgMetaHelperService } from './ng-meta-helper.service';

describe('NgMetaHelperService', () => {
  let service: NgMetaHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMetaHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
