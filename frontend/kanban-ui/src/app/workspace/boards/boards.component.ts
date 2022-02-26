import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/shared/services/board/board.service';

@Component({
  selector: 'app-workspace-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  selectedSortType: number;
  selectedFilterType: number;

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

  constructor(public boardService: BoardService) { }

  ngOnInit() {
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