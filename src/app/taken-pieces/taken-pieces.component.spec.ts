import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TakenPiecesComponent} from './taken-pieces.component';

describe('TakenPiecesComponent', () => {
  let component: TakenPiecesComponent;
  let fixture: ComponentFixture<TakenPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TakenPiecesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
