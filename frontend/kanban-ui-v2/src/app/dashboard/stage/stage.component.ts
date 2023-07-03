import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/model/Board';
import { StageList } from 'src/app/shared/model/StageList';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css'],
})
export class StageComponent implements OnInit {
  board = {} as Board;
  stageLists = [] as StageList[];
  constructor(
    private commService: CommonService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(({ board }) => {
      this.board = board;
      this.stageLists = board.stageLists;
      console.log('Board Resolve:', this.board);
    });
  }
  ngOnInit(): void {}
}
