import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() subMenuState;
  @ViewChild('drawer', { static: false }) public drawer: MatDrawer;
  selectedWorkspaceId: number;
  currentUser: User;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  isLoggedIn() {
    if(this.authService.isLoggedIn) {
      this.currentUser = this.authService.currentUser;
    }
    return this.authService.isLoggedIn;
  }

  ngOnChanges(){
   if(this.drawer) this.drawer.toggle();
  }

}

export interface Section {
  name: string;
  updated: Date;
}