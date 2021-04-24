import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNomeComponent } from './input-nome.component';

describe('InputNomeComponent', () => {
  let component: InputNomeComponent;
  let fixture: ComponentFixture<InputNomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputNomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
