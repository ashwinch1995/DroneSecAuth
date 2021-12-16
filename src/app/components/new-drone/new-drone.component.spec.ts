import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDroneComponent } from './new-drone.component';

describe('NewDroneComponent', () => {
  let component: NewDroneComponent;
  let fixture: ComponentFixture<NewDroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDroneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
