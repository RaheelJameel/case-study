import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-products-total',
  templateUrl: './products-total.component.html',
  styleUrls: ['./products-total.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsTotalComponent {
  displayedColumns: string[] = ['expand', 'description', 'amounts', 'padding'];
  displayedColumns2: string[] = ['payment'];
  dataSource = [{}];
  expanded = false;
}
