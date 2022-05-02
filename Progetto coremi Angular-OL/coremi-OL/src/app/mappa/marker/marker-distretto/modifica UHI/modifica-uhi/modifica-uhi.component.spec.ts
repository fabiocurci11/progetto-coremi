import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUhiComponent } from './modifica-uhi.component';

describe('ModificaUhiComponent', () => {
  let component: ModificaUhiComponent;
  let fixture: ComponentFixture<ModificaUhiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaUhiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaUhiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
