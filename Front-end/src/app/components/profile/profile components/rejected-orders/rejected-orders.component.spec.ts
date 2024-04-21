import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedOrdersComponent } from './rejected-orders.component';

describe('RejectedOrdersComponent', () => {
  let component: RejectedOrdersComponent;
  let fixture: ComponentFixture<RejectedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectedOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
