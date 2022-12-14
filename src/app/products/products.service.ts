import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Product, ProductListing } from './products.interface';
import { uuid } from '../shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:4000/products';

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
      newQuantity: 0,
      newCost: 0,
      taxCode: '',
      availableQuantity: 0,
      expectedQuantity: 0,
      lastBuyPrice: 0,
      totalCostWOTax: 0,
      taxAmount: 0,
      totalCostWTax: 0,
    };
  }
}
