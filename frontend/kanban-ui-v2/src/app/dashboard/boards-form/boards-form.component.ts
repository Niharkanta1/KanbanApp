import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/shared/model/Board';

@Component({
  selector: 'app-boards-form',
  templateUrl: './boards-form.component.html',
  styleUrls: ['./boards-form.component.css'],
})
export class BoardsFormComponent implements OnInit {
  @Input() board!: Board;
  @Output() boardSubmit = new EventEmitter();

  boardForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    isFavorite: new FormControl(false, []),
  });

  constructor() {}

  ngOnInit(): void {
    this.boardForm.setValue({
      name: this.board.name,
      description: this.board.description,
      isFavorite: this.board.isFavorite,
    });
  }

  onSubmit() {
    console.log('Submit');
    if (this.boardForm.invalid) {
      console.log('Invalid Form:', this.boardForm);
      return;
    }
    this.boardSubmit.emit(this.boardForm.value);
  }
}
