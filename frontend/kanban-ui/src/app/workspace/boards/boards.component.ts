import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardDialogComponent } from 'src/app/dialog/board/create-board-dialog/create-board-dialog.component';
import { Board } from 'src/app/shared/model/Board';
import { BoardService } from 'src/app/shared/services/board/board.service';

@Component({
  selector: 'app-workspace-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  selectedSortType: number;
  selectedFilterType: number;
  board: Board = new Board();
  boardCount: number = 3;

  sortTypes: SortType[] = [
    {value: 1, name: 'Recent Activity'},
    {value: 2, name: 'Alphabetical A-Z'},
    {value: 2, name: 'Alphabetical Z-A'},
  ];

  filterTypes: FilterType[] = [
    {value: 1, name: 'Activity'},
    {value: 2, name: 'Category'},
    {value: 3, name: 'Favorites'},
  ];

  cards: BoardCard[] = [
    {value: 1, name: 'First Board'},
    {value: 2, name: 'Second Board'},
    {value: 3, name: 'Third Board'},
  ]

  constructor(public boardService: BoardService, public dialog: MatDialog) {    
  }
 
  ngOnInit() {
  }

  openCreateBoardDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      width: '500px',
      data: this.board,
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.board = result;
      if(this.board)
        this.createBoard(this.board);
    });
  }

  createBoard(newBoard: Board) {
    console.log("Creating Board!==>", newBoard);
    //this.boardService.createBoard(newBoard);
  }
}

interface SortType {
  value: number;
  name: string;
}

interface FilterType {
  value: number;
  name: string;
}

interface BoardCard {
  value: number;
  name: string;
}
