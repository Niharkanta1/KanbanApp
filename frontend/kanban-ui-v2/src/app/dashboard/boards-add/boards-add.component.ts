import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/model/Board';
import { BoardService } from '../service/board.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { Workspace } from 'src/app/shared/model/Workspace';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-boards-add',
  templateUrl: './boards-add.component.html',
  styleUrls: ['./boards-add.component.css'],
})
export class BoardsAddComponent implements OnInit {
  @Input() buttonType = '';
  @Input() workspace!: Workspace;
  showModal = false;

  board: Board = {
    id: -1,
    name: '',
    description: '',
    isFavorite: false,
  };

  constructor(
    private boardService: BoardService,
    private notificationService: NotificationsService,
    private commService: CommonService
  ) {}

  ngOnInit(): void {}

  createBoard(board: Board) {
    this.boardService.createBoard(board, this.workspace.id).subscribe((res) => {
      this.showModal = false;
      this.boardService.getAllBoards(this.workspace.id).subscribe((res) => {
        this.commService.onBoardAdd$.next(res);
      });
      this.notificationService.addSuccess('Board created successfully');
    });
  }
}
