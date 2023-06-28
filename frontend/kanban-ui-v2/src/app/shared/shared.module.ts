import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CastPipe } from './pipe/cast.pipe';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [InputComponent, CastPipe, DropdownComponent, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, CastPipe, DropdownComponent, ModalComponent],
})
export class SharedModule {}
