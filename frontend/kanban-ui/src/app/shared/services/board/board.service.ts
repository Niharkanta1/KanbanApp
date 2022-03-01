import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../../model/Board';
import { envSettings } from 'src/app/env-settings';
import { Workspace } from '../../model/Workspace';
import { Observable } from 'rxjs';

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
    return this.http.get<Board[]>(envSettings.apiUrl + this.endpoint + `/${id}`);
  }

  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(envSettings.apiUrl + this.endpoint, board);    
  }

  updateBoard(board: Board): Observable<any> {
    return this.http.put(envSettings.apiUrl + this.endpoint, board); 
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete(envSettings.apiUrl + this.endpoint + `/${id}`); 
  }

  patchBoard(board: Board): Observable<any> {
    return this.http.put(envSettings.apiUrl + this.endpoint, board); 
  }
}
