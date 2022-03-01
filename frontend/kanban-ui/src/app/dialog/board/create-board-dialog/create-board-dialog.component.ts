import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/shared/model/Board';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {
  createBoardForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateBoardDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Board,
    public formBuilder: FormBuilder) {
      this.createBoardForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
        description: new FormControl(''),
      });  
    }

  ngOnInit() {
  }

  get boardName() { return this.createBoardForm.get('name')}

  onCreate(): void {
    this.dialogRef.close(this.createBoardForm.value);
  }

  onCancel(): void {
    
  }

}
