import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product, ProductListing } from './products.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productSearchKeys = ['sku', 'name'];
  productListingsObservable: Observable<ProductListing[]>;
  listingLength: number = 0;
  private subscription: Subscription | undefined;

  constructor(
    private productsService: ProductsService,
  ) {
    this.productListingsObservable = this.productsService.onProductListingChange();
  }

  ngOnInit() {
    this.getAllProducts();
    this.watchProductListingLength();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  watchProductListingLength() {
    if (this.productListingsObservable) {
      this.subscription = this.productListingsObservable.subscribe((value) => this.listingLength = value.length);
    }
  }

  selectProduct(product: Product) {
    console.log('ProductsComponent selectProduct called with product: ', product);
    this.productsService.addProductToSelection(product);
  }

  onDeleteProduct(productListing: ProductListing) {
    this.productsService.deleteProduct(productListing);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
