import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMetaHelperComponent } from './ng-meta-helper.component';

describe('NgMetaHelperComponent', () => {
  let component: NgMetaHelperComponent;
  let fixture: ComponentFixture<NgMetaHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgMetaHelperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMetaHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
