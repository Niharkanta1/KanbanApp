import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CastPipe } from './pipe/cast.pipe';


@NgModule({
  declarations: [
    InputComponent,
    CastPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], exports: [
    InputComponent,
    CastPipe
  ]
})
export class SharedModule { }
