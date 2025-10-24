import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sharesComponent } from './shares.component';

describe('sharesComponent', () => {
  let component: sharesComponent;
  let fixture: ComponentFixture<sharesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [sharesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(sharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
