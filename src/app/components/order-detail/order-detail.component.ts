import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  formGroup: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      invoiceNumber: [''],
      notes: [''],
    });
    this.coreService.registerOrderDetailForm(this.formGroup);
  }

  ngOnDestroy(): void {
    this.coreService.resetOrderDetailForm();
  }
}
