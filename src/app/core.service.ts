import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private form: FormGroup = new FormGroup({});
  private productListingValidity = false;
  private appValiditySubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.form.valueChanges.subscribe(() => {
      this.updateAppValidity();
    })
  }

  appValidity() {
    return this.appValiditySubject.asObservable();
  }

  registerPaymentForm(formGroup: FormGroup) {
    this.form.addControl('paymentForm', formGroup);
    this.updateAppValidity();
  }

  resetPaymentForm() {
    this.form.removeControl('paymentForm');
    this.updateAppValidity();
  }

  registerOrderDetailForm(formGroup: FormGroup) {
    this.form.addControl('orderDetailForm', formGroup);
    this.updateAppValidity();
  }

  resetOrderDetailForm() {
    this.form.removeControl('orderDetailForm');
    this.updateAppValidity();
  }

  updateProductListingValidity(validity: boolean) {
    this.productListingValidity = validity;
    this.updateAppValidity();
  }

  private updateAppValidity() {
    this.appValiditySubject.next(this.form.valid && this.productListingValidity);
  }

}
