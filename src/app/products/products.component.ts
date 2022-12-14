import { Component, OnInit } from '@angular/core';
import { Product } from './products.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productSearchKeys = ['sku', 'name'];
  selectedProducts: Product[] = [];

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
      this.selectedProducts = [products[0], products[1]];
    });
  }

  selectProduct(product: Product) {
    const isNewSelection = !this.selectedProducts.find( selectedProduct => selectedProduct.id === product.id);
    if (isNewSelection) {
      this.selectedProducts.push(product);
    }
  }

}
