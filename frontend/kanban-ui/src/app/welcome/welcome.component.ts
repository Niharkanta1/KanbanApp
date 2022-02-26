import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Output() welcomePageLoadEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
    console.log("Welcome");
    this.welcomePageLoadEvent.emit(true);
  }

}
