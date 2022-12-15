import { Component, OnInit } from '@angular/core';
import { CoreService } from './core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appValidity = false;

  constructor(
    private coreService: CoreService,
  ) { }

  ngOnInit(): void {
    this.coreService.appValidity().subscribe((value) => {
      this.appValidity = value
    });
  }
}
