import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProductsService } from '../products.service';
import { ProductsCosting } from '../products.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CoreService } from 'src/app/core.service';

@Component({
  selector: 'app-products-total',
  templateUrl: './products-total.component.html',
  styleUrls: ['./products-total.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsTotalComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup | undefined;
  finalCosting: ProductsCosting;
  displayedColumns: string[] = ['expand', 'description', 'amounts', 'padding'];
  displayedColumns2: string[] = ['payment'];
  dataSource = [{}];
  expanded = false;
  payNow = true;
  private subscription: Subscription | undefined;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder,
    private coreService: CoreService,
  ) {
    this.finalCosting = this.productsService.finalCosting;
  }

  ngOnInit(): void {
    this.setupForm();
    this.watchPaymentType();
  }

  setupForm() {
    this.paymentForm = this.fb.group({
      paymentType: ['now', Validators.required],

      paymentMethod: ['', Validators.required],
      paidAmount: ['', Validators.required],

      dueDate: [new Date(), Validators.required]
    });

    this.coreService.registerPaymentForm(this.paymentForm);
  }

  watchPaymentType() {
    if (this.paymentForm) {
      const paymentTypeControl = this.paymentForm.get('paymentType');
      const paymentMethodControl = this.paymentForm.get('paymentMethod');
      const paidAmountControl = this.paymentForm.get('paidAmount');
      if (paymentTypeControl && paymentMethodControl && paidAmountControl) {
        this.subscription = paymentTypeControl.valueChanges.subscribe((value) => {
          this.payNow = value === 'now';
          paidAmountControl.reset();
          paymentMethodControl.reset();
          if (this.payNow) {
            paidAmountControl.addValidators(Validators.required);
            paymentMethodControl.addValidators(Validators.required);
          } else {
            paidAmountControl.clearValidators();
            paymentMethodControl.clearValidators();
          }
          paidAmountControl.updateValueAndValidity();
          paymentMethodControl.updateValueAndValidity();
        })
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.coreService.resetPaymentForm();
  }
}
