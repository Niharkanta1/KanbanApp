import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsFormComponent } from './boards-form.component';

describe('BoardsFormComponent', () => {
  let component: BoardsFormComponent;
  let fixture: ComponentFixture<BoardsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
