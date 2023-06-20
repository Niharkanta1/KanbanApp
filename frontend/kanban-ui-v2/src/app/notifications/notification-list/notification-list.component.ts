import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from 'src/app/shared/model/Command';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  messages?: Observable<Command[]>;

  constructor(private notificationsService: NotificationsService) {
    this.messages = notificationsService.messagesOutput;
  }

  ngOnInit(): void {}

  clearMessage(id: number) {
    this.notificationsService.clearMessage(id);
  }
}
