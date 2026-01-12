import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsokoLandingPage } from './isoko-landing-page';

describe('IsokoLandingPage', () => {
  let component: IsokoLandingPage;
  let fixture: ComponentFixture<IsokoLandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsokoLandingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsokoLandingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
