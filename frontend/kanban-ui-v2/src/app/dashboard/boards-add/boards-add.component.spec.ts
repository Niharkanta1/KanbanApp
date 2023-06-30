import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsAddComponent } from './boards-add.component';

describe('BoardsAddComponent', () => {
  let component: BoardsAddComponent;
  let fixture: ComponentFixture<BoardsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
