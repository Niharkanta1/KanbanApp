import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envSettings } from 'src/app/env-settings';
import { Board } from 'src/app/shared/model/Board';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boardApi = `${envSettings.apiUrl}/boards`;
  constructor(private http: HttpClient) {}

  getAllBoards(workspaceId: number) {
    let params = new HttpParams();
    params = params.append('workspaceId', workspaceId);
    return this.http.get<Board[]>(this.boardApi, { params });
  }

  getBoard(id: any) {
    return this.http.get<Board>(`${this.boardApi}/${id}`);
  }

  createBoard(board: Board, workspaceId: number) {
    let params = new HttpParams();
    params = params.append('workspaceId', workspaceId);
    return this.http.post<Board>(this.boardApi, board, { params });
  }

  updateBoard(board: Board) {
    return this.http.patch<Board>(`${this.boardApi}/${board.id}`, board);
  }

  toggleFavorite(id: number) {
    return this.http.put<Board>(`${this.boardApi}/${id}/toggle-favorite`, {});
  }
}
