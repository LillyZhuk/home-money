import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistretionComponent } from './registretion.component';

describe('RegistretionComponent', () => {
  let component: RegistretionComponent;
  let fixture: ComponentFixture<RegistretionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistretionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistretionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
