import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductListing } from './products.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productSearchKeys = ['sku', 'name'];
  productListingsObservable: Observable<ProductListing[]>;

  constructor(
    private productsService: ProductsService,
  ) {
    this.productListingsObservable = this.productsService.onProductListingChange();
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  selectProduct(product: Product) {
    console.log('ProductsComponent selectProduct called with product: ', product);
    this.productsService.addProductToSelection(product);
  }

  onDeleteProduct(productListing: ProductListing) {
    this.productsService.deleteProduct(productListing);
  }

}
