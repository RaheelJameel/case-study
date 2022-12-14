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
