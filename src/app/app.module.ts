import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './shared/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './components/search/search.component';
import { ProductsTableComponent } from './products/products-table/products-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ObjectToStringPipe } from './shared/pipes/object-to-string.pipe';
import { ProductsTotalComponent } from './products/products-total/products-total.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDetailComponent,
    ProductsComponent,
    SearchComponent,
    ProductsTableComponent,
    ObjectToStringPipe,
    ProductsTotalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
