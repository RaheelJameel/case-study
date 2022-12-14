import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductListing } from '../products.interface';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsTableComponent {
  @Input() dataSource: ProductListing[] = [];
  columnsToDisplay = ['nameSku', 'newQuantity', 'newCost', 'taxCode'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay, 'delete'];

  log(...data: any[]) {
    console.log(...data);
  }
}
