import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CastPipe } from './pipe/cast.pipe';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';
import { NotificationsModule } from '../notifications/notifications.module';

@NgModule({
  declarations: [InputComponent, CastPipe, DropdownComponent, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule, NotificationsModule],
  exports: [
    InputComponent,
    CastPipe,
    DropdownComponent,
    ModalComponent,
    ReactiveFormsModule,
    NotificationsModule,
  ],
})
export class SharedModule {}
