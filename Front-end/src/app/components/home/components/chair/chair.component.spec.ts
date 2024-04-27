import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairComponent } from './chair.component';

describe('ChairComponent', () => {
  let component: ChairComponent;
  let fixture: ComponentFixture<ChairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChairComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
