import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Product } from './products.interface';

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
}
