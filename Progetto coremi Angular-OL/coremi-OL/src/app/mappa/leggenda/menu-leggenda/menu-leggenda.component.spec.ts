import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLeggendaComponent } from './menu-leggenda.component';

describe('MenuLeggendaComponent', () => {
  let component: MenuLeggendaComponent;
  let fixture: ComponentFixture<MenuLeggendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLeggendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLeggendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
