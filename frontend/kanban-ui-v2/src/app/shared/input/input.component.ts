import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl('');
  @Input() inputType: string = '';
  @Input() controlType: string = 'input';
  @Input() placeholder: string = '';
  @Input() hasIcon: boolean = false;
  @Input() iconClass: string = '';

  constructor() {}

  ngOnInit(): void {}

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
