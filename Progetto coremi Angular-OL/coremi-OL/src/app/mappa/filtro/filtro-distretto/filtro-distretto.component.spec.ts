import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroDistrettoComponent } from './filtro-distretto.component';

describe('FiltroDistrettoComponent', () => {
  let component: FiltroDistrettoComponent;
  let fixture: ComponentFixture<FiltroDistrettoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroDistrettoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroDistrettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
