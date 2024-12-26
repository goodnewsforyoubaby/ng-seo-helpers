import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-static-child-1',
    templateUrl: './static-child-1.component.html',
    styleUrls: ['./static-child-1.component.css'],
    standalone: false
})
export class StaticChild1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
