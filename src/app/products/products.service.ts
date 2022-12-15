import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product, ProductsCosting, ProductListing, ProductListingFormGroup, ProductComputedValues } from './products.interface';
import { uuid } from '../shared/helpers';
import { CoreService } from '../core.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  finalCosting: ProductsCosting = {
    totalCostWOTax: 0, taxAmount: 0, totalCostWTax: 0
  }
  private apiUrl = 'http://localhost:4000/products';
  private productListings: ProductListing[] = [];
  private productListingsSubject = new BehaviorSubject<ProductListing[]>([]);
  private productListingsFormArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private coreService: CoreService,
  ) {
    this.watchFormArrayChange();
  }

  watchFormArrayChange() {
    this.productListingsFormArray.valueChanges.subscribe((formGroupValues: ProductListingFormGroup[]) => {
      let finalTotalCostWOTax = 0;
      let finalTaxAmount = 0;
      let finalTotalCostWTax = 0;
      formGroupValues.forEach((formGroupValue, index) => {
        const calculatedValues = this.onFormGroupValueUpdate(formGroupValue);

        this.productListings[index].expectedQuantity = calculatedValues.expectedQuantity;
        this.productListings[index].totalCostWOTax = calculatedValues.totalCostWOTax;
        this.productListings[index].taxAmount = calculatedValues.taxAmount;
        this.productListings[index].totalCostWTax = calculatedValues.totalCostWTax;

        finalTotalCostWOTax += calculatedValues.totalCostWOTax;
        finalTaxAmount += calculatedValues.taxAmount;
        finalTotalCostWTax += calculatedValues.totalCostWTax;
      });

      this.publishProductListings();

      this.finalCosting.totalCostWOTax = finalTotalCostWOTax;
      this.finalCosting.taxAmount = finalTaxAmount;
      this.finalCosting.totalCostWTax = finalTotalCostWTax;

      this.coreService.updateProductListingValidity(!!this.productListings.length && this.productListingsFormArray.valid);
    });
  }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  onProductListingChange(): Observable<ProductListing[]> {
    return this.productListingsSubject.asObservable();
  }

  private publishProductListings() {
    this.productListingsSubject.next(this.productListings);
  }

  onFormGroupValueUpdate(value: ProductListingFormGroup): ProductComputedValues {
    let newQuantity = value.newQuantity && Number.parseInt(value.newQuantity) || 0;
    newQuantity = newQuantity < 0 ? 0 : newQuantity;
    let newCost = value.newCost && Number.parseInt(value.newCost) || 0;
    newCost = newCost < 0 ? 0 : newCost;
    const isTax = value.taxCode === 'vat';

    const expectedQuantity = newQuantity;
    const totalCostWOTax = newQuantity * newCost;
    const taxAmount = isTax ? totalCostWOTax * 0.15 : 0;
    const totalCostWTax = totalCostWOTax + taxAmount;

    return {
      expectedQuantity,
      totalCostWOTax,
      taxAmount,
      totalCostWTax,
    }
  }

  createProductListing(product: Product): ProductListing {
    const formGroup = this.fb.group({
      newQuantity: ['', Validators.required],
      newCost: ['', Validators.required],
      taxCode: ['vat', Validators.required],
    });
    return {
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
  }

  addProductToSelection(product: Product): ProductListing[] {
    const isNewSelection = !this.productListings.find(productListing => productListing.productId === product.productId);
    if (isNewSelection) {
      const newProductListing = this.createProductListing(product);
      this.productListings.push(newProductListing);
      this.productListingsFormArray.push(newProductListing.formGroup);
      this.publishProductListings();
    } else {
    }
    return this.productListings;
  }

  deleteProduct(productListing: ProductListing) {
    const index = this.productListings.findIndex((item) => item.listingId === productListing.listingId);
    if (index > -1) {
      this.productListings.splice(index, 1);
      this.productListingsFormArray.removeAt(index);
      this.publishProductListings();
    }
  }
}
