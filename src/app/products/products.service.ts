import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Product, ProductListing } from './products.interface';
import { uuid } from '../shared/helpers';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:4000/products';
  private productListings: ProductListing[] = [];
  private productListingsSubject = new BehaviorSubject<ProductListing[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProductListing(product: Product): ProductListing {
    return {
      ...product,
      listingId: uuid(),
      newQuantity: Number.parseInt(uuid()),
      newCost: Number.parseInt(uuid()),
      taxCode: uuid(),
      availableQuantity: Number.parseInt(uuid()),
      expectedQuantity: Number.parseInt(uuid()),
      lastBuyPrice: Number.parseInt(uuid()),
      totalCostWOTax: Number.parseInt(uuid()),
      taxAmount: Number.parseInt(uuid()),
      totalCostWTax: Number.parseInt(uuid()),
    };
  }

  addProductToSelection(product: Product): ProductListing[] {
    console.log('ProductsService addProductToSelection called with product: ', product);
    const isNewSelection = !this.productListings.find(productListing => productListing.productId === product.productId);
    if (isNewSelection) {
      console.log('ProductsService addProductToSelection add selection');
      this.productListings.push(this.createProductListing(product));
      this.productListingsSubject.next(this.productListings);
    } else {
      console.log('ProductsService addProductToSelection repeat selection');
    }
    console.log('ProductsService addProductToSelection this.productListings: ', this.productListings);
    return this.productListings;
  }

  onProductListingChange(): Observable<ProductListing[]> {
    return this.productListingsSubject.asObservable();
  }
}
