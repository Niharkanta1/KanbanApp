import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/model/Board';
import { Workspace } from 'src/app/shared/model/Workspace';
import { CommonService } from 'src/app/shared/service/common.service';
import { BoardService } from '../service/board.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

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
    { dataValue: '2', label: 'Alphabetically Z-A' },
  ];

  filterByOptions = [{ dataValue: '0', label: 'Favorite' }];
  filterByToggle = false;
  filteredBoards = [] as Board[];

  constructor(
    private commService: CommonService,
    private boardService: BoardService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.commService.onBoardAdd$.subscribe((result) => (this.boards = result));
    this.commService.onBoardEdit$.subscribe((res) => this.replaceBoard(res));
    this.filteredBoards = this.boards;
  }

  clearFilter() {
    this.filteredBoards = this.boards;
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

  toggleFavorite(board: Board, event: Event) {
    board.isFavorite = !board.isFavorite;
    event.stopPropagation();
    this.boardService.toggleFavorite(board.id).subscribe((res) => {
      this.commService.onBoardEdit$.next(res);
      this.notificationService.addSuccess('Board updated successfully.');
    });
  }

  onFilterByOptionSelected(event: { dataValue: string }) {
    this.applyFilter(event.dataValue);
  }

  applyFilter(dataValue: string) {
    switch (dataValue) {
      case '0': {
        console.log('Filtering Favorites');
        this.filteredBoards = this.boards.filter((board) => board.isFavorite);
      }
    }
  }

  onSortByOptionSelected(event: { dataValue: string }) {
    this.filteredBoards = this.filteredBoards.sort((b1, b2) => {
      if (event.dataValue === '1') {
        console.log('sort natural');
        return b1.name !== b2.name ? (b1.name < b2.name ? -1 : 1) : 0;
      } else if (event.dataValue === '2') {
        console.log('sort - natural');
        return b1.name !== b2.name ? (b1.name < b2.name ? 1 : -1) : 0;
      } else {
        return -(b1.id - b2.id);
      }
    });
  }
}
