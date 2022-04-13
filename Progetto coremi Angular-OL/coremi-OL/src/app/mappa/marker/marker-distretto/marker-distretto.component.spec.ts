import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerDistrettoComponent } from './marker-distretto.component';

describe('MarkerDistrettoComponent', () => {
  let component: MarkerDistrettoComponent;
  let fixture: ComponentFixture<MarkerDistrettoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkerDistrettoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerDistrettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
