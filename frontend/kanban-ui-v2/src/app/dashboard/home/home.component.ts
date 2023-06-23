import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sidebarVisible: boolean = false;

  constructor(private commService: CommonService) {
    commService.getMenuToggle().subscribe((val) => {
      this.sidebarVisible = val;
    });
  }

  ngOnInit(): void {
    console.log('Home initialization....');
  }
}
