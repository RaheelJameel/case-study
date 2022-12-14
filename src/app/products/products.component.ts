import { Component, OnInit } from '@angular/core';
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
  productListings: ProductListing[] = [];

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products = products;
      // todo remove below
      this.productListings = [
        this.productsService.createProductListing(products[0]),
        this.productsService.createProductListing(products[1])
      ];
    });
  }

  selectProduct(product: Product) {
    console.log('ProductsComponent selectProduct called with product: ', product);
    const isNewSelection = !this.productListings.find(productListing => productListing.productId === product.productId);
    if (isNewSelection) {
      this.productListings.push(this.productsService.createProductListing(product));
    } else {
      console.log('ProductsComponent selectProduct repeat selection');
    }
    console.log('ProductsComponent selectProduct this.productListings: ', this.productListings);
  }

}
