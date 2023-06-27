import { Component, Input, OnInit } from '@angular/core';

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

  toggle = false;

  constructor() {
    this.options.push({ dataValue: '0', label: 'Most recent' });
    this.options.push({ dataValue: '1', label: 'Alphabetically A-Z' });
    this.options.push({ dataValue: '2', label: 'Alphabetically Z-A' });
  }

  ngOnInit(): void {}

  selectOption(item: Option) {
    this.unselectAllOptions();
    item.selected = true;
    this.text = item.label;
  }

  unselectAllOptions() {
    if (this.options.length <= 0) return;
    this.options.forEach((item) => (item.selected = false));
  }
}
