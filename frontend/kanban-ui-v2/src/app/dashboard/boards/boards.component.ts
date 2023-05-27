import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/model/Board';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements OnInit {
  @Input() boards = [] as Board[];

  filterByToggle = false;
  sortByToggle = false;

  constructor() {}

  ngOnInit(): void {}

  addNewBoard() {
    console.log('Adding new board....');
  }

  markFavorite(board: Board, event: Event) {
    console.log('Favorite board....', board);
    event.stopPropagation();
  }

  editBoard(board: Board, event: Event) {
    console.log('Edit board....', board);
    event.stopPropagation();
  }
}
