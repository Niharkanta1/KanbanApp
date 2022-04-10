import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../../model/Board';
import { envSettings } from 'src/app/env-settings';
import { Workspace } from '../../model/Workspace';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  endpoint: string = envSettings.apiUrl + '/boards';

  constructor(public http: HttpClient) { }

  getAllBoards(workspaceId: number) {
    const params = new HttpParams().append('workspaceId', workspaceId + '');
    return this.http.get<Board[]>(this.endpoint, { params: params });
  }

  getBoard(id: number) {
    return this.http.get<Board[]>(this.endpoint + `/${id}`);
  }

  createBoard(board: Board, workspaceId: number): Observable<Board> {
    return this.http.post<Board>(this.endpoint + `?workspaceId=${workspaceId}`, board);
  }

  updateBoard(board: Board): Observable<any> {
    return this.http.put(this.endpoint, board);
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete(this.endpoint + `/${id}`);
  }

  patchBoard(board: Board): Observable<any> {
    return this.http.put(this.endpoint, board);
  }
}
