import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHelpComponent } from './detail-help.component';

describe('DetailHelpComponent', () => {
  let component: DetailHelpComponent;
  let fixture: ComponentFixture<DetailHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailHelpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
