import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsokoLandingPageComponent } from './isoko-landing-page';

describe('IsokoLandingPage', () => {
  let component: IsokoLandingPageComponent;
  let fixture: ComponentFixture<IsokoLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsokoLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsokoLandingPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
