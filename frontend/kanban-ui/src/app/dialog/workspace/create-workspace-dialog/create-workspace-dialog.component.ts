import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Workspace } from 'src/app/shared/model/Workspace';
import { WorkspaceType } from 'src/app/shared/model/WorkspaceType';

@Component({
  selector: 'app-create-workspace-dialog',
  templateUrl: './create-workspace-dialog.component.html',
  styleUrls: ['./create-workspace-dialog.component.css']
})
export class CreateWorkspaceDialogComponent implements OnInit {

  createWorkspaceForm: FormGroup;
  workspaceTypes: string[] = [];

  constructor(public dialogRef: MatDialogRef<CreateWorkspaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Workspace,
    public formBuilder: FormBuilder) { 
      this.createWorkspaceForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        category: new FormControl('', Validators.required),
        shortName: new FormControl(''),
        website: new FormControl(''),
        description: new FormControl(''),
      });  
      for (var item in WorkspaceType) {
        if (isNaN(Number(item))) {
          this.workspaceTypes.push(item);
       }    
    }
  }

  get workspaceName() { return this.createWorkspaceForm.get('name') }
  get workspaceCategory() { return this.createWorkspaceForm.get('category')}

  ngOnInit() {
  }

  onCreate(): void {
    this.dialogRef.close(this.createWorkspaceForm.value);
  }

  onCancel(): void {
    console.log("Create workspace cancelled.");
  }

}
