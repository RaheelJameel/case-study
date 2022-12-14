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
}
