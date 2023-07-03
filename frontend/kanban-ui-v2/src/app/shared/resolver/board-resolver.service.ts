import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Board } from '../model/Board';
import { EMPTY, Observable, catchError } from 'rxjs';
import { BoardService } from 'src/app/dashboard/service/board.service';

@Injectable({
  providedIn: 'root',
})
export class BoardResolverService implements Resolve<Board> {
  constructor(private boardService: BoardService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Board | Observable<Board> | Promise<Board> {
    const { id } = route.params;
    return this.boardService.getBoard(id).pipe(
      catchError(() => {
        console.log('Board not found.');
        return EMPTY;
      })
    );
    throw new Error('Method not implemented.');
  }
}
