import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Workspace } from 'src/app/shared/model/Workspace';

@Component({
  selector: 'app-workspace-form',
  templateUrl: './workspace-form.component.html',
  styleUrls: ['./workspace-form.component.css'],
})
export class WorkspaceFormComponent implements OnInit {
  @Input() workspace!: Workspace;
  @Output() workspaceSubmit = new EventEmitter();

  workspaceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    category: new FormControl('', []),
    shortName: new FormControl('', []),
    website: new FormControl('', []),
    isDefault: new FormControl(false, []),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.workspaceForm.setValue({
      name: this.workspace.name,
      description: this.workspace.description,
      category: this.workspace.category,
      shortName: this.workspace.shortName,
      website: this.workspace.website,
      isDefault: this.workspace.isDefault,
    });
  }

  onSubmit() {
    console.log('Submit');
    if (this.workspaceForm.invalid) {
      console.log('Invalid Form:', this.workspaceForm);
      return;
    }
    this.workspaceSubmit.emit(this.workspaceForm.value);
  }
}
