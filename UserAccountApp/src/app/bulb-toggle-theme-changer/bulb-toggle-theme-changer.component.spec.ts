import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulbToggleThemeChangerComponent } from './bulb-toggle-theme-changer.component';

describe('BulbToggleThemeChangerComponent', () => {
  let component: BulbToggleThemeChangerComponent;
  let fixture: ComponentFixture<BulbToggleThemeChangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulbToggleThemeChangerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulbToggleThemeChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
