import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService implements OnInit {
  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  private menuToggle = new BehaviorSubject<boolean>(false);
  setMenuToggle(val: boolean) {
    this.menuToggle.next(val);
  }
  getMenuToggle(): Observable<boolean> {
    return this.menuToggle.asObservable();
  }
}
