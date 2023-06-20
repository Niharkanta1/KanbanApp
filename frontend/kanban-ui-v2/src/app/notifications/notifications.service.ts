import { Injectable } from '@angular/core';
import { Observable, Subject, scan } from 'rxjs';
import { Command } from '../shared/model/Command';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<Command> = new Subject<Command>();
  messagesOutput: Observable<Command[]> = this.messagesInput.pipe(
    scan((acc: Command[], value: Command) => {
      if (value.type === 'clear') {
        return acc.filter((messages) => messages.id !== value.id);
      } else {
        return [...acc, value];
      }
    }, [])
  );

  constructor() {}

  addSuccess(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'success',
    });
    setInterval(() => {
      this.clearMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'error',
    });
    setInterval(() => {
      this.clearMessage(id);
    }, 5000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  private randomId() {
    return Math.round(Math.random() * 100000);
  }
}
