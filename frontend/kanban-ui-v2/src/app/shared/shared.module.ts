import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CastPipe } from './pipe/cast.pipe';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [InputComponent, CastPipe, DropdownComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, CastPipe, DropdownComponent],
})
export class SharedModule {}
