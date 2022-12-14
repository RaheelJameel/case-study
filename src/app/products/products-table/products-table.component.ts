import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { Product, ProductListing } from '../products.interface';

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
export class ProductsTableComponent implements OnInit, OnDestroy {
  @Input() dataSource: Observable<ProductListing[]> | undefined;
  @Output() delete: EventEmitter<ProductListing> = new EventEmitter();

  columnsToDisplay = ['nameSku', 'newQuantity', 'newCost', 'taxCode'];
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay, 'delete'];
  listingLength: number = 0;
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.dataSource) {
      this.subscription = this.dataSource.subscribe((value) => this.listingLength = value.length);
    }
  }

  log(...data: any[]) {
    console.log(...data);
  }

  deleteProduct(productListing: ProductListing) {
    this.delete.emit(productListing);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
