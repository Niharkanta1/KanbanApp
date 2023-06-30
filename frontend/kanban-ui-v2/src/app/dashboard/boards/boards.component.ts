import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/model/Board';
import { Workspace } from 'src/app/shared/model/Workspace';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
})
export class BoardsComponent implements OnInit {
  @Input() boards = [] as Board[];
  @Input() workspace!: Workspace;

  sortByOptions = [
    { dataValue: '0', label: 'Most recent' },
    { dataValue: '1', label: 'Alphabetically A-Z' },
    { dataValue: '1', label: 'Alphabetically Z-A' },
  ];

  filterByOptions = [{ dataValue: '0', label: 'Favorite' }];
  filterByToggle = false;
  constructor(private commService: CommonService) {}

  ngOnInit(): void {
    this.commService.onBoardAdd$.subscribe((result) => (this.boards = result));
    this.commService.onBoardEdit$.subscribe((res) => this.replaceBoard(res));
  }

  clearFilter() {
    console.log('clear filters');
    this.commService.clearBoardsFilter$.next('sortBy');
    this.commService.clearBoardsFilter$.next('filterBy');
  }

  replaceBoard(res: Board): void {
    for (let index = 0; index < this.boards.length; index++) {
      if (this.boards[index].id === res.id) {
        this.boards[index] = res;
        break;
      }
    }
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
