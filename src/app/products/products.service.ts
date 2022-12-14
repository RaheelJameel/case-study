import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product, ProductListing } from './products.interface';
import { uuid } from '../shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:4000/products';
  private productListings: ProductListing[] = [];
  private productListingsSubject = new BehaviorSubject<ProductListing[]>([]);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  onProductListingChange(): Observable<ProductListing[]> {
    return this.productListingsSubject.asObservable();
  }

  private publishProductListings() {
    this.productListingsSubject.next(this.productListings);
  }

  createProductListing(product: Product): ProductListing {
    const formGroup = this.fb.group({
      newQuantity: ['', Validators.required],
      newCost: ['', Validators.required],
      taxCode: ['vat', Validators.required],
    });
    const listing: ProductListing = {
      ...product,
      listingId: uuid(),
      newQuantity: 0,
      newCost: 0,
      taxCode: 'vat',
      availableQuantity: 0,
      expectedQuantity: 0,
      lastBuyPrice: 0,
      totalCostWOTax: 0,
      taxAmount: 0,
      totalCostWTax: 0,
      formGroup,
    };
    formGroup.valueChanges.subscribe((value) => {
      let newQuantity = value.newQuantity && Number.parseInt(value.newQuantity) || 0;
      newQuantity = newQuantity < 0 ? 0 : newQuantity;
      let newCost = value.newCost && Number.parseInt(value.newCost) || 0;
      newCost = newCost < 0 ? 0 : newCost;
      const isTax = value.taxCode === 'vat';

      listing.expectedQuantity = newQuantity;
      listing.totalCostWOTax = newQuantity * newCost;
      listing.taxAmount = isTax ? listing.totalCostWOTax * 0.15 : 0;
      listing.totalCostWTax = listing.totalCostWOTax + listing.taxAmount;

      this.publishProductListings();
    });
    return listing;
  }

  addProductToSelection(product: Product): ProductListing[] {
    console.log('ProductsService addProductToSelection called with product: ', product);
    const isNewSelection = !this.productListings.find(productListing => productListing.productId === product.productId);
    if (isNewSelection) {
      console.log('ProductsService addProductToSelection add selection');
      this.productListings.push(this.createProductListing(product));
      this.publishProductListings();
    } else {
      console.log('ProductsService addProductToSelection repeat selection');
    }
    console.log('ProductsService addProductToSelection this.productListings: ', this.productListings);
    return this.productListings;
  }

  deleteProduct(productListing: ProductListing) {
    this.productListings = this.productListings.filter((item) => item.listingId !== productListing.listingId);
    this.publishProductListings();
  }
}
