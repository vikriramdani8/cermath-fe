import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahQuizComponent } from './tambah-quiz.component';

describe('TambahQuizComponent', () => {
  let component: TambahQuizComponent;
  let fixture: ComponentFixture<TambahQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TambahQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
