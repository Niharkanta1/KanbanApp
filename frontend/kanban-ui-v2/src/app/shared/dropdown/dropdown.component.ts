import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from '../service/common.service';

interface Option {
  dataValue: string;
  label: string;
  selected?: boolean;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() options = [] as Option[];
  @Input() text = 'Sort By';
  @Input() inputName = 'sortBy';
  @Output() selected = new EventEmitter();

  defaultName = '';

  toggle = false;

  constructor(private commService: CommonService) {}

  ngOnInit(): void {
    this.commService.clearBoardsFilter$.subscribe((value) => {
      this.clearFields(value);
    });
    this.defaultName = this.text;
  }

  clearFields(value: string) {
    if (this.inputName === value) {
      this.unselectAllOptions();
    }
  }

  selectOption(item: Option) {
    this.unselectAllOptions();
    item.selected = true;
    this.text = item.label;
    this.selected.emit(item);
  }

  unselectAllOptions() {
    console.log('clear dropdown');
    if (this.options.length <= 0) return;
    this.options.forEach((item) => {
      item.selected = false;
    });
    this.text = this.defaultName;
  }

  ngOnDestroy() {}
}
