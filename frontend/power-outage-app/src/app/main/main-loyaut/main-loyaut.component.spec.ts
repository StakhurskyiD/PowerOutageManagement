import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoyautComponent } from './main-loyaut.component';

describe('MainLoyautComponent', () => {
  let component: MainLoyautComponent;
  let fixture: ComponentFixture<MainLoyautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLoyautComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLoyautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
