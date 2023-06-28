import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceEditComponent } from './workspace-edit.component';

describe('WorkspaceEditComponent', () => {
  let component: WorkspaceEditComponent;
  let fixture: ComponentFixture<WorkspaceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
