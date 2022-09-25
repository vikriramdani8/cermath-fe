import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPdfComponent } from './show-pdf.component';

describe('ShowPdfComponent', () => {
  let component: ShowPdfComponent;
  let fixture: ComponentFixture<ShowPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
