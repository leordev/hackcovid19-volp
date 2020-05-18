import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOngComponent } from './detail-ong.component';

describe('DetailOngComponent', () => {
  let component: DetailOngComponent;
  let fixture: ComponentFixture<DetailOngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
