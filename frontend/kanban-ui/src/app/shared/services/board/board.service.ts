import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../../model/Board';
import { envSettings } from 'src/app/env-settings';
import { Workspace } from '../../model/Workspace';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  endpoint: string = '/boards';

  constructor(public http: HttpClient) { }
  
  getAllBoards() {
    return this.http.get<Board[]>(envSettings.apiUrl + this.endpoint);
  }

  getBoard(id:number) {
    return this.http.get<Board[]>(envSettings.apiUrl + this.endpoint);
  }

  createBoard(board: Board) {
    
  }

  updateBoard(board: Board) {

  }

  deleteBoard(id: number) {

  }

  patchBoard(board: Board) {

  }
}
