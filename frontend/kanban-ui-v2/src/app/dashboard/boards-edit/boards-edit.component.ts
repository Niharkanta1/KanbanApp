import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/model/Board';
import { BoardService } from '../service/board.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { Workspace } from 'src/app/shared/model/Workspace';

@Component({
  selector: 'app-boards-edit',
  templateUrl: './boards-edit.component.html',
  styleUrls: ['./boards-edit.component.css'],
})
export class BoardsEditComponent implements OnInit {
  @Input() board!: Board;
  @Input() workspace!: Workspace;

  showModal = false;

  constructor(
    private boardService: BoardService,
    private commService: CommonService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {}

  updateBoard(board: Board) {
    board.id = this.board.id;
    this.boardService.updateBoard(board).subscribe((res) => {
      this.showModal = false;
      this.commService.onBoardEdit$.next(res);
      this.notificationService.addSuccess('Board edit successful');
    });
  }
}
