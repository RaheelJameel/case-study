import { FormGroup } from "@angular/forms";

export interface Product {
  productId: string;
  name: string;
  sku: string;
}

export interface ProductListing extends Product {
  listingId: string;
  newQuantity: number;
  newCost: number;
  taxCode: string;
  availableQuantity: number;
  expectedQuantity: number;
  lastBuyPrice: number;
  totalCostWOTax: number;
  taxAmount: number;
  totalCostWTax: number;
  formGroup: FormGroup;
}

export interface ProductListingFormGroup {
  newQuantity?: string | null;
  newCost?: string | null;
  taxCode?: string | null;
}

export interface ProductsCosting {
  totalCostWOTax: number;
  taxAmount: number;
  totalCostWTax: number;
}

export interface ProductComputedValues extends ProductsCosting {
  expectedQuantity: number;
}
